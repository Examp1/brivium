<script setup lang="ts">
const companyPricesStore = useCompanyPricesStore();
const { filledPrices } = storeToRefs(companyPricesStore);
defineProps(["priceInfo"]);

const isItemOpen = ref<boolean>(false);

const debouncedSetPrice = _debounce(
    (catalog_id: number, price_id: number, cost: number) => {
        companyPricesStore.setPrices({ catalog_id, price_id, cost });
    },
    300,
);
</script>

<template>
    <div class="price-item">
        <h3
            class="py-3 text-base font-semibold text-gray-800 flex justify-between cursor-pointer"
            @click="isItemOpen = !isItemOpen"
        >
            {{ priceInfo.full_name }}
            <span class="mdi mdi-chevron-down"></span>
        </h3>
        <ul v-if="isItemOpen" class="flex flex-col">
            <li
                v-for="service in priceInfo.prices"
                :key="service.id"
                class="border-b border-gray-200 px-3 py-2.5 last:border-b-0"
            >
                <div class="flex items-center justify-between gap-2">
                    <span class="text-lg font-medium">{{ service.name }}</span>
                    <div class="flex border rounded-lg border-gray-300">
                        <input
                            id="test"
                            :value="filledPrices[service.id]?.cost"
                            class="outline-0 h-11 w-full appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 bg-transparent text-gray-800"
                            type="text"
                            @input="
                                debouncedSetPrice(
                                    priceInfo.id,
                                    service.id,
                                    +($event.target as HTMLInputElement).value,
                                )
                            "
                        />
                        <div
                            class="flex items-center justify-center h-11 w-20 text-sm bg-gray-100 rounded-r-lg"
                        >
                            {{ service.unit }}
                        </div>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<style lang="scss" scoped></style>
