"use client";

import { useEffect, useState } from "react";
import { Session } from "@/actions/getSession";
import { Input } from "@/components/ui/input";
import { Button } from "@headlessui/react";

type paramsType = {
    params: { modelId: string };
};

export default function Chat({ params }: paramsType) {

    useEffect(() => {
        (async () => {
            const session = await Session();
        })();
    }, []);


    return (
        <main className="p-20">
            {params.modelId === "user" && (
                <>
                    <Input type="text" placeholder="Ask Question beased on you docs"></Input>
                    <Button>Ask</Button>
                </>
            )}
        </main>
    );
}
