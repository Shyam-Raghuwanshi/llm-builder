import { Transition, TransitionChild } from "@headlessui/react";
import clsx from "clsx";
import type { ReactNode } from "react";
import { Fragment } from "react";
import { FaBars } from "react-icons/fa";

export type DisplayProps = {
  show: boolean;
  setShow: (boolean: boolean) => void;
};

export type SidebarProps = DisplayProps & {
  children: ReactNode;
  side: "left" | "right";
  className?: string;
};

const Sidebar = ({ show, children, side, className }: SidebarProps) => {
  return (
    <SidebarTransition show={show} side={side}>
      <nav
        className={clsx(
          "flex flex-1 flex-col overflow-x-hidden bg-slate-3 p-4 ring-1 ring-white/10",
          className
        )}
      >
        {children}
      </nav>
    </SidebarTransition>
  );
};

type SidebarTransitionProps = {
  side: "left" | "right";
  children: ReactNode;
  show: boolean;
  className?: string;
};

export const SidebarTransition = ({ children, show, side, className }: SidebarTransitionProps) => {
  return (
    <Transition show={show} as={Fragment}>
      <div className="relative z-30">
        <TransitionChild
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-neutral-900/80 lg:hidden" />
        </TransitionChild>
        <div className={`fixed ${side}-0 flex`}>
          <TransitionChild
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom={side === "left" ? "-translate-x-full" : "translate-x-full"}
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo={side === "left" ? "-translate-x-full" : "translate-x-full"}
          >
            <div
              className={clsx("flex max-w-xs flex-1", className || "h-screen max-h-screen w-64")}
            >
              {children}
            </div>
          </TransitionChild>
        </div>
      </div>
    </Transition>
  );
};

export const SidebarControlButton = ({
  show,
  setShow,
  side,
}: DisplayProps & { side: "left" | "right" }) => {
  return (
    <button
      className={clsx(
        "fixed z-20 m-1 rounded-md hover:bg-slate-1 bg-slate-7 dark:bg-gray-700 dark:hover:bg-slate-11 shadow-depth-1 transition-all sm:m-2",
        side === "right" && "right-0"
      )}
      onClick={() => setShow(!show)}
    >
      <FaBars size="12" className="z-20 m-2 dark:text-white text-black" />
    </button>
  );
};
export default Sidebar;
