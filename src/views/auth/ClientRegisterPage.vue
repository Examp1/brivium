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
    <form @submit.prevent="onSubmit" class="w-[400px] grid gap-5">
        <FormInput label="Email" placeholder="email" name="email" />
        <FormInput label="Name" placeholder="Name" name="name" />
        <FormInput label="Lastname" placeholder="Lastname" name="lastname" />
        <FormInput label="Surname" placeholder="Surname" name="surname" />
        <FormInput label="Position" placeholder="Position" name="position" />
        <FormInput
            label="Phone"
            placeholder="Phone"
            name="phone"
            type="phone"
        />
        <FormLocationSearch
            label="City id"
            placeholder="city_id"
            name="city_id"
        />
        <FormInput
            label="Password"
            placeholder="Password"
            name="password"
            type="password"
        />
        <BaseBtn @click="onSubmit" title="Зареєструватися" />
    </form>
</template>

<style scoped></style>
