import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FileTextIcon, GanttChartIcon, ImageIcon } from "lucide-react";
import { useEffect, useState } from "react"
import { GetLLMFiles } from "@/actions/LLM";
import { docsType } from "@/types";
import { FilesSkeletonCard } from "./file-skeleton";
import { FaFilePdf } from "react-icons/fa6";
import { BiSolidFileTxt } from "react-icons/bi"

export function FileCard({ isFilesLoading, llmDocs }: { isFilesLoading: boolean, llmDocs: string[] }) {
  const typeIcons = {
    image: <ImageIcon />,
    pdf: <FileTextIcon />,
    csv: <GanttChartIcon />,
  }


  return (
    <>
      {isFilesLoading && Array.from({ length: 12 }).map((_, i) => <FilesSkeletonCard key={i} />)}
      {llmDocs?.map((d) => {
        const doc: docsType = JSON.parse(d)
        return (
          <Card key={doc.url} >
            <CardHeader className="relative">
              <CardTitle className="flex gap-2 text-base font-normal">
                {doc?.name}
              </CardTitle>
              {/* <div className="absolute top-2 right-2">
                <FileCardActions isFavorited={file.isFavorited} file={file} />
              </div> */}
            </CardHeader>
            <CardContent className="h-[200px] flex justify-center items-center">
              {doc?.type === ".pdf" && <FaFilePdf className="w-20 h-20" />}
              {doc?.type === ".txt" && <BiSolidFileTxt className="w-20 h-20" />}
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="flex gap-2 text-xs text-gray-700 w-40 items-center">
                <Avatar className="w-6 h-6">
                  <AvatarImage />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                {"shyam"}
              </div>
              <div className="text-xs text-gray-700">
                Uploaded on 44/33/2323
              </div>
            </CardFooter>
          </Card >
        )
      })}
    </>
  );
}
