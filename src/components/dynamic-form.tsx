"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {useForm, SubmitHandler, ControllerRenderProps, Path, DefaultValues} from "react-hook-form";
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

type SchemaName = keyof typeof schemas;
type SchemaType<T extends SchemaName> = z.infer<(typeof schemas)[T]>;

interface Props<T extends SchemaName> {
    config: {
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
                                                              config,
                                                              defaultValues,
                                                              schema,
                                                              fields,
                                                              action,
                                                          }: Props<T>) {
    const form = useForm<SchemaType<T>>({
        resolver: zodResolver(schemas[schema]),
        defaultValues
    });

    const handleSubmit: SubmitHandler<SchemaType<T>> = async (data) => {
        try {
            await action(data);
            toast.success("Success");
        } catch (error: any) {
            toast.error(error.message);
        }
    };

    const renderField = (
        field: Field,
        formField: ControllerRenderProps<SchemaType<T>>
    ) => {
        switch (field.type) {
            case "select":
                return (
                    <Select
                        onValueChange={formField.onChange}
                        defaultValue={formField.value as string}
                    >
                        <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder={field.placeholder} />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            {field.options!.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                );

            case "checkbox":
                return (
                    <FormControl>
                        <div className="space-y-2">
                            {field.options!.map((item) => (
                                <FormItem
                                    key={item.value}
                                    className="flex flex-row items-start space-x-3 space-y-0"
                                >
                                    <FormControl>
                                        <Checkbox
                                            checked={(formField.value as string[])?.includes(item.value)}
                                            onCheckedChange={(checked) => {
                                                const currentValues = (formField.value as string[]) || [];
                                                formField.onChange(
                                                    checked
                                                        ? [...currentValues, item.value]
                                                        : currentValues.filter((v) => v !== item.value)
                                                );
                                            }}
                                        />
                                    </FormControl>
                                    <FormLabel className="text-sm font-normal">
                                        {item.label}
                                    </FormLabel>
                                </FormItem>
                            ))}
                        </div>
                    </FormControl>
                );

            case "radio":
                return (
                    <FormControl>
                        <RadioGroup
                            onValueChange={formField.onChange}
                            defaultValue={formField.value as string}
                            className="flex flex-col space-y-1"
                        >
                            {field.options!.map((item) => (
                                <FormItem
                                    key={item.value}
                                    className="flex items-center space-x-3 space-y-0"
                                >
                                    <FormControl>
                                        <RadioGroupItem value={item.value} />
                                    </FormControl>
                                    <FormLabel className="font-normal">{item.label}</FormLabel>
                                </FormItem>
                            ))}
                        </RadioGroup>
                    </FormControl>
                );

            default:
                return (
                    <FormControl>
                        <Input
                            id={field.name}
                            type={field.type}
                            placeholder={field.placeholder}
                            {...formField}
                            value={formField.value ?? ""}
                        />
                    </FormControl>
                );
        }
    };

    return (
        <div>
            <div className="space-y-1">
                <h1 className="text-2xl">{config.title}</h1>
                <p>{config.description}</p>
            </div>
            <div className="grid gap-4">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className="w-full space-y-6">
                        {fields.map((field) => (
                            <FormField
                                key={field.name}
                                control={form.control}
                                name={field.name as Path<SchemaType<T>>}
                                render={({ field: formField }) => (
                                    <FormItem>
                                        <FormLabel htmlFor={field.name}>{field.label}</FormLabel>
                                        {renderField(field, formField)}
                                        {field.description && (
                                            <FormDescription>{field.description}</FormDescription>
                                        )}
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        ))}
                        <Button type="submit" className="w-full">
                            {config.submitText}
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    );
}