<script setup lang="ts">
import taskInput from '@/components/taskInput.vue';
import taskElement from '@/components/taskElement.vue';
import miniTaskElement from '@/components/miniTaskElement.vue';
import { requireLogin } from '@/core/database';
import { createTask, shuffledTasks } from '@/core/tasks';
import { type Ref, ref } from 'vue';
requireLogin();

const tooltipText: Ref<string> = ref("");
function tooltipRef() { return tooltipText }
</script>

<template>
  <main class="grid">
    <div class="grid">
      <taskInput @onEnter="createTask" />
      <div class="tasks-primary">
        <taskElement v-for="task in shuffledTasks.slice(0, 3)" :key="task.uid" :task="task" />
      </div>
      <div class="tasks-secondary">
        <miniTaskElement v-for="task in shuffledTasks.slice(3)" :key="task.uid" :task="task" :tooltipRef="tooltipRef()" />
      </div>
    </div>
    <div class="task-tooltip">{{ tooltipText }}</div>
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

.tasks-primary,
.tasks-secondary {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: flex-start;
  flex-wrap: wrap;
}

.tasks-primary {
  width: 100%;
}

.tasks-secondary {
  max-width: 100%;
}

.task-tooltip {
  font-size: 1.5rem;
  line-height: 2.2rem;
  min-height: 2.2rem;
}
</style>
