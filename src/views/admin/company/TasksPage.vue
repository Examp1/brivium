<script setup lang="ts">
import BaseBtn from "@/components/base/BaseBtn.vue";
import { onMounted } from "vue";

const tasks = ref();

onMounted(async () => {
    const { data } = await fetchWrapper("api/task/list", ERequestMethods.POST, {
        filter: {
            search: "",
            budget: {
                from: 0,
                to: 1000000,
            },
            catalog_ids: [], // 652
            customer_ids: [],
            location_id: null, // 24485 - кіровоградська обл.
            with_files: 0,
            without_bids: 0,
        },
        sort: {
            by: "created_at", // created_at|budget
            order: "desc",
        },
        page: 1,
    });
    tasks.value = data.value;
});

const bid = async (task) => {
    const { data } = await fetchWrapper("api/task/bid", ERequestMethods.POST, {
        stage_id: task.id,
        price: 4000,
        visit_price: 500,
        comment: "Зробимо в кращому виді",
        private: 0,
    });
    console.log(data);
};
</script>

<template>
    <div class="p-4 border-t border-gray-100">
        <ul v-if="tasks?.items.length">
            <li class="mb-4" v-for="task in tasks.items" :key="task.id">
                {{ task.name }} <br />
                Опис: {{ task.description }}
                <br />
                бюджет: {{ task.budget }}
                <BaseBtn title="сделать ставку" @click="bid(task)" />
            </li>
        </ul>
    </div>
</template>

<style scoped></style>
