<script setup lang="ts">
import { useFetch } from "@/composables/useFetch";
import { APP_ENUM } from "@/enums/app_enums";
import { ERequestMethods } from "@/enums/ERequestMethod";
import { useField } from "vee-validate";

interface ILocationSearchResponse {
    googlemap_link?: string;
    id: number;
    text: string;
}

const props = defineProps<{
    label?: string;
    placeholder?: string;
    type?: string;
    name: string;
    icon?: string;
    iconPosition?: string;
    defaultValue?: string | number;
}>();

const paddingClasses = ref("");
switch (props.iconPosition) {
    case "right":
        paddingClasses.value = "pr-11 pl-4";
        break;
    case "left":
        paddingClasses.value = "pr-4 pl-10";
        break;
    default:
        paddingClasses.value = "px-4";
        break;
}

const searchQueryResult = ref();
const searchResult = ref<ILocationSearchResponse[]>([]);

const { setValue, errors } = useField(props.name as string);

if (props.defaultValue) {
    setValue(props.defaultValue);
}

const debouncedSearch = _debounce((event) => search(event), 700);

const search = async (event) => {
    if (event.target.value.length < 3) return;
    searchQueryResult.value = event.target.value;
    const { data } = await useFetch<ILocationSearchResponse[]>(
        `${APP_ENUM.BASE_API_URL}/api/location/search/settlement`,
        {
            method: ERequestMethods.POST,
            data: {
                q: event.target.value,
            },
        },
    );
    if (data.value) {
        searchResult.value = data.value;
    }
};

const changeValue = (item: ILocationSearchResponse) => {
    setValue(item.id);
    searchQueryResult.value = item.text;
};
</script>

<template>
    <div class="form-field flex flex-col">
        <label
            v-if="label"
            :class="errors.length ? 'text-red-400' : 'text-gray-600'"
            class="mb-2 font-medium text-sm"
            >{{ label }}</label
        >
        <div class="relative flex">
            <span
                v-if="icon"
                class="absolute top-[50%] -translate-y-[50%] icon text-gray-400"
                :class="[
                    icon,
                    iconPosition === 'right' ? 'right-[20px] ' : 'left-[10px]',
                ]"
            ></span>
            <div class="relative w-full group">
                <input
                    class="w-full h-[48px] border outline-0 rounded-lg"
                    :class="[
                        icon ? 'py-3.5' : 'py-3.5 px-4',
                        paddingClasses,
                        errors.length
                            ? 'border-red-400 placeholder:text-red-400'
                            : 'border-gray-400 placeholder:text-gray-400',
                    ]"
                    :placeholder="placeholder"
                    :value="searchQueryResult"
                    @input="debouncedSearch"
                />
                <div
                    class="base-transition absolute top-[100%] left-0 w-full border border-gray-400 rounded-lg bg-white z-1 overflow-hidden opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-[1000px]"
                >
                    <div
                        v-for="item in searchResult"
                        :key="item.id"
                        class="px-3.5 py-1.5 hover:bg-gray-200 base-transition cursor-pointer"
                        @click="changeValue(item)"
                    >
                        {{ item.text }}
                    </div>
                </div>
            </div>
        </div>
        <span v-if="errors" class="text-red-400">{{ errors[0] }}</span>
    </div>
</template>
