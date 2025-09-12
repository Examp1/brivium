<script setup lang="ts">
import PriceItem from "./catalog/PriceItem.vue";

const companyPricesStore = useCompanyPricesStore();
const { companyPricesList } = storeToRefs(companyPricesStore);
</script>

<template>
    <div class="services-item-wrapper">
        <PriceItem
            v-for="companyPriceItem in companyPricesList"
            :key="companyPriceItem.id"
            :price-info="companyPriceItem"
        />
    </div>
</template>

<style lang="scss" scoped>
.table-wrapper {
    display: grid;
    margin-top: 20px;
    gap: 20px;
}
.table {
    border: 1px solid #ccc;
}
.t-head {
    border-bottom: 1px solid #ccc;
    padding: 10px;
}
.t-body {
    .t-body-item {
        display: flex;
        justify-content: space-between;
        padding: 10px;
        &:not(:last-of-type) {
            border-bottom: 1px solid #ccc;
        }
        .group {
            display: flex;
            .unit {
                border-radius: 0px 10px 10px 0px;
                background-color: #f8f9fa;
                border: 1px solid #dee2e6;
                padding: 10px;
                height: 32px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
        }
    }
}
</style>
