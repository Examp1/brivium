<script setup lang="ts">
import { useField } from "vee-validate";

const props = withDefaults(
    defineProps<{
        list: {
            value: number | string;
            title: string;
        }[];
        label?: string;
        placeholder?: string;
        type?: string;
        name: string;
        icon?: string;
        iconPosition?: string;
        defaultValue?: string | number;
    }>(),
    {
        icon: "mdi mdi-chevron-down",
        iconPosition: "right",
    },
);

const placeholderValue = ref();
const { setValue, errors } = useField(props.name as string);

if (props.defaultValue) {
    props.list.forEach((el) => {
        if (el.value === props.defaultValue) {
            setValue(el.value);
            placeholderValue.value = el.title;
        }
    });
}

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
const changeValue = (item) => {
    setValue(item.value);
    placeholderValue.value = item.title;
};
</script>

<template>
    <div class="form-field flex flex-col">
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
            <div
                class="relative w-full h-[48px] border outline-0 rounded-lg flex items-center cursor-pointer group"
                :class="[
                    icon ? 'py-3.5' : 'py-3.5 px-4',
                    paddingClasses,
                    errors.length ? 'border-red-400' : 'border-gray-400',
                ]"
            >
                <span :class="[errors.length ? 'text-red-400' : '']">{{
                    placeholderValue ? placeholderValue : placeholder
                }}</span>
                <div
                    class="overflow-y-scroll base-transition absolute top-[100%] left-0 w-full border border-gray-400 rounded-lg bg-white z-1 overflow-hidden opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-[200px]"
                >
                    <div
                        v-for="item in list"
                        :key="item.title"
                        class="px-3.5 py-1.5 hover:bg-gray-200 base-transition cursor-pointer"
                        @click="changeValue(item)"
                    >
                        {{ item.title }}
                    </div>
                </div>
            </div>
        </div>
        <span v-if="errors" class="text-red-400">{{ errors[0] }}</span>
    </div>
</template>
