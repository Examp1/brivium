<script lang="ts" setup>
import { z } from "zod";
// (опционально) тип события сабмита, если хочется типизацию
import type { FormSubmitEvent } from "@nuxt/ui";

const contactsStore = useContactsStore();

const contactType = [
    { value: 1, label: "Телефон" },
    { value: 2, label: "Email" },
    { value: 3, label: "Адресса" },
    { value: 4, label: "Сайт" },
    { value: 5, label: "Телеграм" },
    { value: 6, label: "Вайбер" },
    { value: 7, label: "Iнстаграм" },
    { value: 8, label: "Фейсбук" },
    { value: 9, label: "Ютуб" },
    { value: 10, label: "Тiкток" },
];

const permisionType = [
    { value: 1, label: "Видно всім" },
    { value: 2, label: "Видно лише зареєстрованим користувачам" },
    { value: 3, label: "Видно тільки мені" },
];

// Zod: все обязательно
const schema = z.object({
    value: z.string().trim().min(1, "Заповніть контакт"),
    type: z.coerce.number().int().min(1, "Оберіть тип контакту"),
    permission_id: z.coerce.number().int().min(1, "Оберіть тип відображення"),
    label: z.string().trim().min(1, "Заповніть опис"),
});

type Schema = z.infer<typeof schema>;

const state = reactive<Schema>({
    value: "",
    type: 1,
    permission_id: 1,
    label: "",
});

async function onSubmit(event: FormSubmitEvent<Schema>) {
    // event.data уже провалидирован по schema
    await contactsStore.addContact({ status: 1, ...event.data });

    // reset
    state.value = "";
    state.label = "";
    state.type = 1;
    state.permission_id = 1;
}
</script>

<template>
    <UCard>
        <template #header>
            <div class="flex items-center justify-between">
                <h2 class="text-lg font-semibold">Додати контакт</h2>
            </div>
        </template>

        <UForm
            :schema="schema"
            :state="state"
            class="space-y-6"
            @submit="onSubmit"
        >
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <UFormField label="Ваш контакт" name="value">
                    <UInput
                        class="w-full"
                        v-model="state.value"
                        placeholder="Напр. +380..."
                    />
                </UFormField>

                <UFormField label="Тип контакту" name="type">
                    <USelect
                        class="w-full"
                        v-model="state.type"
                        :items="contactType"
                        value-key="value"
                        label-key="label"
                    />
                </UFormField>

                <UFormField label="Тип відображення" name="permission_id">
                    <USelect
                        class="w-full"
                        v-model="state.permission_id"
                        :items="permisionType"
                        value-key="value"
                        label-key="label"
                    />
                </UFormField>

                <UFormField label="Опис" name="label">
                    <UInput
                        class="w-full"
                        v-model="state.label"
                        placeholder="Напр. робочий номер"
                    />
                </UFormField>
            </div>

            <div class="flex justify-end">
                <UButton type="submit" size="lg" label="Зберегти контакт" />
            </div>
        </UForm>
    </UCard>
</template>
