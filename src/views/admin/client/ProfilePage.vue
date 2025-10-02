<script setup lang="ts">
import { storeToRefs } from "pinia";
const clientInfoStore = useClientInfoStore();
const { clientInfo } = storeToRefs(clientInfoStore);
</script>

<template>
    <div>
        <pre>{{ clientInfo }}</pre>
    </div>
</template>

<style scoped></style>
