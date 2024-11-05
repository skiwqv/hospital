<template>
  <div class="conference-room">
    <div class="conference-header">
      <div class="user-info">
        <img class="user-avatar" src="" alt="User Avatar" />
        <span class="user-name">User Name</span>
      </div>
    </div>

    <div class="conference-content">
      <div class="video-remote">
        <video
          v-show="isVideoOn && remoteStream"
          ref="remoteVideo"
          autoplay
          playsinline
          class="remote-video"
        ></video>
        <span v-show="!isVideoOn || !remoteStream">Video Off</span>
      </div>

      <div class="user-video">
        <video
          v-show="isVideoOn && localStream"
          ref="localVideo"
          autoplay
          muted
          class="mini-video"
        ></video>
        <span v-show="!isVideoOn || !localStream" class="mini-video"
          >Video Off</span
        >
      </div>
    </div>

    <div class="conference-footer">
      <component
        :is="isMicrophoneOn ? MicrophoneIcon : MicroOffIcon"
        class="icon"
        @click="toggleMicrophone"
      />
      <component
        :is="isVideoOn ? VideoIcon : CameraOffIcon"
        class="icon"
        @click="toggleVideo"
      />
      <EndCallIcon class="icon" @click="endCall" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watchEffect } from "vue";
import { useAppStore } from "@/store/app";
import { useRoute } from "vue-router";
import EndCallIcon from "@/assets/icons/endcall.svg";
import MicroOffIcon from "@/assets/icons/microphoff.svg";
import MicrophoneIcon from "@/assets/icons/microphone.svg";
import VideoIcon from "@/assets/icons/video.svg";
import CameraOffIcon from "@/assets/icons/videooff.svg";

const route = useRoute();
const appStore = useAppStore();

const activeUsers = ref();

const isMicrophoneOn = ref(false);
const isVideoOn = ref(false);
const localStream = ref(null);
const remoteStream = ref(null);
const peerConnection = ref(null);
const localVideo = ref(null);
const remoteVideo = ref(null);
const socket = ref(null);
const candidateQueue = ref([]);

const roomName = route.params.room;

const token = window.localStorage.getItem("access");

const initWebSocket = () => {
  socket.value = new WebSocket(
    `${
      import.meta.env.VITE_APP_SOCKET_URL
    }conference/${roomName}/?token=${token}`
  );

  socket.value.onmessage = (event) => {
    const { type, sdp, candidate, users } = JSON.parse(event.data);
    activeUsers.value = users;

    switch (type) {
      case "offer":
        handleOffer(sdp);
        break;
      case "answer":
        handleAnswer(sdp);
        break;
      case "ice_candidate":
        handleCandidate(candidate);
        break;
      default:
        break;
    }
  };
};

const initPeerConnection = () => {
  peerConnection.value = new RTCPeerConnection({
    iceServers: [
      { urls: "stun:stun.l.google.com:19302" },
      { urls: "stun:stun1.l.google.com:19302" },
      { urls: "stun:stun2.l.google.com:19302" },
    ],
  });
  peerConnection.value.onicecandidate = handleICECandidateEvent;
  peerConnection.value.ontrack = handleTrackEvent;
};

const initLocalStream = async () => {
  try {
    localStream.value = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    localStream.value
      .getTracks()
      .forEach((track) =>
        peerConnection.value.addTrack(track, localStream.value)
      );

    if (localVideo.value) {
      localVideo.value.srcObject = localStream.value;
    }
  } catch (error) {
    console.error("Error accessing media devices:", error);
  }
};

const createOffer = async () => {
  const offer = await peerConnection.value.createOffer();
  await peerConnection.value.setLocalDescription(offer);
  sendToServer("offer", offer);
};

const handleOffer = async (offer) => {
  if (peerConnection.value.signalingState === "stable") {
    await peerConnection.value.setRemoteDescription(offer);
    const answer = await peerConnection.value.createAnswer();
    await peerConnection.value.setLocalDescription(answer);
    sendToServer("answer", answer);

    while (candidateQueue.value.length) {
      const candidate = candidateQueue.value.shift();
      try {
        await peerConnection.value.addIceCandidate(candidate);
      } catch (error) {
        console.error("Error adding queued ICE candidate", error);
      }
    }
  }
};

const handleAnswer = async (answer) => {
  if (peerConnection.value.signalingState === "have-local-offer") {
    await peerConnection.value.setRemoteDescription(answer);
  }
};

const handleICECandidateEvent = (event) => {
  if (event.candidate) {
    sendToServer("ice_candidate", event.candidate);
  }
};

const handleCandidate = async (candidate) => {
  if (peerConnection.value.remoteDescription) {
    try {
      await peerConnection.value.addIceCandidate(candidate);
    } catch (error) {
      console.error("Error adding received ICE candidate", error);
    }
  } else {
    candidateQueue.value.push(candidate);
  }
};

let remoteVideoInitialized = ref(false);

const handleTrackEvent = (event) => {
  if (!remoteStream.value) {
    remoteStream.value = new MediaStream();
  }

  event.streams[0].getTracks().forEach((track) => {
    if (!remoteStream.value.getTracks().includes(track)) {
      remoteStream.value.addTrack(track);
    }
  });

  if (remoteVideo.value) {
    remoteVideo.value.srcObject = remoteStream.value;
  }
};

const sendToServer = (type, data) => {
  if (socket.value && socket.value.readyState === WebSocket.OPEN) {
    socket.value.send(
      JSON.stringify({
        type: type,
        [type === "ice_candidate" ? "candidate" : "sdp"]: data,
      })
    );
  }
};

const toggleMicrophone = () => {
  isMicrophoneOn.value = !isMicrophoneOn.value;
  if (localStream.value) {
    localStream.value.getAudioTracks().forEach((track) => {
      track.enabled = isMicrophoneOn.value;
    });
  }
};

const toggleVideo = () => {
  isVideoOn.value = !isVideoOn.value;

  if (localStream.value) {
    localStream.value.getVideoTracks().forEach((track) => {
      track.enabled = isVideoOn.value;
    });
  }
};

const endCall = () => {
  if (peerConnection.value) {
    peerConnection.value.close();
    peerConnection.value = null;
  }
  if (localStream.value) {
    localStream.value.getTracks().forEach((track) => track.stop());
    localStream.value = null;
  }
  if (socket.value) {
    socket.value.close();
  }
};

const startCall = async () => {
  await createOffer();
};

watchEffect(() => {
  if (activeUsers.value >= 2) {
    if (route.query.innitiator) {
      startCall();
    }
  }
});

onMounted(async () => {
  initWebSocket();
  initLocalStream();
  initPeerConnection();
});

onBeforeUnmount(() => {
  endCall();
});
</script>

<style lang="scss" scoped></style>
