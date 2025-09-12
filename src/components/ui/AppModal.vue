<script setup lang="ts">
const emit = defineEmits("close");
</script>

<template>
    <Teleport to="body">
        <div
            class="fixed inset-0 h-full w-full flex items-center justify-center bg-gray-400/50 backdrop-blur-[10px] z-100"
            @click.self="emit('close')"
        >
            <div class="modal-content">
                <slot />
            </div>
        </div>
    </Teleport>
</template>

<style lang="scss" scoped></style>
