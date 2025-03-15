import DynamicForm from "@/components/dynamic-form";
import {signInFields} from "@/constants";
import {signIn} from "@/services/authService";

export default function Home() {
    return (
        <DynamicForm config={
            {
                title: "Sign In",
                description: "Sign in to your account",
                submitText: "Sign In",

            }
        } defaultValues={
            {
                email: "",
                password: "",
            }
        }
                     schema="signIn"
                     fields={signInFields}
                     action={signIn}/>
    );
}
