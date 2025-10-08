<script setup lang="ts">
import { useField } from "vee-validate";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { watch } from "vue";

const props = defineProps<{
    label?: string;
    type?: string;
    name: string;
}>();

const date = ref();

const { errors, setValue } = useField(props.name as string);

const format = (date: Date): string => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
};
watch(date, () => {
    setValue(format(date.value));
});
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
            <VueDatePicker :format="format" v-model="date"></VueDatePicker>
        </div>
        <span v-if="errors" class="text-red-400">{{ errors[0] }}</span>
    </div>
</template>

<style lang="scss">
:root {
    --dp-border-radius: 0.5rem;
    --dp-cell-border-radius: 0.5rem;
    /*Sizing*/
    --dp-button-height: 48px;
    --dp-input-padding: 11px 40px 11px 16px;
    /* --dp-border-color */
}
.dp__input {
    --dp-border-color: var(--color-gray-400);
}
</style>
