import { z } from "zod";

export const productSchema = z.object({
    id: z.string().optional(),
    name: z.string().min(4, "Name must be at least 4 chars").trim(),
    description: z.string().optional().transform(val => val?.trim()),
    price: z.number().positive("Price must be greater then 0"),
    units: z.number().min(0).int(),
    featured: z.boolean().optional().default(false),
    rating: z.number().min(0).max(5).default(4.4),
    images: z.array(z.string().url("Invalid image Url")).default([]),
}).strict()