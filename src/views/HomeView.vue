<script setup lang="ts">
import taskInput from '@/components/taskInput.vue';
import taskElement from '@/components/taskElement.vue';
import { requireLogin } from '@/core/database';
import { createTask, shuffledTasks } from '@/core/tasks';
requireLogin();
</script>

<template>
  <main class="grid">
    <taskInput @onEnter="createTask" />
    <div class="tasks-primary">
      <taskElement v-for="task in shuffledTasks.slice(0, 3)" :key="task.uid" :task="task" />
    </div>
    <div class="tasks-secondary">
      <div v-for="task in shuffledTasks.slice(3)" :key="task.uid" :task="task">{{ task }}</div>
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
  width: 100%;
}

.tasks {
  width: 100%;
}

.tasks-primary {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: flex-start;
  flex-wrap: wrap;
  width: 100%;
}
</style>
