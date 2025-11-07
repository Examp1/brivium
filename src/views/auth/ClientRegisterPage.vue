<script setup lang="ts">
import { clientValidateScheme } from "@/zod/auth/shemes";
import FormInput from "@/components/form/inputs/FormInput.vue";
import { useForm } from "vee-validate";
import BaseBtn from "@/components/base/BaseBtn.vue";
import FormLocationSearch from "@/components/form/inputs/FormLocationSearch.vue";
import { showError } from "@/composables/toast-notification";
import { useFetch } from "@/composables/useFetch";

const { handleSubmit } = useForm({
    validationSchema: clientValidateScheme,
});

const onSubmit = handleSubmit(async (values) => {
    const companyData = {
        ...values,
        country_id: 1,
        _subscription_id: 4,
    };
    useFetch(`${APP_ENUM.BASE_API_URL}/api/auth/client/register`, {
        method: ERequestMethods.POST,
        data: companyData,
    }).catch((err) => {
        showError(err);
    });
});
</script>

<template>
    <div class="flex flex-col items-center">
        <h2 class="text-[28px] font-bold mb-[16px]">Реестрація в клієнта</h2>
        <form @submit.prevent="onSubmit" class="w-[400px] grid gap-5">
            <FormInput placeholder="email" name="email" />
            <FormInput placeholder="Name" name="name" />
            <FormInput placeholder="Lastname" name="lastname" />
            <FormInput placeholder="Surname" name="surname" />
            <FormInput placeholder="Position" name="position" />
            <FormInput placeholder="Phone" name="phone" type="phone" />
            <FormLocationSearch placeholder="city_id" name="city_id" />
            <FormInput placeholder="Password" name="password" type="password" />
            <BaseBtn class="w-full" @click="onSubmit" title="Зареєструватися" />
        </form>
    </div>
</template>

<style scoped></style>
