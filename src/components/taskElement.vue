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
        <div class="inner">
            <span class="title">{{ fullTask.task }}</span>
            <span v-for="value, prop in fullTask.props" :key="prop" class="prop">
                <span class="label">{{ prop }}:</span> {{ value }}
            </span>
            <span v-if="fullTask.quote" class="quote">{{ fullTask.quote }}</span>
        </div>
        <span class="buttons">
            <span class="complete" @click="deleteTask(fullTask.uid)">Complete</span>
            <span class="abandon" @click="deleteTask(fullTask.uid)">Abandon</span>
        </span>
    </div>
</template>


<style lang="scss" scoped>
.task,
.inner {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: stretch;
}

.task {
    background-color: var(--color-background-soft);
    border: solid 3px var(--color-border);
    border-radius: 0.6rem;
    min-width: 28%;
    margin: 0.4rem;
}

.inner {
    padding: 0.25rem 0.6rem 0.6rem;
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
    margin-bottom: 0.4rem;
}

.buttons {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}

.buttons span {
    cursor: pointer;
    font-size: 0.9rem;
    font-weight: 500;
    width: 100%;
    text-align: center;
    padding-top: 0.5em;
    line-height: 1.6em;
    background: linear-gradient(0deg,
            rgb(var(--background-color), 0.45) 0%,
            rgb(var(--background-color), 0.22) 35%,
            rgb(var(--background-color), 0.03) 83%,
            rgb(var(--background-color), 0.0) 100%);

    &:hover {
        background: linear-gradient(0deg,
                rgb(var(--background-color), 0.55) 0%,
                rgb(var(--background-color), 0.32) 35%,
                rgb(var(--background-color), 0.05) 83%,
                rgb(var(--background-color), 0.0) 100%);
    }



    &:first-child {
        border-bottom-left-radius: calc(0.6rem - 3px);
    }

    &:last-child {
        border-bottom-right-radius: calc(0.6rem - 3px);
    }
}

.buttons .complete {
    --background-color: var(--raw-color-background-success);
    color: var(--color-text-success);

    &:hover {
        color: var(--color-text-success-hover);
    }
}

.buttons .abandon {
    --background-color: var(--raw-color-background-error);
    color: var(--color-text-error);

    &:hover {
        color: var(--color-text-error-hover);
    }
}
</style>
