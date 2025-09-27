<script setup lang="ts">
import { useCookies } from "@vueuse/integrations/useCookies";
const cookies = useCookies(["ComapnyAccessToken"]);

const myHeaders = new Headers();
myHeaders.append(
    "Authorization",
    `Bearer ${cookies.get("ComapnyAccessToken")}`,
);
const requestOptions = {
    method: "POST",
    headers: myHeaders,
    redirect: "follow",
};
fetch(
    "https://api.brivium.com.ua/api/profile/company/price/list",
    requestOptions,
)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
</script>

<template>
    <div>tariff-plan</div>
</template>

<style scoped></style>
