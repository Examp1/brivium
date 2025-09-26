<script setup lang="ts">
import { onMounted } from "vue";

const companyReviewsStore = useCompanyReviewsStore();
const { companyReviews } = storeToRefs(companyReviewsStore);

onMounted(async () => {
    await companyReviewsStore.fetchReviews();
});
</script>

<template>
    <div class="p-4 border-t border-gray-100">
        {{ companyReviews }}
    </div>
</template>

<style scoped></style>
