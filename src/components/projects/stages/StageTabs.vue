<script setup lang="ts">
const tabList = ["Загальна інформація", "Ставки", "Файли", "Коментарі"];
const activeTab = ref(tabList[0]);
</script>
<template>
    <div class="flex my-3">
        <div
            v-for="tab in tabList"
            :key="tab"
            class="cursor-pointer py-3.5 px-4 rounded-lg"
            :class="{ activeTab: activeTab == tab }"
            @click="activeTab = tab"
        >
            {{ tab }}
        </div>
    </div>
</template>

<style lang="scss"></style>
