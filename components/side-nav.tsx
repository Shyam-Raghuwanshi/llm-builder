"use client";

import { Button } from "@/components/ui/button";
import clsx from "clsx";
import { LuFiles } from "react-icons/lu";
import { GoTrash } from "react-icons/go";
import { IoSettingsOutline } from "react-icons/io5";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function SideNav({ modelId }: { modelId: string }) {
  const pathname = usePathname();
  return (
    <div className="w-40 flex flex-col gap-4">
      <Link href={`/dashboard/manage-llm/files/${modelId}`}>
        <Button
          variant={"link"}
          className={clsx("flex gap-2", {
            "text-blue-500": pathname.includes(`/dashboard/manage-llm/files/${modelId}`),
          })}
        >
          <LuFiles className="h-5 w-5" /> All Files
        </Button>
      </Link>

      <Link href={`/dashboard/manage-llm/trash/${modelId}`}>
        <Button
          variant={"link"}
          className={clsx("flex gap-2", {
            "text-blue-500": pathname.includes(`/dashboard/manage-llm/trash/${modelId}`),
          })}
        >
          <GoTrash className="h-5 w-5" /> Trash
        </Button>
      </Link>
      <Link href={`/dashboard/manage-llm/settings/${modelId}`}>
        <Button
          variant={"link"}
          className={clsx("flex gap-2", {
            "text-blue-500": pathname.includes(`/dashboard/manage-llm/settings/${modelId}`),
          })}
        >
          <IoSettingsOutline className="h-5 w-5" /> Settings
        </Button>
      </Link>
    </div>
  );
}
