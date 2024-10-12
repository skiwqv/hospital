<template>
  <div class="chat-list-wrapper">
    <div class="chat-list-container">
      <div class="chat-list-header">
        <h2>Chats</h2>
      </div>
      <div class="chat-list">
        <div v-for="chat in unreadChats" :key="chat.id" class="chat-item">
          <img :src="chat.avatar" alt="avatar" class="chat-avatar" />
          <div class="chat-details">
            <div class="chat-name">{{ chat.name }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const chats = [
  {
    id: 1,
    name: "Alice Johnson",
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMb2zIffkyVl_2JJJeu6es0Mzo3ug_Lw647Q&s",
    unread: true,
  },
  {
    id: 2,
    name: "Bob Smith",
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMb2zIffkyVl_2JJJeu6es0Mzo3ug_Lw647Q&s",
    unread: true,
  },
  {
    id: 3,
    name: "Charlie Brown",
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMb2zIffkyVl_2JJJeu6es0Mzo3ug_Lw647Q&s",
    unread: true,
  },
  {
    id: 4,
    name: "David Clark",
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMb2zIffkyVl_2JJJeu6es0Mzo3ug_Lw647Q&s",
    unread: true,
  },
];

const unreadChats = computed(() => chats.filter((chat) => chat.unread));
</script>
