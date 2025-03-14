import { Field } from "@/types"

export const signInFields: Field[] = [
    {
        name: "email",
        type: "email",
        label: "Email",
        placeholder: "Email",
        required: true,
        description: "We'll never share your email with anyone else."
    },
    {
        name: "password",
        type: "password",
        label: "Password",
        placeholder: "Password",
        required: true,
        description: "Password must be at least 8 characters long."
    }
]

export const signUpFields: Field[] = [
    {
        name: "name",
        type: "text",
        label: "Full Name",
        placeholder: "Full Name",
        required: true,
        description: "Enter your full name."
    },
    ...signInFields
]