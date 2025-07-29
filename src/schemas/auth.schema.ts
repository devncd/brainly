import { z } from "zod";

// input validation schema for login and sign up forms

export const LoginSchema = z.object({
    username: z.string()
                .trim()
                .min(4, { message: "Username must be at least 4 characters long." })
                .max(20, { message: "Username must not exceed 20 characters"} ),
    password: z.string()
                .min(8, { message: "Password must be atleast 8 characters long" })
                .max(50, { message: "Password must not exceed 50 characters" })
                .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
                .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
                .regex(/[0-9]/, { message: "Password must contain at least one numnber" })
                .regex(/[^a-zA-Z0-9]/, { message: "Password must contain at least one special character" })
});

export const SignupSchema = z.object({
    username: z.string()
                .trim()
                .min(4, { message: "Username must be at least 4 characters long." })
                .max(20, { message: "Username must not exceed 20 characters"} ),
    password: z.string()
                .min(8, { message: "Password must be atleast 8 characters long" })
                .max(50, { message: "Password must not exceed 50 characters" })
                .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
                .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
                .regex(/[0-9]/, { message: "Password must contain at least one numnber" })
                .regex(/[^a-zA-Z0-9]/, { message: "Password must contain at least one special character" })
});

export type LoginInput = z.infer<typeof LoginSchema>;
export type SignupInput = z.infer<typeof SignupSchema>;
