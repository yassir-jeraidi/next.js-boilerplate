import {z} from "zod";

const signInSchema = z.object({
    email: z
        .string({required_error: "Please enter your email address",})
        .email({message: "Please enter a valid email address",}),
    password: z
        .string({required_error: "Please enter your password",})
        .min(8, {message: "Password must be at least 8 characters",}),
});

const signUpSchema = signInSchema.extend({
    name: z.string({
        required_error: "Please enter your full name",
    }).min(3, {
        message: "Full name must be at least 3 characters",
    }),
});

export const schemas  = {
    signIn: signInSchema,
    signUp: signUpSchema,
} as const;