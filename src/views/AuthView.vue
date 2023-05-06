<template>
  <div id="firebaseui-auth-container"></div>
</template>

<script setup lang="ts">
import { makeAuthUI } from '@/core/database';
import { onMounted } from 'vue';

onMounted(() => {
  makeAuthUI("#firebaseui-auth-container");
});
</script>