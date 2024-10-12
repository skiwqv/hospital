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
            <div class="notification-icon">
              <img :src="notification.sender_avatar" />
            </div>
            <div class="notification-details">
              <div class="notification-name">
                {{ notification.sender_name }}
              </div>
              <div class="notification-title">{{ notification.content }}</div>
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
import { useNotifStore } from "../store/notifications";
import { formatDateTime } from "../helpers/Formater";
import router from "@/router";

const notificationStore = useNotifStore();

const notifications = computed(() => notificationStore.notifications);

const clearAllNotifications = () => {
  notifications.value = [];
};

const loadMoreNotifications = () => {
  const moreNotifications = [
    { title: "New message from John", time: "20 mins ago", read: true },
    { title: "Your password was changed", time: "1 hour ago", read: false },
  ];
  notifications.value.push(...moreNotifications);
};

const toRoom = async (room_name, sender_id) => {
  router.push({
    path: `/room/${room_name}`,
    query: {
      userId: sender_id,
    },
  });
};

const unreadNotificationsCount = computed(() => {
  return notifications.value.filter((notification) => !notification.read)
    .length;
});
</script>
