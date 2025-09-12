<script setup lang="ts">
import NotoficationBtn from "../notifications/NotoficationBtn.vue";

const emit = defineEmits(["toggleView"]);

const companyInfoStore = useCompanyInfoStore();
const { companyInfo } = storeToRefs(companyInfoStore);
</script>

<template>
    <header class="sticky top-0">
        <menu
            class="h-[70px] bg-white w-full p-4 border-b border-gray-200 flex justify-between"
        >
            <button
                @click="emit('toggleView')"
                class="xl:opacity-0 flex items-center justify-center w-10 h-10 text-gray-500 border-gray-200 rounded-lg border"
            >
                <span class="mdi mdi-menu"></span>
            </button>

            <div class="flex items-center gap-3">
                <NotoficationBtn />
                <img
                    class="h-[44px] w-[44px] rounded-full"
                    src="https://static.vecteezy.com/system/resources/thumbnails/000/439/863/small/Basic_Ui__28186_29.jpg"
                    alt=""
                />
                <span class="font-medium text-sm">{{ companyInfo.name }}</span>
            </div>
        </menu>
    </header>
</template>

<style lang="scss" scoped></style>
