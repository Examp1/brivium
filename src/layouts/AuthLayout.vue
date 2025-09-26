<script setup lang="ts"></script>

<template>
    <div class="grid grid-cols-2 h-screen w-full">
        <div class="flex items-center justify-center">
            <slot />
        </div>
        <div class="bg-green-100"></div>
    </div>
</template>

<style scoped></style>
