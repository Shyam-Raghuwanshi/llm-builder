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
            <>
                <div className="grid w-full items-center gap-1.5 mb-6">
                    <Label htmlFor="email">Email</Label>
                    <Input disabled type="email" id="email" value={email || "user Email"} />
                    <span className="text-[0.8rem] text-muted-foreground">You can't change your Email because it's linked with Google Account</span>
                </div>

                <div className="grid w-full items-center gap-1.5 mb-6">
                    <Label htmlFor="name">Name</Label>
                    <Input disabled type="name" id="name" value={name || "user Name"} />
                    <span className="text-[0.8rem] text-muted-foreground">You can't change your Name because it's linked with Google Account</span>
                </div>

                <Button >
                    Logout
                </Button>
            </>
        </main>
    );
}
