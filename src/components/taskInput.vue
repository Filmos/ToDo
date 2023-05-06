<script setup lang="ts">
const emit = defineEmits(['onEnter'])

function onEnter(event: KeyboardEvent) {
  if (event.key !== "Enter") return;
  event.preventDefault();

  const input = event.target as HTMLInputElement;
  const task = input.value;
  input.value = "";

  emit("onEnter", task);
}

</script>

<template>
  <input ctype="text" class="taskInput" @keypress="onEnter">
</template>


<style scoped>
.grid {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 100%;
}

.taskInput {
  background-color: var(--color-background-mute);
  border: solid 3px var(--color-background-mute);
  color: var(--color-text);
  font-size: 1.15rem;
  border-radius: 0.6rem;
  padding: 0.35rem 0.75rem;

  width: calc(100vw - 15 * var(--outside-margin));
  min-width: 18rem;
  max-width: 70vw;
}

.taskInput:focus {
  outline: none;
  background-color: var(--color-background-soft);
  border: solid 3px var(--color-border);
}
</style>
