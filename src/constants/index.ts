import {Field} from "@/types"

export const signInFields: Field[] = [
    {
        id : 1,
        name: "email",
        type: "email",
        label: "Email",
        placeholder: "Email",
        required: true,
        description: "We'll never share your email with anyone else."
    },
    {
        id : 2,
        name: "password",
        type: "password",
        label: "Password",
        placeholder: "Password",
        required: true,
        description: "Password must be at least 8 characters long."
    },
    {
        id : 3,
        name: "region",
        type: "select",
        label: "Region",
        placeholder: "Your region",
        required: false,
        description: "Your region",
        options: [
            {
                value: "us",
                label: "United States"
            },
            {
                value: "ca",
                label: "Canada"
            }
        ]
    },
    {
        id : 4,
        name : "interests",
        type: "checkbox",
        label: "Interests",
        placeholder: "Interests",
        required: false,
        description: "Select your interests",
        options: [
            {
                value: "sports",
                label: "Sports"
            },
            {
                value: "music",
                label: "Music"
            },
            {
                value: "movies",
                label: "Movies"
            }
        ]
    }
]

export const signUpFields: Field[] = [
    {
        id : 1,
        name: "name",
        type: "text",
        label: "Full Name",
        placeholder: "Full Name",
        required: true,
        description: "Enter your full name."
    },
    ...signInFields
]