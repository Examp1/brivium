<script setup lang="ts">
const companyPricesStore = useCompanyPricesStore();
const { companyPricesList } = storeToRefs(companyPricesStore);
</script>

<template>
    <div
        v-for="companyPriceItem in companyPricesList"
        :key="companyPriceItem.id"
    >
        <v-table>
            <thead>
                <tr>
                    <h2>{{ companyPriceItem.full_name }}</h2>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in companyPriceItem.prices" :key="item.id">
                    <td>{{ item.name }}</td>
                    <td>
                        <v-text-field
                            v-model="item.value"
                            density="compact"
                            variant="outlined"
                            hide-details
                            class="text-end"
                            style="max-width: 100px"
                        />
                    </td>
                </tr>
            </tbody>
        </v-table>
    </div>
</template>

<style lang="scss" scoped></style>
