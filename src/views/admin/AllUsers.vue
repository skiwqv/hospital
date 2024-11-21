<template>
  <section class="appointments">
    <div>
      <Table
        title="Users"
        :data="processedUsers"
        :columns="[
          {
            label: 'ID',
            key: 'id',
          },
          {
            label: 'User',
            key: 'full_name',
            clickable: true,
          },
          { label: 'Email', key: 'email' },
          { label: 'Role', key: 'roles' },
        ]"
        :deleteHandler="toggleBlockUser"
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
import router from "@/router";
import Table from "@/components/tables/Table.vue";
import BanIcon from "@/assets/icons/BanIcon.svg";
import UnbanIcon from "@/assets/icons/unban.svg";

const adminStore = useAdminStore();
const loading = ref(false);

const users = computed(() => adminStore.allUsers || []);

const processedUsers = computed(() =>
  users.value
    .filter((user) => user.roles !== "admin")
    .map((user) => ({
      ...user,
      full_name: `${user.first_name} ${user.last_name}`,
    }))
    .sort((a, b) => a.id - b.id)
);
const toProfile = (user) => {
  let id = user.id;
  router.push(`/profile-publick/${id}`);
};

const getActionIcon = (user) => {
  return user.is_blocked ? UnbanIcon : BanIcon;
};

const toggleBlockUser = async (user) => {
  const action = user.is_blocked ? "unblock" : "block";
  await adminStore.toggleBlockUser(user.id, action);
  await adminStore.getAllUsers();
};

onMounted(async () => {
  await adminStore.getAllUsers();
});
</script>
