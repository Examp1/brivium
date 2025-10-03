<script setup lang="ts">
import * as zod from "zod";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import FormInput from "../../form/inputs/FormInput.vue";

const emit = defineEmits(["close"]);

const projectStore = useProjectStore();

const validationSchema = toTypedSchema(
    zod.object({
        name: zod.string().min(1, { message: "This is required" }),
        description: zod
            .string()
            .min(1, { message: "This is required" })
            .min(8, { message: "Too short" }),
    }),
);

const { handleSubmit, errors } = useForm({
    validationSchema,
});

const onSubmit = handleSubmit(async (values) => {
    await projectStore.addNewProject(values);
    emit("close");
});
</script>

<template>
    <div class="p-5 rounded-lg bg-white w-[540px]">
        <form @submit="onSubmit" class="flex flex-col gap-5">
            <FormInput
                label="Name"
                placeholder="enter name of project"
                name="name"
            />
            <FormInput
                label="Description"
                placeholder="enter description of project"
                name="description"
            />
            <button
                type="submit"
                class="h-11 px-10 bg-green-500 text-white rounded-lg mb-3 ml-auto"
            >
                Добавить проект
            </button>
        </form>
    </div>
</template>

<style scoped></style>
