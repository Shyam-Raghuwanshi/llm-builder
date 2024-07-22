"use server"

import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import { Session } from "./getSession";
import { DeleteLLMSchema, LLMSchema } from "@/schemas";
import { z } from "zod";


export const Validate = async () => {

    const session = await Session();

    if (!session) {
        return { error: "Invalid session!" };
    }

    const existingUser = await getUserByEmail(session?.user.email!);

    if (!existingUser) {
        return { error: "User not found!" };
    }

    return existingUser;
}

export const GetLLM = async (llmID: string) => {

    const validateResponse = await Validate();

    if (!validateResponse) return validateResponse;

    try {
        const llmInfo = await db.lLM.findUnique({
            where: {
                id: llmID
            }
        })
        return { success: true, data: llmInfo };

    } catch (error) {
        return { error: "Internal server Error!" };
    }

}

export const GetAllLLMs = async (userId: string) => {

    const validateResponse = await Validate();

    if (!validateResponse) return validateResponse;

    try {
        const llms = await db.lLM.findMany({
            where: { userId }
        })
        return { success: true, data: llms };

    } catch (error) {
        return { error: "Internal server Error!" };
    }

}

export const DeleteLLM = async (values: z.infer<typeof DeleteLLMSchema>) => {
    const validateFields = DeleteLLMSchema.safeParse(values);

    if (!validateFields.success) return { error: "Invalid fields!" };

    const validateResponse = await Validate();

    if (!validateResponse) return validateResponse;

    try {
        await db.lLM.delete({
            where: {
                id: values.id
            }
        });
        return { success: "LLM was deleted successfully" };

    } catch (error) {
        return { error: "Internal server Error!" };
    }

}

export const CreateLLM = async (values: z.infer<typeof LLMSchema>) => {
    const validateFields = LLMSchema.safeParse(values);

    if (!validateFields.success) return { error: "Invalid fields!" };

    const session = await Session();

    if (!session) {
        return { error: "Invalid session!" };
    }

    const existingUser = await getUserByEmail(session?.user.email!);

    if (!existingUser) {
        return { error: "User not found!" };
    }

    const data = await db.lLM.findUnique({
        where: {
            name: values.name
        }
    });

    if (data?.id) {
        return { error: "LLM with this name already exists!" };
    }

    try {
        const { id, model } = await db.lLM.create({
            data: {
                userId: existingUser.id,
                ...values,
            }
        });
        return { success: "LLM created successfully", data: { id, model }, };

    } catch (error) {
        return { error };
    }

}


export const GetLLMFiles = async (llmID: string) => {

    const validateResponse = await Validate();

    if (!validateResponse) return validateResponse;

    try {
        const docs = await db.lLM.findUnique({
            where: {
                id: llmID
            },
            select: {
                docs: true
            }
        })
        return { success: true, data: docs };

    } catch (error) {
        return { error: "Internal server Error!" };
    }

}
