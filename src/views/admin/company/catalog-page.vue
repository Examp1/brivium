<script setup lang="ts">
import CompanyCatalog from "@/components/company/company-catalog.vue";
import CompanyPriceList from "@/components/company/company-price-list.vue";
import saveSidebar from "@/components/sidebar/save-sidebar.vue";
import { onMounted, watch } from "vue";
const companyCatalogStore = useCompanyCatalogStore();
const companyPricesStore = useCompanyPricesStore();

const tab = ref(null);

onMounted(async () => {
    companyCatalogStore.fetchCompanyCatalog();
});

watch(tab, (n) => {
    if (n === "Prices") {
        companyPricesStore.fetchPriceList();
    }
});
</script>

<template>
    <v-container>
        <v-row>
            <v-col cols="10">
                <v-tabs v-model="tab" bg-color="primary">
                    <v-tab value="Catalog">Catalog</v-tab>
                    <v-tab value="Prices">Prices</v-tab>
                </v-tabs>
                <v-tabs-window v-model="tab">
                    <v-tabs-window-item value="Catalog">
                        <CompanyCatalog />
                    </v-tabs-window-item>
                    <v-tabs-window-item value="Prices">
                        <CompanyPriceList />
                    </v-tabs-window-item>
                </v-tabs-window>
            </v-col>
            <v-col cols="2">
                <saveSidebar
                    @save="companyCatalogStore.updateCompanyCatalogInfo"
                />
            </v-col>
        </v-row>
    </v-container>
</template>

<style scoped>
.df {
    display: flex;
}
.jcsb {
    justify-content: space-between;
}
</style>
