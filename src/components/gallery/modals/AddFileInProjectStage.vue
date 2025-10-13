<script setup lang="ts">
import BaseInput from "@/components/base/BaseInput.vue";

const emit = defineEmits(["fileUploaded"]);

const route = useRoute();

const uploadData = ref({
    title: "",
    public: 1,
    stage_id: +route.params.stage!,
});

const selectMedia = async (event) => {
    await uploadFile(
        "api/profile/client/project/stage/file/add",
        event.target.files,
        uploadData.value,
    );
    event.target.value = null;
    emit("fileUploaded");
};
</script>

<template>
    <div class="p-5 rounded-lg bg-white w-[540px]">
        <form class="grid gap-4">
            <BaseInput
                label="Назва файлу"
                placeholder="Введiть назву файлу"
                name="title"
                v-model="uploadData.title"
            />
            <div class="flex gap-3 items-center">
                <input
                    id="publicCheck"
                    type="checkbox"
                    class="w-[25px] h-[25px] cursor-pointer"
                    v-model="uploadData.public"
                    :true-value="1"
                    :false-value="0"
                />
                <label for="publicCheck" class="cursor-pointer"
                    >Зробити файл публічним?</label
                >
            </div>
            <label
                class="cursor-pointer w-fit h-11 px-10 bg-blue-500 text-white rounded-lg inline-flex items-center"
                for="upload_files"
            >
                Завантажити файл
            </label>
            <input
                class="hidden"
                @change="selectMedia($event)"
                type="file"
                id="upload_files"
            />
        </form>
    </div>
</template>

<style scoped></style>
