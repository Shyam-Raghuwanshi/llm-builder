"use client";
import Image from "next/image";
import { useState } from "react";
import { UploadButton } from "@/components/dialog/upload-file";
import { usePathname } from "next/navigation";
import { SideNav } from "@/components/side-nav";
import LLMForm from "@/components/llm-form";

function Placeholder({ llmId }: { llmId: string }) {
    return (
        <div className="flex flex-col gap-8 w-full items-center mt-24">
            <Image
                alt="an image of a picture and directory icon"
                width="300"
                height="300"
                src="/empty.svg"
            />
            <div className="text-2xl">You have no files, upload one now</div>
            <UploadButton llmId={llmId} />
        </div>
    );
}

export default function Settings({ params }: { params: { modelId: string } }) {
    const pathname = usePathname();
    const [query, setQuery] = useState("");
    return (
        <div>
            <div className="flex px-11 pt-20">
                <SideNav modelId={params?.modelId} />
                <div className="pl-10">

                    <LLMForm buttonText="Update" />
                </div>
            </div>
        </div>
    );
}
