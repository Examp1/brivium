<script setup lang="ts">
const emit = defineEmits(["save", "saveAndClose"]);
</script>

<template>
    <v-card class="mb-4">
        <v-card-title>
            <span class="text-h6">Дії</span>
        </v-card-title>
        <v-card-text>
            <v-btn color="success" class="mr-2" @click="emit('save')"
                >Зберегти</v-btn
            >
            <v-btn
                variant="outlined"
                color="primary"
                @click="emit('saveAndClose')"
                >Зберегти і вийти</v-btn
            >
        </v-card-text>
    </v-card>
</template>

<style lang="scss" scoped></style>
