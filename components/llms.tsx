"use client"

import React, { useEffect, useState } from 'react'
import { GetAllLLMs } from '@/actions/LLM'
import { getSession } from 'next-auth/react'
import { Skeleton } from "@/components/ui/skeleton"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from './ui/button'
import { SiOpenai } from "react-icons/si";
import Link from 'next/link'

export default function LLMs() {
    const [llms, setLlms] = useState<Array<object>>([])
    const [isllmsloading, setIsllmsloading] = useState(false)
    useEffect(() => {
        (async () => {
            try {
                setIsllmsloading(true)
                const session = await getSession()
                const llms = await GetAllLLMs(session?.user.id!)
                setLlms(llms.data || [])
                setIsllmsloading(false)
            } catch (error) {
                console.log(error)
                setIsllmsloading(false)
            }
        })();
    }, [])

    return (
        <div className="flex items-center mt-5">
            <ScrollArea className="h-[34rem] rounded-md">
                {isllmsloading && (
                    Array.from({ length: 8 }).map((_, i) => (
                        <div key={i} className="flex items-center space-x-4 pt-4">
                            <Skeleton className="h-12 w-12 rounded-full" />
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-[250px]" />
                                <Skeleton className="h-4 w-[200px]" />
                            </div>
                        </div>
                    ))
                )}
                {!isllmsloading && llms.length !== 0 && (
                    llms.map((llm: any) => (
                        <div key={llm.id} className="flex items-center space-x-4">
                            <Link href={`/dashboard/manage-llm/files/${llm.id}`}>
                                <Button className='w-[13.9rem] h-14 bg-zinc-950 text-slate-200 border mt-2 hover:bg-zinc-900 hover:transition-all hover:duration-300 p-1 justify-between'>
                                    <div className='flex items-start flex-col p-2'>
                                        <div className='flex'>
                                            <SiOpenai className="w-5 h-5 mr-2" />
                                            <span className='truncate w-28 text-start'>{llm?.name}</span>
                                        </div>
                                        <span className='text-sm text-muted-foreground text-end'>{llm?.model}</span>
                                    </div>
                                </Button>
                            </Link>
                        </div>
                    ))
                )
                }
            </ScrollArea >
        </div >
    )
}
