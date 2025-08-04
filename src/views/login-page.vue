<script setup lang="ts">
import { BASE_URL } from "@/utils/constants";
import { ref } from "vue";
import { useFetch } from "@/composables/useFetch";
import { useCookies } from "@vueuse/integrations/useCookies";

const router = useRouter();
const cookies = useCookies(["accessToken"]);

const loginInputs = ref({
    login: "budcraft@gmail.com",
    password: "00000000",
});

const signIn = async () => {
    const { data, error } = await useFetch(
        `${BASE_URL}/api/auth/company/login`,
        {
            method: ERequestMethods.POST,
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
        method: ERequestMethods.POST,
        headers: {
            "Content-type": "application/json",
        },
        data: {
            one_time_token: token,
        },
    });

    cookies.set("accessToken", data?.value?.token);
    router.push("/company/info");
};
</script>

<template>
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
