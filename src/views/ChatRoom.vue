<template>
  <div class="chat-wrapper" v-if="userById">
    <div class="chat-room">
      <div class="chat-header">
        <div class="user-wrapper">
          <span>{{ userByIdName }}</span>
          <img :src="userByIdAvatar" alt="User Avatar" class="header-avatar" />
        </div>
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
          <div v-if="!message.is_deleted" class="message-text">
            {{ message.content }}
          </div>
          <div v-else class="message-deleted">
            This message has been deleted.
          </div>
          <img
            v-if="message.media"
            class="message-media"
            :src="message.media"
            @click="openImage(message.media)"
          />
          <div v-if="isImageOpen" class="overlay" @click="closeImage">
            <img
              :src="selectedImage"
              class="fullscreen-image"
              :class="{ zoomed: isImageZoomed }"
              @click.stop="toggleZoom"
            />
          </div>
          <div class="message-time">
            {{ formatDateTime(message.timestamp) }}
          </div>
          <div v-if="message.is_edited" class="message-edited">Edited</div>

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

      <img v-if="imagePreview" :src="imagePreview" class="preview-img" />

      <div class="chat-input-wrapper">
        <div class="input-container">
          <input type="file" id="image" hidden @change="onFileChange" />
          <label for="image"><ImgBox class="img-icon" /></label>
          <textarea
            v-model="message"
            placeholder="Type your message..."
            rows="1"
            @input="autoResize"
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
import { addPadding, formatDateTime } from "../helpers/Formater";
import ImgBox from "@/assets/icons/img-box.svg";

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

const chatContent = ref(null);

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

const sendMedia = () => {
  if (!imageSrc.value) {
    return;
  }
  const messageBody = {
    type: "media",
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
  const reader = new FileReader();
  reader.onloadend = () => {
    imageSrc.value = reader.result.split(",")[1];
    imagePreview.value = URL.createObjectURL(file);
  };
  if (file) {
    reader.readAsDataURL(file);
  } else {
    imageSrc.value = null;
    imagePreview.value = null;
  }
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
});
</script>

<style scoped></style>
