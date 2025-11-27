<script lang="ts" setup>
import { useForm } from "vee-validate";
import BaseBtn from "../base/BaseBtn.vue";
import FormInput from "../form/inputs/FormInput.vue";
import FormSelect from "../form/inputs/FormSelect.vue";

const contactsStore = useContactsStore();

const { handleSubmit } = useForm({});

const addNewContact = handleSubmit(async (values) => {
    console.log(values);
    const contactData = { status: 1, ...values };
    await contactsStore.addContact(contactData);
});

const contactType = ref([
    { value: 1, title: "Телефон" },
    { value: 2, title: "Email" },
    { value: 3, title: "Адресса" },
    { value: 4, title: "Сайт" },
    { value: 5, title: "Телеграм" },
    { value: 6, title: "Вайбер" },
    { value: 7, title: "Iнстаграм" },
    { value: 8, title: "Фейсбук" },
    { value: 9, title: "Ютуб" },
    { value: 10, title: "Тiкток" },
]);
const permisionType = ref([
    { value: 1, title: "Видно всім" },
    { value: 2, title: "Видно лише зареєстрованим користувачам" },
    { value: 3, title: "Видно тільки мені" },
]);
</script>

<template>
    <div>
        <h2 class="text-lg font-semibold">Додати контакт</h2>
        <form @submit="addNewContact" class="mt-5 grid grid-cols-2 gap-4">
            <FormInput label="Ваш контакт" name="value" type="text" />
            <FormSelect
                label="Тип контакту"
                name="type"
                :list="contactType"
                :default-value="1"
            />
            <FormSelect
                label="Тип відображення"
                name="permission_id"
                :list="permisionType"
                :default-value="1"
                a
            />
            <FormInput label="Опис" name="label" type="text" />
        </form>
        <BaseBtn class="mt-5" title="Зберегти контакт" @click="addNewContact" />
    </div>
</template>

<style lang="scss" scoped></style>
