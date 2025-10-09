<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import FormInput from "../../form/inputs/FormInput.vue";
import FormLocationSearch from "@/components/form/inputs/FormLocationSearch.vue";
import FormSelect from "@/components/form/inputs/FormSelect.vue";
import { projectFormSchema } from "@/zod/modals/AddProjectStage";
import FormDatepicker from "@/components/form/inputs/FormDatepicker.vue";

const props = defineProps<{ projectId: number }>();
const emit = defineEmits(["close"]);

const projectStageStore = useProjectstageStore();

const validationSchema = toTypedSchema(projectFormSchema);

const { handleSubmit, errors } = useForm({
    validationSchema,
    initialValues: {
        name: "abama",
    },
});

const stageID = ref();
const customerSelect = ref([
    {
        value: 1,
        title: "Власник",
    },
    {
        value: 2,
        title: "Підрядник",
    },
    {
        value: 3,
        title: "Посередник",
    },
]);

const statusSelect = ref([
    {
        value: 1,
        title: "Чернетка",
    },
    {
        value: 2,
        title: "Шукаю виконавця",
    },
    {
        value: 3,
        title: "Завершився",
    },
    {
        value: 9,
        title: "Видалено",
    },
    {
        value: 10,
        title: "Зроблено",
    },
]);

const onSubmit = handleSubmit(async (values) => {
    const updatedValues = { stage_id: stageID.value, ...values };
    await projectStageStore.updateProjectStage(updatedValues);
    emit("close");
});

const trySaveStage = async (stageName: string) => {
    if (!stageName.length) return;
    const stage = await projectStageStore.addDraftStageToProject(
        props.projectId,
        stageName,
    );
    stageID.value = stage?.value?.model.id;
};
</script>

<template>
    <div class="p-5 rounded-lg bg-white w-[540px]">
        <form @submit="onSubmit" class="flex flex-col gap-3">
            <FormInput
                label="Назва етапу"
                placeholder="Введіть назву етапу"
                name="name"
                @blur="trySaveStage"
            />
            <FormInput
                label="Опис"
                placeholder="Опис етапу"
                name="description"
            />
            <!-- сразу подтянуть от клиента -->
            <FormLocationSearch
                label="Місто"
                placeholder="Почніть вводити назву міста"
                name="city_id"
            />
            <div class="grid grid-cols-2 gap-2">
                <FormDatepicker name="start_at" label="Початок етапу" />
                <FormDatepicker name="finish_at" label="Кінець етапу" />
                <FormDatepicker name="expired_at" label="Дійсна до" />
                <FormInput
                    label="Бюджет"
                    placeholder="Введіть бюджет на етап"
                    name="budget"
                    type="number"
                />
            </div>
            <FormSelect
                label="Замовник (роль)"
                name="customer"
                :list="customerSelect"
                :default-value="1"
            />
            <FormSelect
                label="Статус"
                name="status"
                :list="statusSelect"
                :default-value="2"
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
