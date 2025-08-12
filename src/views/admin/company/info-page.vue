<script setup lang="ts">
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
const companyInfoStore = useCompanyInfoStore();
const { companyInfo } = storeToRefs(companyInfoStore);

onMounted(async () => {
    // if (!companyInfo.value) {
    console.log("start");
    console.log(companyInfoStore.fetchCompanyInfo());
    // }
});
</script>

<template>
    <div>
        <pre>{{ companyInfo }}</pre>
    </div>
</template>

<style scoped></style>
