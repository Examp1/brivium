<script setup lang="ts">
defineProps({
    showLabel: {
        type: Boolean,
        default: false,
    },
    label: {
        type: String,
    },
});
</script>

<template>
    <div>
        <label
            v-if="showLabel"
            for="test"
            class="mb-1.5 block text-sm font-medium text-gray-700"
            >{{ label }}</label
        >
        <div class="relative">
            <input
                id="test"
                class="h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-brand-500/20"
                type="text"
            />
        </div>
    </div>
</template>

<style lang="scss" scoped></style>
