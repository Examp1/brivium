<script setup lang="ts">
const emit = defineEmits(["changeCurrentTab"]);
const tabList = ["Загальна інформація", "Ставки", "Файли", "Коментарі"];
const activeTab = ref(tabList[0]);

const changeActiveTab = (tab: string) => {
    activeTab.value = tab;
    emit("changeCurrentTab", tab);
};
</script>
<template>
    <div class="flex my-3">
        <div
            v-for="tab in tabList"
            :key="tab"
            class="cursor-pointer py-3.5 px-4 rounded-lg"
            :class="{ activeTab: activeTab == tab }"
            @click="changeActiveTab(tab)"
        >
            {{ tab }}
        </div>
    </div>
</template>

<style lang="scss"></style>
