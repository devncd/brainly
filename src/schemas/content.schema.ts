import { z } from "zod";

// zod input validation schema for 'content'

const contentTypes = ['image', 'video', 'article', 'audio'];

export const ContentSchema = z.object({
    link: z.string().url().optional(),
    type: z.enum(contentTypes),
    title: z.string().min(1),
    tags: z.array(z.string().optional()).optional(),
});

// userId: z.string() not defined >>> extract it from authorization header in your controller

export type ContentType = z.infer<typeof ContentSchema>;