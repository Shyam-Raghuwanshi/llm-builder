"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Spinner } from "../spinner";
import { UploadFileByUrl, UploadFiles } from "@/actions/uploadDocs";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { useRouter } from "next/navigation";
const fileFormSchema = z.object({
  file: z
    .custom<FileList>((val) => val instanceof FileList, "Required")
    .refine((files) => files.length > 0, `Required`)
})

const urlFormSchema = z.object({
  url: z.string().url()
})


export function UploadButton({ llmId }: { llmId: string }) {
  const { toast } = useToast();
  const router = useRouter();
  const fileForm = useForm<z.infer<typeof fileFormSchema>>({
    resolver: zodResolver(fileFormSchema),
  });

  const urlForm = useForm<z.infer<typeof urlFormSchema>>({
    resolver: zodResolver(urlFormSchema),
    defaultValues: {
      url: ""
    }
  });


  const fileRef = fileForm.register("file");

  async function handleFileSubmit(values: z.infer<typeof fileFormSchema>) {
    const files = values.file
    const fromData = new FormData();
    for (let i = 0; i < files.length; i++) {
      fromData.append("file" + i, files[i]);
    }
    const response = await UploadFiles({ llmId, files: fromData })
    fileForm.reset();

    setIsFileDialogOpen(false);

    if (response.success) {
      router.refresh();
      return toast({
        variant: "success",
        title: response.message,
      });
    }
    return toast({
      variant: "destructive",
      title: response.error,
    });
  }

  async function handleUrlSubmit(values: z.infer<typeof urlFormSchema>) {
    const response = await UploadFileByUrl({ llmId, url: values.url });
    setIsFileDialogOpen(false);
    if (response.success) {
      router.refresh();
      return toast({
        variant: "success",
        title: response.message,
      });

    }
    return toast({
      variant: "destructive",
      title: response.error,
    });
  }

  const [isFileDialogOpen, setIsFileDialogOpen] = useState(false);


  return (
    <Dialog
      open={isFileDialogOpen}
      onOpenChange={(isOpen) => {
        setIsFileDialogOpen(isOpen);
        fileForm.reset();
        urlForm.reset();
      }}
    >
      <DialogTrigger asChild>
        <Button>Upload File</Button>
      </DialogTrigger>
      <DialogContent onInteractOutside={(e) => { e.preventDefault() }}>
        <DialogHeader>
          <DialogTitle>Upload your File Here</DialogTitle>
          <DialogDescription>
            Train your llm using text files
          </DialogDescription>
        </DialogHeader>
        <div>

          <Tabs defaultValue="grid">
            <TabsList className="mb-2">
              <TabsTrigger value="files" className="flex gap-2 items-center">
                {/* <GridIcon /> */}
                Files
              </TabsTrigger>
              <TabsTrigger value="urls" className="flex gap-2 items-center">
                {/* <RowsIcon />  */}
                URl
              </TabsTrigger>
            </TabsList>

            <TabsContent value="files">
              <Form {...fileForm}>
                <form onSubmit={fileForm.handleSubmit(handleFileSubmit)} className="space-y-8">
                  <FormField
                    control={fileForm.control}
                    name="file"
                    render={() => (
                      <FormItem>
                        <FormLabel>File</FormLabel>
                        <FormControl>
                          <Input multiple={true} type="file" accept=".csv, .pdf, .txt" {...fileRef} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    disabled={fileForm.formState.isSubmitting}
                    className="flex gap-1"
                  >
                    {fileForm.formState.isSubmitting && (
                      <Spinner />
                    )}
                    Upload
                  </Button>
                </form>
              </Form>
            </TabsContent>
            <TabsContent value="urls">
              <Form {...urlForm}>
                <form onSubmit={urlForm.handleSubmit(handleUrlSubmit)} className="space-y-8">
                  <FormField
                    control={urlForm.control}
                    name="url"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>URL</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="https://example.com/some" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    disabled={urlForm.formState.isSubmitting}
                    className="flex gap-1"
                  >
                    {urlForm.formState.isSubmitting && (
                      <Spinner />
                    )}
                    Upload
                  </Button>
                </form>
              </Form>
            </TabsContent>
          </Tabs>

        </div>
      </DialogContent>
    </Dialog>
  );
}
