<script lang="ts" setup>
import { storeToRefs } from "pinia";

const contactsStore = useContactsStore();
const { getGroupedContacts } = storeToRefs(contactsStore);

contactsStore.fetchContactsList();
</script>

<template>
    <div>
        <div class="grid gap-5 h-fit">
            <template
                v-for="(contactGroup, groupName) in getGroupedContacts"
                :key="groupName"
            >
                <div class="bg-gray-100 p-4 rounded">
                    <h3 class="text-lg font-bold mb-2">{{ groupName }}</h3>
                    <div class="grid grid-cols-3 gap-2">
                        <template
                            v-for="contact in contactGroup"
                            :key="contact.id"
                        >
                            <div class="flex items-center">
                                <span class="text-sm text-[#364A63] mr-2">{{
                                    contact.label
                                }}</span>
                                <UInput
                                    v-model="contact.value"
                                    class="flex-1"
                                />
                            </div>
                        </template>
                    </div>
                </div>
            </template>
        </div>
    </div>
</template>
