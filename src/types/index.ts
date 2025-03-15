//
export type Field = {
    id : number
    name: string;
    type: "text" | "email" | "password" | "select" | "checkbox" | "radio" ;
    label: string;
    placeholder: string;
    required: boolean;
    description?: string;
    options?: {
        value: string;
        label: string;
    }[];
};

