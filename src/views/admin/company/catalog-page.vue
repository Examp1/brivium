<script setup lang="ts">
import saveSidebar from "@/components/sidebar/save-sidebar.vue";
import { useFetch } from "@/composables/useFetch";
import { onMounted } from "vue";
const companyInfoStore = useCompanyInfoStore();
const userStore = useAuthStore();
const { accessToken } = storeToRefs(userStore);
const { companyCatalogInfo, selectedIds } = storeToRefs(companyInfoStore);

const catalog = ref(null);

onMounted(async () => {
    if (!companyCatalogInfo.value) {
        companyInfoStore.fetchCompanyCatalogSelectedInfo();
    }
    const { data } = await useFetch(
        `${APP_ENUM.BASE_API_URL}/api/catalog/group-list`,
        {
            method: ERequestMethods.POST,
            headers: {
                Authorization: `Bearer ${accessToken.value}`,
            },
            data: {
                lang: "uk",
            },
        },
    );
    catalog.value = data.value;
});
</script>

<template>
    <v-container>
        <v-row>
            <v-col cols="10">
                <v-expansion-panels multiple>
                    <v-expansion-panel
                        v-for="category in catalog"
                        :key="category.id"
                    >
                        <v-expansion-panel-title>{{
                            category.name
                        }}</v-expansion-panel-title>
                        <v-expansion-panel-text>
                            <v-list density="compact">
                                <v-list-item
                                    v-for="child in category.children"
                                    :key="child.id"
                                >
                                    <v-checkbox
                                        @input="
                                            companyInfoStore.setCatalogIds(
                                                child.id,
                                            )
                                        "
                                        :model-value="
                                            selectedIds.includes(child.id)
                                        "
                                        :label="child.name"
                                    ></v-checkbox>
                                </v-list-item>
                            </v-list>
                        </v-expansion-panel-text>
                    </v-expansion-panel>
                </v-expansion-panels>
            </v-col>
            <v-col cols="2">
                <saveSidebar @save="companyInfoStore.updateCompanyInfo" />
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
