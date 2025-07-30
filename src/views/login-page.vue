<script setup lang="ts">
import { BASE_URL } from "@/utils/constants";
import { EMethods } from "@/types/type";
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/store/auth-store";
import { useRouter } from "vue-router";
import { useFetch } from "@/composables/useFetch";
const router = useRouter();

const loginInputs = ref({
    login: "budcraft@gmail.com",
    password: "00000000",
});

const userStore = useAuthStore();
const { accessToken } = storeToRefs(userStore);

const signIn = async () => {
    const { data, error } = await useFetch(
        `${BASE_URL}/api/auth/company/login`,
        {
            method: EMethods.POST,
            headers: {
                "Content-type": "application/json",
            },
            data: loginInputs.value,
        },
    );
    if (!error.value) {
        checkToken(data?.value?.one_time_token);
    }
};
const checkToken = async (token: string) => {
    const { data } = await useFetch(`${BASE_URL}/api/auth/company/get-token`, {
        method: EMethods.POST,
        headers: {
            "Content-type": "application/json",
        },
        data: {
            one_time_token: token,
        },
    });
    console.log(data);
    accessToken.value = data?.value?.token;
    router.push("/company/info");
};
</script>

<template>
    {{ accessToken }}
    <v-sheet class="mx-auto" width="300">
        <v-form fast-fail @submit.prevent="signIn">
            <v-text-field
                v-model="loginInputs.login"
                label="Login"
            ></v-text-field>
            <v-text-field
                v-model="loginInputs.password"
                label="Password"
                type="password"
            ></v-text-field>

            <v-btn class="mt-2" type="submit" block>Submit</v-btn>
        </v-form>
        <br />
        <p>
            Dont have an account?
            <router-link to="/signup">Sign up</router-link>
        </p>
    </v-sheet>
</template>

<style scoped></style>
