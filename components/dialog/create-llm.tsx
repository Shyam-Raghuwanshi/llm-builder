import { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { IoMdAdd } from "react-icons/io";
import { ScrollArea } from "@/components/ui/scroll-area"
import LLMForm from "../llm-form";

export function CreateLLM() {
  const [open, setOpen] = useState(false);


  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="w-full bg-black text-slate-200 border mt-2 hover:bg-zinc-900 hover:transition-all hover:duration-300"
          size={"lg"}
        >
          <IoMdAdd className="h-6 w-6 mr-1" />
          New LLM
        </Button>
      </DialogTrigger>
      <DialogContent className='p-4' onInteractOutside={(event) => event.preventDefault()}>
        <DialogHeader>
          <DialogTitle>New LLM</DialogTitle>
          <DialogDescription>
            Adjust the LLM settings
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[600px]">
          <LLMForm setOpen={setOpen} buttonStyle='w-full' buttonText='Create' />
          <DialogFooter className="sm:justify-start mt-2">
            <DialogDescription>You can change LLM setting later in Settings</DialogDescription>
          </DialogFooter>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
