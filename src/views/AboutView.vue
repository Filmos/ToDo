<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<script setup lang="ts">
import db from '@/core/database';
import { ref, onValue } from "firebase/database";

onValue(ref(db, "tasks"), (snapshot) => {
  const data = snapshot.val();
  console.log(data);
});

</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
