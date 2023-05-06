<script setup lang="ts">
import { RouterView } from 'vue-router'
import { signOut, isLoggedIn } from '@/core/database';
</script>

<template>
  <div class="topbar clickable" @click="signOut" v-if="isLoggedIn"> Sign out </div>
  <RouterView />
</template>

<style scoped>
.topbar {
  position: absolute;
  top: 0;
  right: 0;
}
</style>