<script setup lang="ts">
import CompanyCatalog from "@/components/company/company-catalog.vue";
import CompanyPriceList from "@/components/company/company-price-list.vue";
import { onMounted, watch } from "vue";
const companyCatalogStore = useCompanyCatalogStore();
const companyPricesStore = useCompanyPricesStore();

const activeTab = ref<string>("Catalog");
const tabs = ["Catalog", "Prices"];

onMounted(async () => {
    companyCatalogStore.fetchCompanyCatalog();
});

watch(activeTab, (n) => {
    if (n === "Prices") {
        companyPricesStore.fetchPriceList();
    }
});

function save() {
    if (activeTab.value !== "Prices") {
        companyCatalogStore.updateCompanyCatalogInfo();
    } else {
        companyPricesStore.updateCompanyPricesInfo();
    }
}
</script>

<template>
    <div class="p-4 border-t border-gray-100">
        <div class="space-y-6">
            <div>
                <div class="flex">
                    <button
                        class="h-11 px-10 bg-green-500 text-white rounded-lg mb-3 ml-auto"
                        @click="save"
                    >
                        Save
                    </button>
                </div>
                <div class="p-3 border border-gray-200 rounded-t-xl">
                    <nav
                        class="flex overflow-x-auto rounded-lg bg-gray-100 p-1 gap-1"
                    >
                        <button
                            v-for="tab in tabs"
                            :key="tab"
                            class="inline-flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors duration-200 ease-in-out text-gray-900"
                            :class="
                                activeTab === tab
                                    ? 'bg-white'
                                    : 'bg-transparent'
                            "
                            @click="activeTab = tab"
                        >
                            {{ tab }}
                        </button>
                    </nav>
                </div>
                <div
                    class="p-6 pt-4 border border-t-0 border-gray-200 rounded-b-x overflow-hidden"
                >
                    <transition name="swapTab" mode="out-in">
                        <CompanyCatalog
                            v-if="activeTab === 'Catalog'"
                            key="catalog"
                        />
                        <CompanyPriceList
                            v-else-if="activeTab === 'Prices'"
                            key="prices"
                        />
                    </transition>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.swapTab-enter-active,
.swapTab-leave-active {
    transition: all 0.5s ease;
}
.swapTab-enter-from,
.swapTab-leave-to {
    opacity: 0;
    transform: translateX(100px);
}
</style>
