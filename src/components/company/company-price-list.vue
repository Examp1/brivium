<script setup lang="ts">
const companyPricesStore = useCompanyPricesStore();
const { companyPricesList, filledPrices } = storeToRefs(companyPricesStore);

const debouncedSetPrice = _debounce(
    (catalog_id: number, price_id: number, cost: number) => {
        companyPricesStore.setPrices({ catalog_id, price_id, cost });
    },
    300, // или сколько нужно мс
);
</script>

<template>
    <div class="table-wrapper">
        <div
            class="table"
            v-for="companyPriceItem in companyPricesList"
            :key="companyPriceItem.id"
        >
            <div class="t-head">
                <h3>{{ companyPriceItem.full_name }}</h3>
            </div>
            <div class="t-body">
                <div
                    class="t-body-item"
                    v-for="item in companyPriceItem.prices"
                    :key="item.id"
                >
                    <p>{{ item.name }}</p>
                    <div class="group">
                        <input
                            type="text"
                            :name="item.name"
                            :value="filledPrices[item.id]?.cost"
                            @input="
                                debouncedSetPrice(
                                    companyPriceItem.id,
                                    item.id,
                                    +($event.target as HTMLInputElement).value,
                                )
                            "
                        />
                        <div class="unit">
                            {{ item.unit }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
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
