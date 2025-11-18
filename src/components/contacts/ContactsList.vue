<script lang="ts" setup>
import FormInput from "../form/inputs/FormInput.vue";
import FormSelect from "../form/inputs/FormSelect.vue";

const contactsStore = useContactsStore();
const { contacts } = storeToRefs(contactsStore);

contactsStore.fetchContactsList("company");

const contactData = ref({
    value: "000000000",
    label: "dfgdfsdf",
    status: 1,
    type: 1,
    order: 1,
    is_primary: 1,
    permission_id: 1,
});

const addNewContact = async () => {
    await contactsStore.addContact(contactData, "company");

    // {
    // "value": "000000000",
    // "label": "dfgdfsdf",
    // "status": 1,
    // "type": 1,
    // "order": 1,
    // "is_primary": 1,
    // "permission_id":1
    // }
};

const contactType = ref([
    { value: 1, title: "Phone" },
    { value: 2, title: "Email" },
    { value: 3, title: "Address" },
    { value: 4, title: "Site" },
    { value: 5, title: "Telegram" },
    { value: 6, title: "Viber" },
    { value: 7, title: "Instagram" },
    { value: 8, title: "Facebook" },
    { value: 9, title: "Youtube" },
    { value: 10, title: "Tiktok" },
]);
</script>

<template>
    <div>
        {{ contacts }}
        123
        <FormInput
            label="Бюджет"
            placeholder="Введіть бюджет на етап"
            name="budget"
            type="number"
        />

        <FormSelect
            label="Тип контакту"
            name="contactType"
            :list="contactType"
            :default-value="1"
        />
    </div>
</template>

<style lang="scss" scoped></style>
