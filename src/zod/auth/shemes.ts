import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";

export const companyValidateSheme = toTypedSchema(
    z.object({
        email: z.string().email("Некорректный формат email"),
        name: z.string().min(1, "Имя обязательно для заполнения"),
        phone: z.string().min(1, "Телефон обязателен для заполнения"),
        password: z
            .string()
            .min(6, "Пароль должен содержать минимум 6 символов"),
        city_id: z
            .number()
            .int()
            .positive("ID города должен быть положительным числом"),
        type: z.number().int().min(1, "Тип компании обязателен для заполнения"),
    }),
);

// email: "",
//     name: "",
//     phone: "",
//     password: "",
//     country_id: "1",
//     city_id: 24702,
//     type: 1,
//     _subscription_id: "4",
