<script setup lang="ts">
import { ref } from "vue";
import { showError } from "@/composables/toast-notification";

const signupInputs = ref({
    email: "",
    name: "",
    phone: "",
    password: "",
    country_id: "1", // статика всегда 1
    city_id: 24702, // {{host}}api/location/search/settlement от сюда берем города
    type: 1, // {{host}}api/dictionary/company/all от сюда типы ( сделать enum )
    _subscription_id: "4", // не трогаем (и не передаем) пока что при регестрации по дефолту "trial"
});

const signUp = () => {
    fetch(`${APP_ENUM.BASE_API_URL}/api/auth/company/register`, {
        method: ERequestMethods.POST,
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(signupInputs.value),
    }).catch((err) => {
        showError(err);
    });
};
</script>

<template>
    <div class="grid grid-cols-2">
        <div class="left"></div>
        <div class="right"></div>
    </div>
</template>

<style scoped></style>
