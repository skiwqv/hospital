<template>
  <section class="appointments">
    <div class="container">
      <Table
        title="Users"
        :data="users"
        :columns="[
          { label: 'User', key: 'username', clickable: true },
          { label: 'Email', key: 'email' },
        ]"
        :deleteHandler="deleteUser"
        :loading="loading"
        emptyMessage="There are no users yet"
        @viewProfile="toProfile"
        :actionIcon="BanIcon"
      />
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";
import Table from "@/components/tables/Table.vue";
import BanIcon from "@/assets/icons/BanIcon.svg";
const loading = ref(false);

const users = ref([
  { id: 1, username: "johndoe", email: "johndoe@example.com" },
  { id: 2, username: "janedoe", email: "janedoe@example.com" },
  { id: 3, username: "alicew", email: "alicew@example.com" },
  { id: 4, username: "bobj", email: "bobj@example.com" },
]);

const deleteUser = (id) => {
  users.value = users.value.filter((user) => user.id !== id);
};

const toProfile = (id) => {
  console.log("View profile for user ID:", id);
};
</script>
