<script setup lang="ts">
import * as zod from "zod";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import FormInput from "../../form/inputs/FormInput.vue";

const props = defineProps<{ projectId: number }>();
const emit = defineEmits(["close"]);

const projectStageStore = useProjectstageStore();

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
    await projectStageStore.addNewProject(values);
    emit("close");
});

const trySaveStage = (stageName: string) => {
    if (!stageName.length) return;
    projectStageStore.addDraftStageToProject(props.projectId, stageName);
};
</script>

<!-- {
    "stage_id": 4,
    "name": "Кладка стін",
    "description": "Опис",
    "city_id": 25265,
    "status": 2,
    "start_at": "01.12.2000",
    "finish_at": "11.12.2000",
    "actual_start_at": "11.12.2000",
    "actual_finish_at": "11.12.2000",
    "expired_at": "",
    "company_id":3,
    "budget":20000,
    "customer":2
} -->

<template>
    <div class="p-5 rounded-lg bg-white w-[540px]">
        <form @submit="onSubmit" class="flex flex-col gap-5">
            <FormInput
                label="Name"
                placeholder="enter name of project"
                name="name"
                @blur="trySaveStage"
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
