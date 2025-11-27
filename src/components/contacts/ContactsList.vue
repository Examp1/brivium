<script lang="ts" setup>
import BaseInput from "../base/BaseInput.vue";

const contactsStore = useContactsStore();
const { getGroupedContacts } = storeToRefs(contactsStore);

contactsStore.fetchContactsList();
</script>

<template>
    <div>
        <div class="grid gap-5 h-fit">
            <template
                v-for="contactGroup in getGroupedContacts"
                :key="contactGroup.id"
            >
                <div
                    v-for="contact in contactGroup"
                    :key="contact.id"
                    class="grid grid-cols-[0.5fr_1fr] items-center"
                >
                    <span class="text-sm text-[#364A63]">{{
                        contact.type_text
                    }}</span>
                    <BaseInput v-model="contact.value" />
                </div>
            </template>
        </div>
    </div>
</template>

<style lang="scss" scoped></style>
