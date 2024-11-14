<template>
  <section class="appointments">
    <div class="container">
      <Table
        title="Users"
        :data="users"
        :columns="[
          {
            label: 'User',
            key: 'first_name',
            clickable: true,
          },
          { label: 'Email', key: 'email' },
          { label: 'Role', key: 'roles' },
        ]"
        :deleteHandler="blockUser"
        :loading="loading"
        emptyMessage="There are no users yet"
        @viewProfile="toProfile"
        :actionIcon="getActionIcon"
      />
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useAdminStore } from "@/store/admin";
import Table from "@/components/tables/Table.vue";
import BanIcon from "@/assets/icons/BanIcon.svg";
import UnbanIcon from "@/assets/icons/unban.svg";

const adminStore = useAdminStore();
const loading = ref(false);

const users = computed(() => adminStore.allUsers);

const deleteUser = (id) => {
  users.value = users.value.filter((user) => user.id !== id);
};

const toProfile = (id) => {
  console.log("View profile for user ID:", id);
};

const getActionIcon = (user) => {
  return user.is_blocked ? UnbanIcon : BanIcon;
};

const blockUser = (user) => {
  adminStore.blockUser(user.id);
};

onMounted(async () => {
  await adminStore.getAllUsers();
});
</script>
