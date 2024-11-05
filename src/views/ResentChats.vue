<template>
  <div class="chat-list-wrapper">
    <div class="chat-list-container">
      <div class="chat-list-header">
        <h2>Chats</h2>
      </div>
      <div class="chat-list">
        <div
          v-for="chat in resentChats"
          :key="chat.id"
          class="chat-item"
          @click="toRoom(chat.room_name, chat.user_id)"
        >
          <img :src="chat.avatar" alt="avatar" class="chat-avatar" />
          <div class="chat-details">
            <div class="chat-name">{{ chat.user_name }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from "vue";
import { useChatStore } from "@/store/chat";
import router from "@/router";

const chatStore = useChatStore();

const resentChats = computed(() => chatStore.resentChats);

const toRoom = async (room_name, sender_id) => {
  router.replace({
    path: `/room/${room_name}`,
    query: {
      userId: sender_id,
    },
  });
};

onMounted(async () => {
  await chatStore.getResentChats();
});
</script>
