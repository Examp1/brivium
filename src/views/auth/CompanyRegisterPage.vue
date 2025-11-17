<script setup lang="ts">
import { companyValidateScheme } from "@/zod/auth/shemes";
import FormInput from "@/components/form/inputs/FormInput.vue";
import FormSelect from "@/components/form/inputs/FormSelect.vue";
import { useForm } from "vee-validate";
import BaseBtn from "@/components/base/BaseBtn.vue";
import FormLocationSearch from "@/components/form/inputs/FormLocationSearch.vue";
import { showError } from "@/composables/toast-notification";
import { useFetch } from "@/composables/useFetch";
import AppModal from "@/components/ui/AppModal.vue";

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
    validationSchema: companyValidateScheme,
});

const showSuccess = ref<boolean>(false);

const onSubmit = handleSubmit(async (values) => {
    const companyData = {
        ...values,
        country_id: 1,
        _subscription_id: 4,
    };
    useFetch(`${APP_ENUM.BASE_API_URL}/api/auth/company/register`, {
        method: ERequestMethods.POST,
        data: companyData,
    })
        .then(() => {
            showSuccess.value = true;
        })
        .catch((err) => {
            showError(err);
        });
});
</script>

<template>
    <div class="flex flex-col items-center">
        <h2 class="text-[28px] font-bold mb-[16px]">Реестрація компанії</h2>
        <form @submit.prevent="onSubmit" class="w-[400px] grid gap-5">
            <div class="grid gap-[28px]">
                <FormInput placeholder="email" name="email" />
                <FormInput placeholder="Name" name="name" />
                <FormInput placeholder="Phone" name="phone" type="phone" />
                <FormInput
                    placeholder="Password"
                    name="password"
                    type="password"
                />
                <FormSelect
                    name="type"
                    :list="companyType"
                    placeholder="выбреите тип компании"
                />
                <FormLocationSearch placeholder="city_id" name="city_id" />
                <BaseBtn
                    class="w-full"
                    @click="onSubmit"
                    title="Зареєструватися"
                />
            </div>
        </form>
    </div>
    <AppModal v-if="showSuccess" @close="showSuccess = false">
        <div
            class="p-6 bg-white rounded-lg w-[400px] flex flex-col items-center"
        >
            <h2 class="text-2xl font-bold mb-4">Успіх!</h2>
            <p class="mb-6">
                компанія успішно зареєстрована , перевірте вашу пошту, щоб
                активувати профіль.
            </p>
            <BaseBtn
                class="w-full"
                @click="showSuccess = false"
                title="Закрити"
            />
        </div>
    </AppModal>
</template>

<style scoped></style>
