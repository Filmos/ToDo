<script setup lang="ts">
const props = defineProps(['task', 'optional'])
</script>

<template>
    <div v-if="props.task.icon?.url || !props.optional" class="task-icon">
        <div v-if="!props.task.icon?.url && !props.optional">{{ props.task.task[0] }}</div>
        <img v-if="props.task.icon?.url" :src="props.task.icon?.url" />
    </div>
</template>


<style lang="scss" scoped>
div.task-icon {
    height: 100%;

    & div {
        font-size: 100%;
        line-height: 100%;
        height: 100%;
        font-family: system-ui;
    }

    & img {
        height: 80%;
        margin: 10%;
        filter: invert(1);
    }
}
</style>
