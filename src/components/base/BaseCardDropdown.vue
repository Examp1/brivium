<script setup lang="ts">
import { onClickOutside } from "@vueuse/core";
import { useTemplateRef } from "vue";
const emit = defineEmits(["delete", "change"]);

const openDropdown = ref<boolean>(false);

const target = useTemplateRef<HTMLElement>("dropdown");

onClickOutside(target, () => (openDropdown.value = false));
</script>

<template>
    <div
        class="action-menu absolute top-[10px] right-[10px] cursor-pointer"
        ref="dropdown"
    >
        <span
            class="mdi mdi-dots-vertical flex items-center justify-center text-xl w-[30px] h-[30px] rounded-full hover:bg-gray-200 base-transition"
            @click.stop="openDropdown = !openDropdown"
        ></span>
        <div
            v-if="openDropdown"
            class="dropdown absolute border border-gray-400 bg-white z-1 rounded-sm right-full"
        >
            <div
                class="text-sm flex gap-2 py-1 px-3 hover:bg-gray-300"
                @click.stop="emit('change')"
            >
                <span class="mdi mdi-pen"></span> Змінити
            </div>
            <div
                @click.stop="emit('delete')"
                class="text-sm flex gap-2 text-red-400 py-1 px-3 hover:bg-gray-300"
            >
                <span class="mdi mdi-delete"></span> Видалити
            </div>
        </div>
    </div>
</template>

<style scoped></style>
