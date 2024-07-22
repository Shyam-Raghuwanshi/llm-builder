"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { HiOutlineSun } from "react-icons/hi2";
import { RxMoon } from "react-icons/rx";
import { Button } from "@/components/ui/button"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function ModeToggle() {
  const { setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="dark:hover:bg-gray-800 dark:text-slate-8 hover:from-slate-6 border-0" variant="outline" size="icon">
          <HiOutlineSun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <RxMoon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="dark:bg-gray-800 dark:text-slate-8 bg-slate-1 hover:from-slate-6 border-0" align="end">
        <DropdownMenuItem className="cursor-pointer dark:text-slate-8 p-1 shadow-depth-1 transition-all dark:hover:bg-gray-600 hover:bg-slate-4" onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer dark:text-slate-8 p-1 shadow-depth-1 transition-all dark:hover:bg-gray-600 hover:bg-slate-4" onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer dark:text-slate-8 p-1 shadow-depth-1 transition-all dark:hover:bg-gray-600 hover:bg-slate-4" onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}