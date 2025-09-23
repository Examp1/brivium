<script setup lang="ts">
import { useField } from "vee-validate";

const props = defineProps({
    label: {
        type: String,
    },
    type: {
        type: String,
        default: "text",
    },
    placeholder: {
        type: String,
    },
    name: {
        type: String,
    },
    icon: {
        type: String,
    },
    iconPosition: {
        type: String,
    },
});

const { value } = useField(props.name as string);

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
    <div class="form-field flex flex-col">
        <label v-if="label" class="text-gray-600 mb-2 font-medium text-sm">{{
            label
        }}</label>
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
                class="w-full h-[48px] border border-gray-400 outline-0 rounded-lg placeholder:text-gray-400"
                :class="[icon ? 'py-3.5' : 'py-3.5 px-4', paddingClasses]"
                :type="type"
                :name="name"
                :placeholder="placeholder"
                v-model="value"
            />
        </div>
    </div>
</template>
