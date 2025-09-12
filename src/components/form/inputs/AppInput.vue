<script setup lang="ts">
import { computed, useId } from "vue";

const props = defineProps({
    modelValue: [String, Number],
    type: {
        type: String,
        default: "text",
    },
    label: String,
    placeholder: String,
    error: String,
    hint: String,
    disabled: Boolean,
    readonly: Boolean,
    required: Boolean,
});

defineEmits(["update:modelValue", "blur", "focus"]);

const id = useId();

const inputClasses = computed(() => {
    const base =
        "block w-full rounded-lg shadow-sm transition-colors text-gray-900 placeholder-gray-400 disabled:bg-gray-50 disabled:text-gray-500";
    const padding = props.$slots.prefix
        ? "pl-10 pr-3 py-2"
        : props.$slots.suffix
          ? "pl-3 pr-10 py-2"
          : "px-3 py-2";
    const border = props.error
        ? "border-red-300 focus:border-red-500 focus:ring-red-500"
        : "border-gray-300 focus:border-blue-500 focus:ring-blue-500";

    return `${base} ${padding} ${border} focus:outline-none focus:ring-2`;
});
</script>

<template>
    <div class="w-full">
        <label
            v-if="label"
            :for="id"
            class="block text-sm font-medium text-gray-700 mb-1"
        >
            {{ label }}
            <span v-if="required" class="text-red-500">*</span>
        </label>
        <div class="relative">
            <div
                v-if="$slots.prefix"
                class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
            >
                <slot name="prefix" />
            </div>
            <input
                :id="id"
                :type="type"
                :value="modelValue"
                :placeholder="placeholder"
                :disabled="disabled"
                :readonly="readonly"
                :required="required"
                :class="inputClasses"
                @input="$emit('update:modelValue', $event.target.value)"
                @blur="$emit('blur', $event)"
                @focus="$emit('focus', $event)"
            />
            <div
                v-if="$slots.suffix"
                class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"
            >
                <slot name="suffix" />
            </div>
        </div>
        <p v-if="error" class="mt-1 text-sm text-red-600">{{ error }}</p>
        <p v-if="hint && !error" class="mt-1 text-sm text-gray-500">
            {{ hint }}
        </p>
    </div>
</template>
