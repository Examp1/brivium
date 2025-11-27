<script setup lang="ts">
import BaseBtn from "@/components/base/BaseBtn.vue";
import BaseInput from "@/components/base/BaseInput.vue";
import AddContactsForm from "@/components/contacts/AddContactsForm.vue";
import ContactsList from "@/components/contacts/ContactsList.vue";
import { storeToRefs } from "pinia";
const clientInfoStore = useClientInfoStore();
const { clientInfo } = storeToRefs(clientInfoStore);
</script>

<template>
    <div class="p-4 min-h-screen">
        <h2 class="text-[28px] font-bold">Особиста інформація</h2>
        <div class="grid grid-cols-2 gap-10">
            <div class="grid gap-5 mt-5 h-fit">
                <div class="grid grid-cols-[0.5fr_1fr] items-center">
                    <span class="text-sm text-[#364A63]">Повне ім’я</span>
                    <BaseInput
                        v-model="clientInfo.name"
                        placeholder="Введіть повне ім’я"
                    />
                </div>
                <div class="grid grid-cols-[0.5fr_1fr] items-center">
                    <span class="text-sm text-[#364A63]">email</span>
                    <BaseInput
                        v-model="clientInfo.email"
                        placeholder="Введіть повне ім’я"
                    />
                </div>
                <div class="grid grid-cols-[0.5fr_1fr] items-center">
                    <span class="text-sm text-[#364A63]">Місто</span>
                    <BaseInput
                        v-model="clientInfo.city_id"
                        placeholder="Місто"
                    />
                </div>
                <div class="grid grid-cols-[0.5fr_1fr] items-center">
                    <span class="text-sm text-[#364A63]">Телефон</span>
                    <BaseInput
                        v-model="clientInfo.phone"
                        placeholder="Телефон"
                    />
                </div>
                <ContactsList />
                <BaseBtn title="Зберегти" />
            </div>
            <AddContactsForm />
        </div>
    </div>
</template>

<style scoped></style>
