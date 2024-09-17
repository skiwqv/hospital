<template>
  <header class="header">
    <div class="upper-header-wrapper">
      <div class="logo-wrapper">
        <span class="logo-text"
          >Med<span class="logo-text-secondary">Admin</span>
        </span>
      </div>
    </div>
    <div class="nav-wrapper">
      <div class="logo-wrapper-nav">
        <span class="logo-text"
          >Med<span class="logo-text-secondary">dical</span></span
        >
      </div>
      <div class="menu-icon" @click="isMenuOpen = !isMenuOpen">
        <component :is="isMenuOpen ? CloseIcon : BurgerMenuIcon" />
      </div>
      <div class="nav-menu" :class="{ open: isMenuOpen }">
        <router-link
          v-for="(link, index) in headerLinks"
          :key="index"
          class="link"
          :exact="link.exact"
          :to="link.to"
          :class="{ 'link-active': isActive(link.to) }"
          @click="isMenuOpen = !isMenuOpen"
        >
          {{ link.label }}
        </router-link>
        <button v-if="!currentUser" class="nav-button" @click="toSignIn">
          Sign In
        </button>
        <button v-else class="nav-button" @click="logOut">Log Out</button>
      </div>
      <button v-if="!currentUser" class="nav-button" @click="toSignIn">
        Sign In
      </button>
      <div v-else class="user-wrapper">
        <div class="dropdown" @click="dropdownVisible = !dropdownVisible">
          <ProfileIcon class="user-icon"></ProfileIcon>
          <div v-if="dropdownVisible" class="dropdown-menu">
            <div class="items-wrapper">
              <span class="menu-item" @click="toProfile">
                <ProfileCardIcon class="menu-item-icon"></ProfileCardIcon>
                Profile</span
              >
              <span
                class="menu-item"
                @click="toAdmin"
                v-if="currentUser.role == 'admin'"
              >
                <AdminIcon class="menu-item-icon"></AdminIcon>
                Admin</span
              >
              <span class="menu-item" @click="logOut">
                <LogOutIcon class="logout-icon"></LogOutIcon>
                Log Out</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
  <main>
    <router-view />
  </main>
</template>

<script setup>
import { ref, computed } from "vue";
import BurgerMenuIcon from "@/assets/icons/burger-menu.svg";
import CloseIcon from "@/assets/icons/close.svg";
import ProfileIcon from "@/assets/icons/profile.svg";
import ProfileCardIcon from "@/assets/icons/profileCard.svg";
import LogOutIcon from "@/assets/icons/logout.svg";
import AdminIcon from "@/assets/icons/admin.svg";
import router from "@/router";
import { useRoute } from "vue-router";
import { useAppStore } from "@/store/app";
const appStore = useAppStore();

const currentUser = computed(() => appStore.currentUser);

const isMenuOpen = ref(false);
const dropdownVisible = ref(false);
const route = useRoute();

const toSignIn = () => {
  router.push("/signIn");
  isMenuOpen.value = !isMenuOpen.value;
};

const logOut = () => {
  appStore.logOut();
  isMenuOpen.value = !isMenuOpen.value;
  router.push("/");
};

const toProfile = () => {
  isMenuOpen.value = !isMenuOpen.value;
  router.push("/profile");
};

const toAdmin = () => {
  isMenuOpen.value = !isMenuOpen.value;
  router.push("/admin");
};
const isActive = (path) => {
  return route.path == path;
};
</script>

<style></style>
