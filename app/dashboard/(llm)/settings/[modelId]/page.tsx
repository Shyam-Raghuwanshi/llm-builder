"use client";

import { useEffect, useState } from "react";
import { Session } from "@/actions/getSession";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import LLMForm from "@/components/llm-form";
import { Button } from "@/components/ui/button";

type paramsType = {
    params: { modelId: string };
};

export default function Settings({ params }: paramsType) {

    const [email, setEmail] = useState<any>("");
    const [name, setName] = useState<any>("");
    useEffect(() => {
        (async () => {
            const session = await Session();
            setEmail(session?.user.email);
            setName(session?.user.name);
        })();
    }, []);


    return (
        <main className="p-20">
            {params.modelId !== "user" && (
                <LLMForm buttonText="Update"/>
            )}
        </main>
    );
}
