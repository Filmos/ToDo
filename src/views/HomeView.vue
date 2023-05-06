<script setup lang="ts">
import taskInput from '@/components/taskInput.vue';
import { db, requireLogin } from '@/core/database';
import { createTask, shuffledTasks } from '@/core/tasks';
requireLogin();
</script>

<template>
  <main class="grid">
    <taskInput @onEnter="createTask" />
    <div class="tasks">
      <div v-for="task in shuffledTasks" :key="task.uid" :task="task">{{ task }}</div>
    </div>
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
