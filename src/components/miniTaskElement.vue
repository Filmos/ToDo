<script setup lang="ts">
import { computed } from 'vue';
import TaskFrame from '@/components/taskFrame.vue';
import TaskIcon from '@/components/taskIcon.vue';
import { defaultTask, getImage } from '@/core/tasks';

const props = defineProps(['task', 'tooltipRef'])
const fullTask = computed(() => {
    return { ...defaultTask, ...props.task }
})
const image = getImage(fullTask)

function onHover() {
    props.tooltipRef.value = fullTask.value.task
}
function onUnhover() {
    if (props.tooltipRef.value !== fullTask.value.task) return
    props.tooltipRef.value = ''
}
</script>

<template>
    <TaskFrame class="task" :task="fullTask" @mouseover="onHover" @mouseleave="onUnhover">
        <div class="task-image">
            <TaskIcon v-if="!image" :task="fullTask" />
        </div>
        <img v-if="image" class="task-image" :src="image" />
    </TaskFrame>
</template>


<style lang="scss" scoped>
.task {
    width: 5rem;
    height: 5rem;
    margin: 0.4rem;
}

.task-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: calc(0.6rem - 3px);
    opacity: 0.6;

    &:hover {
        opacity: 1;
    }
}

img.task-image {
    filter: saturate(0.4);

    &:hover {
        filter: saturate(0.6);
    }
}

div.task-image {
    font-size: 4rem;
    line-height: 4rem;
    text-align: center;
    text-transform: uppercase;
    user-select: none;
}
</style>
