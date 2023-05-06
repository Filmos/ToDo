<script setup lang="ts">
import taskInput from '@/components/taskInput.vue';
import { db, requireLogin } from '@/core/database';
import { ref, onValue } from "firebase/database";
requireLogin();

onValue(ref(db, "tasks"), (snapshot) => {
  const data = snapshot.val();
  console.log(data);
});

function addTask(task: string) {
  console.log(`Adding task "${task}"`);
}
</script>

<template>
  <main class="grid">
    <taskInput @onEnter="addTask" />
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
