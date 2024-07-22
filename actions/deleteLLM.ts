"use server"

import { DeleteLLMSchema } from "@/schemas";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import { z } from "zod";
import { Session } from "./getSession";

export const CreateLLM = async (values: z.infer<typeof DeleteLLMSchema>) => {
    const validateFields = DeleteLLMSchema.safeParse(values);
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