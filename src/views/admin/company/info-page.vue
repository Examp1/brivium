<script setup lang="ts">
import { onMounted } from "vue";
import { useCompanyInfoStore } from "@/store/company-info-store";
import { storeToRefs } from "pinia";
const companyInfoStore = useCompanyInfoStore();
const { companyInfo } = storeToRefs(companyInfoStore);

onMounted(async () => {
    companyInfoStore.fetchCompanyInfo();
});
</script>

<template>
    <pre>{{ companyInfo }}</pre>
</template>

<style scoped></style>
