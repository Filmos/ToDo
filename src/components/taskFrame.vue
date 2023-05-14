<script setup lang="ts">
const props = defineProps(['task'])
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
