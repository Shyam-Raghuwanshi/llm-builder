import { GPTModelNamesEnum, MAX_TOKENS } from "@/types";
import { z } from "zod";


export const LLMSchema = z.object({
    name: z.string().min(3, {
        message: "Name must be at least 3 characters long"
    }).max(50, {
        message: "Name must be at most 50 characters long"
    }),
    apiKey: z.string().length(56, {
        message: "API Key must be 36 characters long"
    }),
    description: z.string().min(5, {
        message: "Description must be at least 5 characters long"
    }).optional(),
    model: GPTModelNamesEnum.optional(),
    temperature: z.number().min(0).max(1).optional(),
    maxLoops: z.number().min(1).optional(),
})

export const DeleteLLMSchema = z.object({
    id: z.string().uuid()
})