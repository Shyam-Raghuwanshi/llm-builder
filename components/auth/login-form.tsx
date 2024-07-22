"use client"
import {
    Card,
    CardFooter,
    CardTitle,
    CardHeader,
    CardDescription
} from "@/components/ui/card";
import { Social } from "./social";
import { BackButton } from "./back-button";
import React from 'react'

export const LoginForm = () => {

    return (
        <Card className="w-[400px] shadow-md bg-black text-neutral-200 border-zinc-700">
            <CardHeader className="space-y-1">
                <CardTitle className="text-2xl text-center">
                    Sign in
                </CardTitle>
                <CardDescription className="text-center">
                    Choose a provider to continue with <span className="font-bold">LLM-BUILDER</span>
                </CardDescription>
            </CardHeader>
            <CardFooter>
                <Social />
            </CardFooter>
            <CardFooter>
                <BackButton
                    label={"Back to home"}
                    href={"/"}
                />
            </CardFooter>
        </Card >
    )
}
