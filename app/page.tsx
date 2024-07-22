"use client"
import { Button } from "@/components/ui/button";
import Image from "next/image";
import LinkIconItem from "@/components/link-items";
import { SOCIAL_LINKS } from "@/components/linkts";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { DialogDemo } from "@/components/dialog/create-llm";

function Home() {
  const router = useRouter();

  return (
    <main className="leading-normal tracking-normal h-auto w-full text-indigo-400 bg-cover bg-fixed bg-[url(/header.png)] pt-5" >
      <div className="w-full container mx-auto">
        <div className="w-full flex items-center justify-between">
          <a className="flex items-center text-indigo-400 no-underline hover:no-underline font-bold text-2xl lg:text-4xl" href="#">
            LLM<span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-pink-500 to-purple-500">-BUILDER</span>
          </a>

          <div className="mx-2 items-center gap-3 flex w-1/2 justify-center content-center">
            {SOCIAL_LINKS.map((link) => (
              <LinkIconItem
                key={link.name}
                href={link.href}
                onClick={() => {
                  void router.push(link.href);
                }}
              >
                <link.icon
                  size={20}
                  className="transition-all group-hover:rotate-3 group-hover:scale-125"
                />
              </LinkIconItem>
            ))}
          </div>

          <Link href={"/dashboard"}> 
            <Button size={"lg"} className="bg-gradient-to-r from-purple-800 to-green-500 hover:from-pink-500 hover:to-green-500 text-white font-bold py-2 rounded focus:ring transform transition hover:scale-105 duration-300 ease-in-out px-9 flex justify-end">
              Start Creating!
            </Button>
          </Link>
        </div>
      </div>

      <div className="container pt-24 md:pt-36 mx-auto flex flex-wrap flex-col md:flex-row items-center">
        <div className="flex flex-col w-full xl:w-2/5 justify-center lg:items-start overflow-y-hidden">
          <h1 className="my-4 text-3xl md:text-5xl text-white opacity-75 font-bold leading-tight text-center md:text-left">
            LLM
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-pink-500 to-purple-500">
              -BUILDER
            </span>
          </h1>
          <p className="leading-normal text-base md:text-2xl mb-8 text-center md:text-left">
            Make you own Large langugage model with ease!
          </p>


          <Button size={"lg"} className="bg-gradient-to-r from-purple-800 to-green-500 hover:from-pink-500 hover:to-green-500 text-white font-bold py-2 rounded focus:ring transform transition hover:scale-105 duration-300 ease-in-out px-9">
            Start Creating!
          </Button>
        </div>

        <Image width="100" height="100" alt="img" className="mx-auto w-full md:w-4/5 transform -rotate-6 transition hover:scale-105 duration-700 ease-in-out hover:rotate-6" src="/macbook.svg" />

        <div className="h-20 w-full">

        </div>
      </div>
    </main>
  );
}


export default Home;