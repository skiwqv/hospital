<template>
  <div class="notifications-wrapper">
    <div class="notifications-container">
      <div class="notifications-header">
        <h2>Notifications</h2>
        <span class="clear-all" @click="clearAllNotifications">Clear All</span>
      </div>
      <div class="notifications-list">
        <div v-if="notifications.length > 0">
          <div
            v-for="(notification, index) in notifications"
            :key="index"
            class="notification-item"
            @click="toRoom(notification.room_name, notification.sender_id)"
          >
            <div>
              <img
                :src="notification.sender_avatar"
                class="notification-icon"
              />
            </div>
            <div class="notification-details">
              <div class="notification-name">
                {{ notification.sender_name }}
              </div>
              <div
                class="notification-title"
                v-if="notification.content != null"
              >
                {{ notification.content }}
              </div>
              <div class="notification-title" v-else>Photo</div>
              <div class="notification-time">
                {{ formatDateTime(notification.timestamp) }}
              </div>
            </div>
          </div>
        </div>
        <div v-else class="notification-empty">No notifications</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useNotifStore } from "@/store/notifications";
import { formatDateTime } from "@/helpers/Formater";
import router from "@/router";

const notificationStore = useNotifStore();

const notifications = computed(() => notificationStore.notifications);

const clearAllNotifications = () => {
  notificationStore.clearAllNotifications();
};

const removeNotificationsByRoom = (roomName) => {
  notificationStore.clearRoomNotifications(roomName);
};

const toRoom = async (room_name, sender_id) => {
  removeNotificationsByRoom(room_name);
  router.replace({
    path: `/room/${room_name}`,
    query: {
      userId: sender_id,
    },
  });
};
</script>
