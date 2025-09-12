<script setup lang="ts"></script>

<template>
    <Teleport to="body">
        <div
            class="fixed inset-0 h-full w-full bg-gray-400/50 backdrop-blur-[10px] z-100"
        >
            <slot />
        </div>
    </Teleport>
</template>

<style lang="scss" scoped></style>
