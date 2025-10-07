<script setup lang="ts">
withDefaults(
    defineProps<{
        title?: string;
        color?: string;
        customClasses?: string;
    }>(),
    {
        title: "Btn",
        color: "bg-green-500",
    },
);
</script>

<template>
    <button
        type="submit"
        class="h-11 px-10 text-white rounded-lg ml-auto"
        :class="[color, customClasses]"
    >
        {{ title }}
    </button>
</template>

<style scoped></style>
