"use client";
import { Loader2, } from "lucide-react";
import { useState, useEffect } from "react";
import { Tabs, TabsContent } from "@/components/ui/tabs";
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
import { FileCard } from "@/components/file-card";
import { SideNav } from "@/components/side-nav";
import { GetLLMFiles } from "@/actions/LLM";

export default function Trash({ params }: { params: { modelId: string } }) {
    const [query, setQuery] = useState("");
    const [llmDocs, setLlmDocs] = useState<string[]>()
    const [isFilesLoading, setIsFilesLoading] = useState<boolean>(true);
  
    useEffect(() => {
      (async () => {
        const llm = await GetLLMFiles(params?.modelId);
        if (llm.success) {
          setLlmDocs(llm.data?.docs)
          setIsFilesLoading(false)
        }
      })();
    }, [])

    return (
        <>
            <div className="flex px-11 pt-20">
                <SideNav modelId={params?.modelId} />
                <div className="pl-10">
                    <div className="flex justify-between items-center mb-8">
                        <h1 className="text-4xl font-bold">Files</h1>

                        <SearchBar query={query} setQuery={setQuery} />

                        <UploadButton llmId={params?.modelId} />
                    </div>

                    <Tabs defaultValue="grid">
                        <div className="flex justify-between items-center">
                            <div className="flex gap-2 items-center">
                                <Label htmlFor="type-select">Type Filter</Label>
                                <Select>
                                    <SelectTrigger id="type-select" className="w-[180px]">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All</SelectItem>
                                        <SelectItem value="url">Url</SelectItem>
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
                                <FileCard isFilesLoading={isFilesLoading} llmDocs={llmDocs!} />
                            </div>
                        </TabsContent>
                    </Tabs>

                </div>
            </div>
        </>
    );
}
