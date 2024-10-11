<template>
  <div class="notifications-wrapper">
    <div class="notifications-container">
      <!-- Заголовок уведомлений -->
      <div class="notifications-header">
        <h2>Notifications</h2>
        <span class="clear-all" @click="clearAllNotifications">Clear All</span>
      </div>

      <!-- Список уведомлений -->
      <div class="notifications-list">
        <!-- Проверка на наличие уведомлений -->
        <div v-if="notifications.length > 0">
          <div
            v-for="(notification, index) in notifications"
            :key="index"
            class="notification-item"
            :class="{ unread: !notification.read }"
          >
            <div class="notification-icon">
              <i class="fas fa-bell"></i>
            </div>
            <div class="notification-details">
              <div class="notification-title">{{ notification.title }}</div>
              <div class="notification-time">{{ notification.time }}</div>
            </div>
            <div v-if="!notification.read" class="notification-status">
              Unread
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

const mockNotifications = [
  { title: "New comment on your post", time: "2 mins ago", read: false },
  { title: "You have a new friend request", time: "5 mins ago", read: true },
  { title: "Someone liked your post", time: "10 mins ago", read: false },
  { title: "Someone liked your post", time: "10 mins ago", read: false },
  { title: "Someone liked your post", time: "10 mins ago", read: false },
  { title: "Someone liked your post", time: "10 mins ago", read: false },
  { title: "Someone liked your post", time: "10 mins ago", read: false },
];

const notifications = ref([...mockNotifications]);

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

const unreadNotificationsCount = computed(() => {
  return notifications.value.filter((notification) => !notification.read)
    .length;
});
</script>
