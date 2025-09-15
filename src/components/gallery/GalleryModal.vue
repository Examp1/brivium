<script setup lang="ts">
import * as zod from "zod";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import AppInput from "../form/inputs/AppInput.vue";
import { useFetch } from "@/composables/useFetch";

import { useCookies } from "@vueuse/integrations/useCookies";
const cookies = useCookies(["accessToken"]);

const validationSchema = toTypedSchema(
    zod.object({
        title: zod.string().min(1, { message: "This is required" }),
        description: zod
            .string()
            .min(1, { message: "This is required" })
            .min(8, { message: "Too short" }),
    }),
);

const { handleSubmit, errors } = useForm({
    validationSchema,
});

const onSubmit = handleSubmit((values) => {
    useFetch(`${APP_ENUM.BASE_API_URL}/api/profile/company/gallery/add`, {
        method: ERequestMethods.POST,
        data: values,
        headers: {
            Authorization: `Bearer ${cookies.get("accessToken")}`,
        },
    });
});
</script>

<template>
    <div class="p-5 rounded-lg bg-white w-[540px]">
        {{ errors }}
        <form @submit="onSubmit" class="flex flex-col gap-5">
            <AppInput
                label="Name"
                placeholder="placeholder"
                icon="mdi mdi-phone"
                icon-position="right"
                name="title"
            />
            <AppInput
                label="Description"
                placeholder="placeholder"
                icon="mdi mdi-phone"
                icon-position="right"
                name="description"
            />
            <button
                type="submit"
                class="h-11 px-10 bg-green-500 text-white rounded-lg mb-3 ml-auto"
            >
                Добавить альбом
            </button>
        </form>
    </div>
</template>

<style scoped></style>
