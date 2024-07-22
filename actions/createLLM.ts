"use server"

import { LLMSchema } from "@/schemas";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import { z } from "zod";
import { Session } from "./getSession";

export const CreateLLM = async (values: z.infer<typeof LLMSchema>) => {
    const validateFields = LLMSchema.safeParse(values);
    console.log(validateFields.error);

    if (!validateFields.success) return { error: "Invalid fields!" };

    const session = await Session();

    if (!session) {
        return { error: "Invalid session!" };
    }

    const existingUser = await getUserByEmail(session?.user.email!);

    if (!existingUser) {
        return { error: "User not found!" };
    }

    try {
        const { id, model } = await db.lLM.create({
            data: {
                userId: existingUser.id,
                ...values,
            }
        });
        return { success: "Confirmation email sent", data: { id, model }, };

    } catch (error) {
        return { error: "Internal server Error!" };
    }

}