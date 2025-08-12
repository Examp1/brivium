<script setup lang="ts">
import CatalogItem from "./catalog/catalog-item.vue";

const companyInfoStore = useCompanyCatalogStore();
const { companyCatalog } = storeToRefs(companyInfoStore);
</script>

<template>
    <div class="catalog-item-wrapper">
        <CatalogItem
            v-for="category in companyCatalog"
            :key="category.name"
            :category
        />
    </div>
</template>

<style lang="scss" scoped></style>
