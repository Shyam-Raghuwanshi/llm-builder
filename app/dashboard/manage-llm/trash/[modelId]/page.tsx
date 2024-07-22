"use client";

import Image from "next/image";
import { GridIcon, Loader2, RowsIcon } from "lucide-react";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { UploadButton } from "@/components/dialog/upload-file";
import { SearchBar } from "@/components/search-bar";
import { SideNav } from "@/components/side-nav";

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

export default function Trash({ params }: { params: { modelId: string } }) {
    const [query, setQuery] = useState("");
    return (
        <div>
            <div className="flex px-11 pt-20">
                <SideNav modelId={params?.modelId} />
                <div className="pl-10">
                    <div className="flex justify-between items-center mb-8">
                        <h1 className="text-4xl font-bold">{"title"}</h1>

                        <SearchBar query={query} setQuery={setQuery} />

                        <UploadButton llmId={params?.modelId} />
                    </div>

                    <Tabs defaultValue="grid">
                        <div className="flex justify-between items-center">
                            <TabsList className="mb-2">
                                <TabsTrigger value="grid" className="flex gap-2 items-center">
                                    <GridIcon />
                                    Grid
                                </TabsTrigger>
                                <TabsTrigger value="table" className="flex gap-2 items-center">
                                    <RowsIcon /> Table
                                </TabsTrigger>
                            </TabsList>

                            <div className="flex gap-2 items-center">
                                <Label htmlFor="type-select">Type Filter</Label>
                                <Select

                                >
                                    <SelectTrigger id="type-select" className="w-[180px]">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All</SelectItem>
                                        <SelectItem value="image">Image</SelectItem>
                                        <SelectItem value="csv">CSV</SelectItem>
                                        <SelectItem value="pdf">PDF</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        {false && (
                            <div className="flex flex-col gap-8 w-full items-center mt-24">
                                <Loader2 className="h-32 w-32 animate-spin text-gray-500" />
                                <div className="text-2xl">Loading your files...</div>
                            </div>
                        )}

                        <TabsContent value="grid">
                            <div className="grid grid-cols-3 gap-4">
                                {/* <FileCard /> */}
                            </div>
                        </TabsContent>
                        <TabsContent value="table">
                        </TabsContent>
                    </Tabs>

                    <Placeholder llmId={params?.modelId} />
                </div>
            </div>
        </div>
    );
}
