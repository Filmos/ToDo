<script setup lang="ts">
import { defineProps, computed } from 'vue';
import { defaultTask } from '@/core/tasks';

const props = defineProps(['task'])
const fullTask = computed(() => {
    return { ...defaultTask, ...props.task }
})
</script>

<template>
    <div class="task">
        <span class="title">{{ fullTask.task }}</span>
        <span v-for="value, prop in fullTask.props" :key="prop" class="prop">
            <span class="label">{{ prop }}:</span> {{ value }}
        </span>
        <span v-if="fullTask.quote" class="quote">{{ fullTask.quote }}</span>
    </div>
</template>


<style scoped>
.task {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: stretch;
    background-color: var(--color-background-soft);
    border: solid 3px var(--color-border);
    border-radius: 0.6rem;
    padding: 0.25rem 0.6rem 0.6rem;
    min-width: 28%;
    margin: 0.4rem;
}

.title {
    font-size: 1.25rem;
    line-height: 1.2em;
    color: var(--color-text-heading);
    text-align: center;
    margin-bottom: 0.8rem;
}

.prop,
.quote {
    line-height: 1.25em;
}

.label {
    color: var(--color-text-bold);
    font-weight: 500;
}

.quote {
    font-style: italic;
    margin-top: 1.1em;
    width: min-content;
    min-width: 100%;
}
</style>
