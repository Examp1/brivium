<script setup lang="ts">
import BaseBtn from "@/components/base/BaseBtn.vue";
const projectStageStore = useProjectstageStore();
const { projectStage } = storeToRefs(projectStageStore);
const route = useRoute();

const chooseCompany = async (company) => {
    await fetchWrapper(
        "api/profile/client/project/stage/appoint-company",
        ERequestMethods.POST,
        {
            stage_id: route.params.stage,
            company_id: company.id,
        },
    );
    projectStageStore.fetchProjectStages(+route.params.stage!);
};

const goToChat = (companyId: number) => {
    alert("чат пока не реализован");
    // const chatRoute = useRouter().resolve({
    //     name: "AdminCompanyMessages",
    //     query: { user_id: companyId.toString() },
    // });
    // window.open(chatRoute.href, "_blank");
};
</script>

<template>
    <div v-for="bid in projectStage.bids" :key="bid">
        <div
            :class="{
                'bg-gray-300 opacity-40 pointer-events-none':
                    projectStage.model.company_id !== bid.company.id,
            }"
            class="flex items-center gap-5 border-b border-gray-200 mb-4 pb-4"
        >
            <div>{{ bid.company.name }}</div>
            <div>{{ bid.company.last_seen_at_text }}</div>
            <div><b>цена выезда:</b> {{ bid.visit_price }}</div>
            <div><b>цена за работу:</b> {{ bid.price }}</div>
            <BaseBtn
                v-if="!projectStage.model.company_id"
                @click="chooseCompany(bid.company)"
                title="Вибрати компанiю"
            />
            <BaseBtn
                v-if="projectStage.model.company_id === bid.company.id"
                @click="goToChat(bid.company.id)"
                title="В чат з компанiєю"
            />
        </div>
    </div>
</template>

<style scoped></style>
