<script setup lang="ts">
defineProps(["category"]);

const companyInfoStore = useCompanyCatalogStore();
const { compnaySelectedIds } = storeToRefs(companyInfoStore);

const isItemOpen = ref<boolean>(false);
</script>

<template>
    <div class="catalog-item">
        <h3
            class="py-3 text-base font-semibold text-gray-800 flex justify-between cursor-pointer"
            @click="isItemOpen = !isItemOpen"
        >
            {{ category.name }}
            <span class="mdi mdi-chevron-down"></span>
        </h3>
        <ul v-if="isItemOpen" class="flex flex-col">
            <li
                v-for="child in category.children"
                :key="child.id"
                class="border-b border-gray-200 px-3 py-2.5 last:border-b-0"
            >
                <div class="flex items-center gap-2">
                    <label
                        class="flex items-center space-x-3 group cursor-pointer"
                    >
                        <div class="relative w-5 h-5">
                            <input
                                :id="child.name + '_' + child.id"
                                @input="
                                    companyInfoStore.setCatalogIds(child.id)
                                "
                                :checked="compnaySelectedIds.includes(child.id)"
                                type="checkbox"
                                class="w-5 h-5 appearance-none cursor-pointer border border-gray-300 text-transparent checked:text-white checked:border-transparent rounded-md checked:bg-blue-500 mdi mdi-check flex items-center text-sm justify-center"
                            />
                        </div>
                    </label>
                    <label
                        :for="child.name + '_' + child.id"
                        class="flex items-center text-sm text-gray-500 cursor-pointer select-none"
                    >
                        {{ child.name }}
                    </label>
                </div>
            </li>
        </ul>
    </div>
</template>

<style lang="scss" scoped></style>
