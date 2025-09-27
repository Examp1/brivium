<script setup lang="ts">
import { companyValidateSheme } from "@/zod/auth/shemes";
import FormInput from "@/components/form/inputs/FormInput.vue";
import FormSelect from "@/components/form/inputs/FormSelect.vue";
import { useForm } from "vee-validate";
import BaseBtn from "@/components/base/BaseBtn.vue";
import FormLocationSearch from "@/components/form/inputs/FormLocationSearch.vue";
import { showError } from "@/composables/toast-notification";
import { useFetch } from "@/composables/useFetch";

const companyType = [
    {
        value: 1,
        title: "Майстер",
    },
    {
        value: 2,
        title: "Бригада",
    },
    {
        value: 3,
        title: "Компанія",
    },
];

const { handleSubmit } = useForm({
    validationSchema: companyValidateSheme,
});

const onSubmit = handleSubmit(async (values) => {
    console.log(values);
    const companyData = {
        ...values,
        country_id: 1,
        _subscription_id: 4,
    };
    useFetch(`${APP_ENUM.BASE_API_URL}/api/auth/company/register`, {
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
        <FormInput
            label="Phone"
            placeholder="Phone"
            name="phone"
            type="phone"
        />
        <FormInput
            label="Password"
            placeholder="Password"
            name="password"
            type="password"
        />
        <FormSelect
            label="type"
            name="type"
            :list="companyType"
            placeholder="выбреите тип компании"
        />
        <FormLocationSearch
            label="City id"
            placeholder="city_id"
            name="city_id"
        />
        <BaseBtn @click="onSubmit" title="Зареєструватися" />
    </form>
</template>

<style scoped></style>
