<template>
  <div class="chat-wrapper" v-if="userById">
    <div class="chat-room">
      <div class="chat-header">
        <div class="user-wrapper">
          <span>{{ userByIdName }}</span>
          <img :src="userByIdAvatar" alt="User Avatar" class="header-avatar" />
        </div>
        <VideoIcon class="video" @click="sendVideoLink"></VideoIcon>
      </div>

      <div class="chat-content" ref="chatContent">
        <div
          v-for="(message, index) in messages"
          :key="message.id"
          :class="[
            'message',
            message.sender === currentUser.id ? 'from-user' : 'from-others',
          ]"
          @contextmenu.prevent="openMenu($event, message.id)"
          @touchstart="handleTouchStart(message.id)"
          @touchend="clearTouchTimeout"
        >
          <div class="message-replied" v-if="message.replied_to">
            {{ message.replied_to }}
          </div>
          <div
            v-if="!message.is_deleted && !isLink(message.content)"
            class="message-text"
          >
            {{ message.content }}
          </div>
          <a
            v-if="isLink(message.content)"
            :href="message.content"
            target="_blank"
          >
            {{ message.content }}
          </a>
          <!-- Если файл - изображение -->
          <img
            v-if="message.media && !isPdf(message.file_type)"
            class="message-media"
            :src="message.media"
            @click="openImage(message.media)"
          />
          <div
            v-if="message.media && isPdf(message.file_type)"
            class="message-file"
            @click="downloadFile(message.media)"
          >
            <div class="file-wrapper" :href="message.media" target="_blank">
              <PDFIcon class="pdf-icon"></PDFIcon>
              <div class="file-name">{{ sliceFileName(message.media) }}</div>
            </div>
            <div class="download-overlay">
              <button class="download-btn">
                <DownloadIcon class="download-icon" />
              </button>
            </div>
          </div>

          <div v-if="isImageOpen" class="overlay" @click="closeImage">
            <img
              :src="selectedImage"
              class="fullscreen-image"
              :class="{ zoomed: isImageZoomed }"
              @click.stop="toggleZoom"
            />
          </div>
          <div class="message-status">
            <div v-if="message.is_edited" class="message-edited">Edited</div>
            <div class="message-time">
              {{ formatDateTime(message.timestamp) }}
            </div>
            <div class="message-read" v-if="message.sender == currentUser.id">
              <TickIcon class="tick-icon" v-if="!message.is_read"></TickIcon>
              <TickDoubleIcon class="tick-icon" v-else></TickDoubleIcon>
            </div>
          </div>
          <div
            v-if="menuVisible && activeMessageId === message.id"
            class="context-menu"
          >
            <div @click="editMessage(message.id)" class="context-item">
              Edit
            </div>
            <div @click="replyMessage(message.id)" class="context-item">
              Reply
            </div>
            <div
              @click="deleteMessage(message.id)"
              class="context-item context-delete"
            >
              Delete
            </div>
          </div>
        </div>
      </div>

      <div class="reply-wrapper" v-if="repliedMessage">
        <div class="replied-message-text">{{ repliedMessage.content }}</div>
      </div>

      <div v-if="imagePreview && imageSrc && !isPdf(imagePreview)">
        <img :src="imagePreview" class="preview-img" />
      </div>
      <div v-else>
        <div class="file-name">{{ fileName }}</div>
      </div>

      <div class="chat-input-wrapper">
        <div class="input-container">
          <input
            type="file"
            id="image"
            hidden
            @change="onFileChange"
            accept="image/*,application/pdf"
          />
          <label for="image"><ImgBox class="img-icon" /></label>
          <textarea
            v-model="message"
            placeholder="Type your message..."
            rows="1"
            @input="autoResize"
            @keydown.enter.prevent="isEditing ? updateMessage() : sendMessage()"
          />
          <button
            v-if="!imagePreview"
            @click="isEditing ? updateMessage() : sendMessage()"
          >
            {{ isEditing ? "Update" : "Send" }}
          </button>
          <button
            v-if="isEditing || repliedMessage || imagePreview"
            @click="cancelEditOrReplyOrImage"
          >
            Cancel
          </button>
          <button v-if="imagePreview" @click="sendMedia">Send</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  ref,
  computed,
  onMounted,
  onBeforeUnmount,
  watch,
  nextTick,
} from "vue";
import { useAppStore } from "@/store/app";
import { useChatStore } from "@/store/chat";
import { useRoute } from "vue-router";
import { addPadding, formatDateTime, sliceFileName } from "@/helpers/Formater";
import router from "@/router";
import TickIcon from "@/assets/icons/tick.svg";
import TickDoubleIcon from "@/assets/icons/tick_double.svg";
import PDFIcon from "@/assets/icons/pdf.svg";
import DownloadIcon from "@/assets/icons/download.svg";
import ImgBox from "@/assets/icons/img-box.svg";
import VideoIcon from "@/assets/icons/video.svg";

const appStore = useAppStore();
const chatStore = useChatStore();
const route = useRoute();

const currentUser = computed(() => appStore.currentUser);
const userById = computed(() => appStore.userById);
const userByIdName = computed(
  () => `${userById.value.first_name} ${userById.value.last_name}`
);
const userByIdAvatar = computed(() => userById.value.avatar);

const messages = computed(() => {
  return chatStore.messages.filter((msg) => !msg.is_deleted);
});

