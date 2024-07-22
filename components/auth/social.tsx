"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { FaGithub, FaGoogle } from "react-icons/fa";

export const Social = () => {

  const onClick = (provider: "google" | "github") => {
    signIn(provider, {
      callbackUrl: DEFAULT_LOGIN_REDIRECT,
    });
  }

  return (
    <div className="flex items-center w-full gap-y-2 flex-col py-4 bg-black">
      <Button
        size="lg"
        className="w-full py-7 bg-black hover:bg-zinc-900 hover:text-white border-zinc-700"
        variant="outline"
        onClick={()=>{onClick("google")}}
      >
        <FaGoogle className="h-5 w-5 text-white mr-2" />
        Continue with Google
      </Button>
      <Button
        size="lg"
        className="w-full py-7 bg-black hover:bg-zinc-900 hover:text-white border-zinc-700"
        variant="outline"
        onClick={()=>{onClick("github")}}
      >
        <FaGithub className="h-5 w-5 text-white mr-2" />
        Continue with Github
      </Button>
    </div>
  );
};