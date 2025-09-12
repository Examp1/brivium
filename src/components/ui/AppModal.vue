<script setup lang="ts">
import { computed, watch } from "vue";

const props = defineProps({
    modelValue: Boolean,
    title: String,
    size: {
        type: String,
        default: "md",
        validator: (value) => ["sm", "md", "lg", "xl"].includes(value),
    },
    showClose: {
        type: Boolean,
        default: true,
    },
    closeOnOverlay: {
        type: Boolean,
        default: true,
    },
});

const emit = defineEmits(["update:modelValue"]);

const sizeClasses = computed(() => {
    const sizes = {
        sm: "max-w-md",
        md: "max-w-lg",
        lg: "max-w-2xl",
        xl: "max-w-4xl",
    };
    return `w-full ${sizes[props.size]}`;
});

const close = () => {
    emit("update:modelValue", false);
};

// Закрытие по Escape
watch(
    () => props.modelValue,
    (newVal) => {
        if (newVal) {
            const handleEscape = (e) => {
                if (e.key === "Escape") {
                    close();
                }
            };
            document.addEventListener("keydown", handleEscape);
            return () => document.removeEventListener("keydown", handleEscape);
        }
    },
);
</script>

<template>
    <Teleport to="body">
        <Transition
            enter-active-class="transition ease-out duration-200"
            enter-from-class="opacity-0"
            enter-to-class="opacity-100"
            leave-active-class="transition ease-in duration-150"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
        >
            <div
                v-if="modelValue"
                class="fixed inset-0 z-50 overflow-y-auto"
                @click.self="closeOnOverlay && close()"
            >
                <div class="flex min-h-screen items-center justify-center p-4">
                    <!-- Backdrop -->
                    <div class="fixed inset-0 bg-black bg-opacity-50" />

                    <!-- Modal -->
                    <Transition
                        enter-active-class="transition ease-out duration-200"
                        enter-from-class="opacity-0 scale-95"
                        enter-to-class="opacity-100 scale-100"
                        leave-active-class="transition ease-in duration-150"
                        leave-from-class="opacity-100 scale-100"
                        leave-to-class="opacity-0 scale-95"
                    >
                        <div
                            v-if="modelValue"
                            :class="[
                                'relative bg-white rounded-lg shadow-xl',
                                sizeClasses,
                            ]"
                        >
                            <!-- Header -->
                            <div
                                v-if="title || $slots.header"
                                class="px-6 py-4 border-b border-gray-200"
                            >
                                <slot name="header">
                                    <h3
                                        class="text-lg font-semibold text-gray-900"
                                    >
                                        {{ title }}
                                    </h3>
                                </slot>
                                <button
                                    v-if="showClose"
                                    @click="close"
                                    class="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                                >
                                    <svg
                                        class="w-5 h-5"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            fill-rule="evenodd"
                                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                            clip-rule="evenodd"
                                        />
                                    </svg>
                                </button>
                            </div>

                            <!-- Body -->
                            <div class="px-6 py-4">
                                <slot />
                            </div>

                            <!-- Footer -->
                            <div
                                v-if="$slots.footer"
                                class="px-6 py-4 border-t border-gray-200"
                            >
                                <slot name="footer" />
                            </div>
                        </div>
                    </Transition>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>