const repliedMessage = ref(null);
const imageSrc = ref(null);
const imagePreview = ref(null);
const message = ref("");
const menuVisible = ref(false);
const activeMessageId = ref(null);
const isImageOpen = ref(false);
const isImageZoomed = ref(false);
const selectedImage = ref(null);
const isEditing = ref(false);
const editingMessageId = ref(null);
let touchTimeout = null;
const mimeType = ref(null);
const chatContent = ref(null);
const fileName = ref(null);

const sendMessage = () => {
  const trimmedMessage = message.value.trim();
  if (!trimmedMessage) {
    return;
  }
  const messageBody = {
    type: "text",
    message: message.value,
    replied_to: repliedMessage.value?.id || null,
  };
  chatStore.sendMessage(messageBody);
  resetMessage();
};

const isPdf = (src) => src == "application/pdf";

const downloadFile = (link) => {
  window.open(link, "_blank");
};

const sendMedia = () => {
  if (!imageSrc.value) {
    return;
  }
  const messageBody = {
    type: "media",
    file_type: mimeType.value,
    file_name: fileName.value,
    media: addPadding(imageSrc.value),
    replied_to: repliedMessage.value?.id || null,
  };

  chatStore.sendMessage(messageBody);
  resetMessage();
  imagePreview.value = null;
};

const resetMessage = () => {
  message.value = "";
  repliedMessage.value = null;
  isEditing.value = false;
  editingMessageId.value = null;
  imagePreview.value = null;
  imageSrc.value = null;
  fileName.value = null;
  mimeType.value = null;
};

const openMenu = (event, messageId) => {
  menuVisible.value = true;
  activeMessageId.value = messageId;
  document.addEventListener("click", closeMenu);
};

const closeMenu = () => {
  menuVisible.value = false;
  document.removeEventListener("click", closeMenu);
};

const handleTouchStart = (messageId) => {
  touchTimeout = setTimeout(() => {
    openMenu(
      { clientY: event.touches[0].clientY, clientX: event.touches[0].clientX },
      messageId
    );
  }, 500);
};

const clearTouchTimeout = () => clearTimeout(touchTimeout);

const openImage = (image) => {
  selectedImage.value = image;
  isImageOpen.value = true;
};

const closeImage = () => {
  isImageOpen.value = false;
  isImageZoomed.value = false;
  selectedImage.value = null;
};

const toggleZoom = () => (isImageZoomed.value = !isImageZoomed.value);

const editMessage = (messageId) => {
  const messageToEdit = messages.value.find((msg) => msg.id === messageId);
  if (messageToEdit) {
    message.value = messageToEdit.content;
    isEditing.value = true;
    editingMessageId.value = messageId;
  }
  closeMenu();
};

const updateMessage = () => {
  const messageBody = {
    type: "edit",
    message_id: editingMessageId.value,
    new_message: message.value,
  };
  chatStore.editMessage(messageBody);
  resetMessage();
};

const deleteMessage = (id) => {
  chatStore.deleteMessage({ type: "delete", message_id: id });
  closeMenu();
};

const replyMessage = (id) => {
  repliedMessage.value = messages.value.find((msg) => msg.id === id);
  closeMenu();
};

const cancelReply = () => {
  repliedMessage.value = null;
};

const sendVideoLink = () => {
  const roomName = route.params.id;
  const videoRoomLink = `http://localhost:5173/conference/${roomName}`;
  const messageBody = {
    type: "text",
    message: videoRoomLink,
    replied_to: repliedMessage.value?.id || null,
  };

  chatStore.sendMessage(messageBody);
  router.push({
    path: `/conference/${roomName}`,
    query: {
      innitiator: true,
    },
  });
};

const cancelEditOrReplyOrImage = () => {
  isEditing.value = false;
  editingMessageId.value = null;
  repliedMessage.value = null;
  message.value = "";
  imagePreview.value = null;
  imageSrc.value = null;
};

const onFileChange = (event) => {
  const file = event.target.files[0];

  if (!file) {
    return;
  }

  fileName.value = file.name;

  const reader = new FileReader();

  reader.onloadend = () => {
    const base64String = reader.result.split(",")[1];
    mimeType.value = file.type;
    imageSrc.value = base64String;
    imagePreview.value = URL.createObjectURL(file);
  };

  reader.readAsDataURL(file);
};

const autoResize = (event) => {
  const textarea = event.target;
  textarea.style.height = "auto";
  textarea.style.height = `${textarea.scrollHeight}px`;
};

const scrollToBottom = () => {
  chatContent.value?.scrollTo({
    top: chatContent.value.scrollHeight,
    behavior: "smooth",
  });
};

const isLink = (text) => {
  const urlPattern =
    /^(https?:\/\/)?([a-zA-Z0-9.-]+\.[a-zA-Z]{2,}|localhost)(:[0-9]{1,5})?(\/\S*)?$/;
  return urlPattern.test(text);
};

watch(
  messages,
  async () => {
    await nextTick();
    scrollToBottom();
  },
  { immediate: true, deep: true }
);

onMounted(async () => {
  await appStore.getUserById(route.query.userId);
  chatStore.connectSocket(route.params.id);
  scrollToBottom();
});

onBeforeUnmount(() => {
  document.removeEventListener("click", closeMenu);
  chatStore.closeSocket();
});
</script>

<style scoped></style>
