"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { DefaultValues, SubmitHandler, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { z } from "zod";
import { Field } from "@/types";
import { schemas } from "@/lib/zod/schemas";

type SchemaName = keyof typeof schemas;
type SchemaType<T extends SchemaName> = z.infer<typeof schemas[T]>;

interface Props<T extends SchemaName> {
    authConfig: {
        title: string;
        description: string;
        submitText: string;
    };
    defaultValues: DefaultValues<SchemaType<T>>;
    schema: T;
    fields: Field[];
    action: (data: SchemaType<T>) => Promise<void>;
}

export default function DynamicForm<T extends SchemaName>({
                                                           authConfig,
                                                           defaultValues,
                                                           schema,
                                                           fields,
                                                           action,
                                                       }: Props<T>) {
    const form = useForm<SchemaType<T>>({
        resolver: zodResolver(schemas[schema]),
        defaultValues,
    });

    const handleSubmit: SubmitHandler<SchemaType<T>> = async (data) => {
        try {
            await action(data);
            toast.success("Success");
        } catch (error: any) {
            toast.error(error.message);
        }
    };

    return (
        <div>
            <div className="space-y-1">
                <h1 className="text-2xl">{authConfig.title}</h1>
                <p>{authConfig.description}</p>
            </div>
            <div className="grid gap-4">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className="w-full space-y-6">
                        {fields.map((field) => (
                            <FormField
                                key={field.name}
                                name={field.name}
                                render={({ field: formField }) => (
                                    <FormItem>
                                        <FormLabel htmlFor={field.name}>{field.label}</FormLabel>
                                        <FormControl>
                                            <Input
                                                id={field.name}
                                                type={field.type}
                                                placeholder={field.placeholder}
                                                {...formField}
                                                value={formField.value ?? ""}
                                            />
                                        </FormControl>
                                        {field.description && (
                                            <FormDescription>{field.description}</FormDescription>
                                        )}
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        ))}
                        <Button type="submit" className="w-full">
                            {authConfig.submitText}
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    );
}