import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";

export const companyValidateScheme = toTypedSchema(
    z.object({
        value: z.string().email("Некоректний формат email"),
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
