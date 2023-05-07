<script setup lang="ts">
import { defineProps, computed } from 'vue';
import { defaultTask, deleteTask } from '@/core/tasks';

const props = defineProps(['task'])
const fullTask = computed(() => {
    return { ...defaultTask, ...props.task }
})
</script>

<template>
    <div class="task">
        <slot />
    </div>
</template>


<style lang="scss" scoped>
.task {
    background-color: var(--color-background-soft);
    border: solid 3px var(--color-border);
    border-radius: 0.6rem;
}
</style>
