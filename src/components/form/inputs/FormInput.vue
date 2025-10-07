<script setup lang="ts">
import { useField } from "vee-validate";

const emit = defineEmits(["blur"]);

const props = defineProps<{
    label?: string;
    placeholder?: string;
    type?: string;
    name: string;
    icon?: string;
    iconPosition?: string;
}>();

const { value, errors } = useField(props.name as string);

const paddingClasses = ref("");
switch (props.iconPosition) {
    case "right":
        paddingClasses.value = "pr-11 pl-4";
        break;
    case "left":
        paddingClasses.value = "pr-4 pl-10";
        break;
    default:
        paddingClasses.value = "px-4";
        break;
}
</script>

<template>
    <div class="form-field flex flex-col relative">
        <label
            v-if="label"
            :class="errors.length ? 'text-red-400' : 'text-gray-600'"
            class="mb-2 font-medium text-sm"
            >{{ label }}</label
        >
        <div class="relative flex">
            <span
                v-if="icon"
                class="absolute top-[50%] -translate-y-[50%] icon text-gray-400"
                :class="[
                    icon,
                    iconPosition === 'right' ? 'right-[20px] ' : 'left-[10px]',
                ]"
            ></span>
            <input
                class="w-full h-[48px] border border-gray-400 outline-0 rounded-lg"
                :class="[
                    icon ? 'py-3.5' : 'py-3.5 px-4',
                    paddingClasses,
                    errors.length
                        ? 'border-red-400 placeholder:text-red-400'
                        : 'border-gray-400 placeholder:text-gray-400',
                ]"
                :type="type"
                :name="name"
                :placeholder="placeholder"
                v-model="value"
                @blur="emit('blur', value)"
            />
        </div>
        <span v-if="errors" class="text-red-400">{{ errors[0] }}</span>
    </div>
</template>
