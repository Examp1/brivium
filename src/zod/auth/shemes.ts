import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";

export const companyValidateSheme = toTypedSchema(
    z.object({
        email: z.string().email("Некоректний формат email"),
        name: z.string().min(1, "Ім'я є обов'язковим для заповнення"),
        phone: z.string().min(1, "Телефон є обов'язковим для заповнення"),
        password: z.string().min(6, "Пароль має містити щонайменше 6 символів"),
        city_id: z.number().int().positive("ID міста має бути додатним числом"),
        type: z
            .number()
            .int()
            .min(1, "Тип компанії є обов'язковим для заповнення"),
    }),
);

export const clientValidateSheme = toTypedSchema(
    z.object({
        email: z.string().email("Некоректний формат email"),
        name: z.string().min(1, "Ім'я є обов'язковим для заповнення"),
        lastname: z.string().min(1, "Прізвище є обов'язковим для заповнення"),
        surname: z.string().min(1, "По батькові є обов'язковим для заповнення"),
        phone: z.string().min(1, "Телефон є обов'язковим для заповнення"),
        password: z.string().min(6, "Пароль має містити щонайменше 6 символів"),
        position: z.string().min(6, "Посада має містити щонайменше 6 символів"),
        city_id: z.number().int().positive("ID міста має бути додатним числом"),
    }),
);
