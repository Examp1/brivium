import { z } from "zod";

export const projectFormSchema = z
    .object({
        name: z
            .string()
            .min(1, "Name is required")
            .max(100, "Name must be less than 100 characters"),

        description: z
            .string()
            .min(1, "Description is required")
            .max(1000, "Description must be less than 1000 characters"),

        city_id: z
            .number({
                required_error: "City ID is required",
                invalid_type_error: "City ID must be a number",
            })
            .positive("City ID must be positive"),

        start_at: z
            .string()
            .min(1, "Start date is required")
            .refine((val) => !isNaN(Date.parse(val)), {
                message: "Start date must be valid",
            }),

        finish_at: z
            .string()
            .min(1, "Finish date is required")
            .refine((val) => !isNaN(Date.parse(val)), {
                message: "Finish date must be valid",
            }),

        expired_at: z
            .string()
            .min(1, "Expiration date is required")
            .refine((val) => !isNaN(Date.parse(val)), {
                message: "Expiration date must be valid",
            }),

        budget: z
            .number({
                required_error: "Budget is required",
                invalid_type_error: "Budget must be a number",
            })
            .nonnegative("Budget cannot be negative"),

        customer: z
            .number()
            .min(1, "Customer role is required")
            .max(50, "Customer role must be less than 50 characters"),

        status: z
            .number()
            .min(1, "Status is required")
            .max(50, "Status must be less than 50 characters"),
    })
    // Кросс-валидация дат
    .refine((data) => new Date(data.finish_at) >= new Date(data.start_at), {
        message: "Finish date must be after start date",
        path: ["finish_at"],
    })
    .refine((data) => new Date(data.expired_at) >= new Date(data.finish_at), {
        message: "Expiration date must be after finish date",
        path: ["expired_at"],
    });

export type ProjectForm = z.infer<typeof projectFormSchema>;
