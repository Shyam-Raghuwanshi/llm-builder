import Image from "next/image";
import Sidebar from "./Sidebar";
import Link from "next/link";
import { FaBars } from "react-icons/fa";
import type { DisplayProps } from "./Sidebar";
import { MdOutlineSettings } from "react-icons/md";
import { IoHomeOutline } from "react-icons/io5";
import { Separator } from "@/components/ui/separator"
import { CreateLLM } from "../dialog/create-llm";
import LLMs from "../llms";

const LeftSidebar = ({ show, setShow }: DisplayProps & { onReload?: () => void }) => {
  return (
    <Sidebar show={show} setShow={setShow} side="left" className="border-slate-6s border-r dark:bg-black dark:text-slate-8 bg-slate-1 hover:from-slate-6">
      <div className="flex flex-row items-center pb-6">
        <Link
          href="/"
        >
          <Image className="dark:hidden hover:scale-125 transition-all" src="/app/mainLight.png" width="30" height="30" alt="LLM-Builder" />
          <Image className="hidden dark:block hover:scale-125 transition-all" src="/app/mainDark.png" width="30" height="30" alt="LLM-Builder" />
        </Link>
        <button
          className="ml-auto rounded-md border-none transition-all hover:bg-slate-1 bg-slate-7 dark:hover:bg-zinc-900"
          onClick={() => setShow(!show)}
        >
          <FaBars size="12" className="z-20 m-2 dark:text-white text-black" />
        </button>
      </div>
      <Separator />

      <CreateLLM />
      <LLMs />
      <ul role="list" className="flex flex-col mt-14">
        <Link href="/dashboard">
          <li className="hover:bg-zinc-900 rounded-md py-2 pl-2 hover:transition-all hover:duration-300">
            <div className="w-full flex space-x-2 items-center">
              <IoHomeOutline className="h-4 w-4" />
              <span className="text-sm">Home</span>
            </div>
          </li>
        </Link>

        <Link href="/dashboard/settings/user">
          <li className="hover:bg-zinc-900 rounded-md py-2 pl-2 hover:transition-all hover:duration-300">
            <div className="w-full flex space-x-2 items-center">
              <MdOutlineSettings className="h-4 w-4" />
              <span className="text-sm">Settings</span>
            </div>
          </li>
        </Link>

      </ul>
    </Sidebar>
  );
};

export default LeftSidebar;

