<script setup lang="ts">
import taskInput from '@/components/taskInput.vue';
import { db, requireLogin } from '@/core/database';
import { createTask } from '@/core/tasks';
import { ref, onValue } from "firebase/database";
requireLogin();

onValue(ref(db, "tasks"), (snapshot) => {
  const data = snapshot.val();
  console.log(data);
});
</script>

<template>
  <main class="grid">
    <taskInput @onEnter="createTask" />
    <div class="tasks"></div>
  </main>
</template>


<style scoped>
.grid {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 100%;
}
</style>
