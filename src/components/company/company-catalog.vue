<script setup lang="ts">
const companyInfoStore = useCompanyCatalogStore();
const { compnaySelectedIds, companyCatalog } = storeToRefs(companyInfoStore);
</script>

<template>
    <v-expansion-panels multiple>
        <v-expansion-panel
            v-for="category in companyCatalog"
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
                            @input="companyInfoStore.setCatalogIds(child.id)"
                            :model-value="compnaySelectedIds.includes(child.id)"
                            :label="child.name"
                        ></v-checkbox>
                    </v-list-item>
                </v-list>
            </v-expansion-panel-text>
        </v-expansion-panel>
    </v-expansion-panels>
</template>

<style lang="scss" scoped></style>
