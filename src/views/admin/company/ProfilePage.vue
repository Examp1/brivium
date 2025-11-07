<script setup lang="ts">
import BaseBtn from "@/components/base/BaseBtn.vue";
import BaseInput from "@/components/base/BaseInput.vue";
import { storeToRefs } from "pinia";
const companyInfoStore = useCompanyInfoStore();
const { companyInfo } = storeToRefs(companyInfoStore);
</script>

<template>
    <div class="p-4">
        <h2 class="text-[28px] font-bold">Особиста інформація</h2>
        <div class="max-w-[500px] grid gap-5 mt-5">
            <div class="grid grid-cols-[0.5fr_1fr] items-center">
                <span class="text-sm text-[#364A63]">Повне ім’я</span>
                <BaseInput
                    v-model="companyInfo.name"
                    placeholder="Введіть повне ім’я"
                />
            </div>
            <div class="grid grid-cols-[0.5fr_1fr] items-center">
                <span class="text-sm text-[#364A63]">email</span>
                <BaseInput
                    v-model="companyInfo.email"
                    placeholder="Введіть повне ім’я"
                />
            </div>
            <div class="grid grid-cols-[0.5fr_1fr] items-center">
                <span class="text-sm text-[#364A63]">Місто</span>
                <BaseInput v-model="companyInfo.city_id" placeholder="Місто" />
            </div>
            <div class="grid grid-cols-[0.5fr_1fr] items-center">
                <span class="text-sm text-[#364A63]">Телефон</span>
                <BaseInput v-model="companyInfo.phone" placeholder="Телефон" />
            </div>
            <BaseBtn title="Зберегти" />
        </div>
        <pre>{{ companyInfo }}</pre>
    </div>
</template>

<style scoped></style>
