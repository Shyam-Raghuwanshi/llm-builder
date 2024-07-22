"use client";

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { InputWithEye } from "@/components/ui/input-with-eye";
import { FaRegCheckCircle } from "react-icons/fa";
import { BsExclamationCircle } from "react-icons/bs";
import { Spinner } from "@/components/spinner";
import { CreateLLM } from "@/actions/LLM";
import { Input } from "./ui/input";
import { useRouter } from "next/navigation";
import { GrStar } from "react-icons/gr";
import { LLMSchema as FormSchema } from "@/schemas";
import { models } from "@/types";

import axios from 'axios';
import clsx from "clsx";


export default function LLMForm({ buttonText, buttonStyle, setOpen }: { buttonText: string, buttonStyle?: string, setOpen?: Dispatch<SetStateAction<boolean>> }) {
    const [isApiKeyValid, setIsApiKeyValid] = useState<boolean | undefined>(undefined);
    const [openAIApiKey, setopenAIApiKey] = useState<string | undefined>("")
    const [isAPIValidating, setIsAPIValidating] = useState(false)
    const [isMounted, setIsMounted] = useState(false);
    const { toast } = useToast()
    const router = useRouter()

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: undefined,
            temperature: 0.7,
            apiKey: undefined,
            model: "gpt-3.5-turbo",
            description: undefined,
            maxLoops: 1,
        },
    });

    const isSubmitting = form.formState.isSubmitting;
    async function onSubmit(data: z.infer<typeof FormSchema>) {
        const response = await CreateLLM(data);

        if (response.success) {
            form.reset();
            setOpen && setOpen(false);
            router.push(`/dashboard/manage-llm/${response.data.id}`);
            toast({
                className: "bg-green-500",
                title: "LLM Created Successfully",
            });
            window.location.reload()
        }

        if (response.error) {
            toast({
                className: "bg-red-500",
                title: response.error as string || "Error Creating LLM, Please try again!",
            });
        }

    }

    const validateApiKey = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        try {
            setIsAPIValidating(true)
            await axios.get("https://api.openai.com/v1/engines", {
                headers: {
                    Authorization: `Bearer ${openAIApiKey}`,
                },
            });
            setIsAPIValidating(false)
            setIsApiKeyValid(true);
        } catch (error) {
            setIsAPIValidating(false)
            setIsApiKeyValid(false);
        }
    };

    if (!isMounted) {
        return null;
    }

    return (
        <main>
            <Form {...form} >
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel><div className="flex">Name <GrStar className="h-2 w-2 ml-1 text-red-700" /></div></FormLabel>
                                <Input {...field} type="text" placeholder="Name" />
                                <FormDescription>
                                    Give a name to your model
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <Input {...field} type="text" placeholder="Description" />
                                <FormDescription>
                                    Give a description to your model
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="model"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Model</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a model" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {models.map((model) => (
                                            <SelectItem key={model} value={model}>
                                                {model}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormDescription>
                                    You can select which model you want to use for generating responses
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="temperature"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Temperature ({field.value})</FormLabel>
                                <Slider
                                    value={[field.value || 0]}
                                    onValueChange={(value) => field.onChange(value[0])}
                                    max={1}
                                    step={0.01}
                                />
                                <FormDescription>
                                    The higher the temperature, the more creative the model will be, but it may also make more mistakes. The lower the temperature, the more predictable the model will be, but it may also be more boring.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="apiKey"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel><div className="flex">OpenAI APIKey <GrStar className="h-2 w-2 ml-1 text-red-700" /></div></FormLabel>
                                <div className="flex flex-row">
                                    <InputWithEye
                                        className="current-password"
                                        onChange={(e) => {
                                            field.onChange(e);
                                            setopenAIApiKey(e.target.value);
                                        }}
                                        value={field.value}
                                        placeholder="Enter api key" />
                                    {isAPIValidating ? <Button className="bg-gray-500 text-gray-200">
                                        <Spinner size={"lg"} />
                                    </Button> : (
                                        <Button
                                            type="button"
                                            disabled={field.value === undefined}
                                            onClick={(e) => { validateApiKey(e) }}
                                            className={clsx(
                                                "transition-400 duration-200 text-gray-200",
                                                isApiKeyValid === undefined && "bg-gray-500 hover:bg-gray-700",
                                                isApiKeyValid === true && "bg-green-500 hover:bg-green-700",
                                                isApiKeyValid === false && "bg-red-500 hover:bg-red-700"
                                            )}
                                        >
                                            {isApiKeyValid === undefined && "Test API key"}
                                            {isApiKeyValid === true && <FaRegCheckCircle className="h-6 w-6" />}
                                            {isApiKeyValid === false && <BsExclamationCircle className="h-6 w-6" />}
                                        </Button>
                                    )}
                                </div>

                                <FormDescription>
                                    Your OpenAI API key here
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="maxLoops"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Max Loops</FormLabel>
                                <Input onChange={(e) => field.onChange(Number(e.target.value))} value={field.value} type="number" placeholder="Max Loops" />
                                <FormDescription>
                                    Enter max Loops for the model
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button disabled={isSubmitting} className={buttonStyle} type="submit">{buttonText}</Button>
                </form>
            </Form>
        </main >
    );
}
