<script setup lang="ts">
import { useFetch } from "@/composables/useFetch";
import { APP_ENUM } from "@/enums/app_enums";
import { useAuthStore } from "@/store/auth-store";
import { storeToRefs } from "pinia";
import { onMounted, ref } from "vue";
const companyInfo = ref(null);
const userStore = useAuthStore();
const { accessToken } = storeToRefs(userStore);

onMounted(async () => {
    const { data } = await useFetch(
        `${APP_ENUM.BASE_API_URL}/api/profile/company`,
        {
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken.value}`,
            },
        },
    );
    companyInfo.value = data.value;
});
</script>

<template>
    <pre>{{ companyInfo }}</pre>
</template>

<style scoped></style>
