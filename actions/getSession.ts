"use server"
import { auth } from "@/auth";

export async function Session() {
    return await auth();
}