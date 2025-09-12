<script setup lang="ts">
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
const companyInfoStore = useCompanyInfoStore();
const { companyInfo } = storeToRefs(companyInfoStore);

onMounted(async () => {
    // if (!companyInfo.value) {
    await companyInfoStore.fetchCompanyInfo();
    // }
});
</script>

<template>
    <div>
        <pre>{{ companyInfo }}</pre>
    </div>
</template>

<style scoped></style>
