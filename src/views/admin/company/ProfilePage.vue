<script setup lang="ts">
import { storeToRefs } from "pinia";
const companyInfoStore = useCompanyInfoStore();
const { companyInfo } = storeToRefs(companyInfoStore);
</script>

<template>
    <div>
        <pre>{{ companyInfo }}</pre>
    </div>
</template>

<style scoped></style>
