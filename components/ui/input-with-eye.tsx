"use client"

import { forwardRef, useState } from "react"
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import { Button } from "@/components/ui/button"
import { Input, InputProps } from "@/components/ui/input"
import { cn } from "@/lib/utils"

const InputWithEye = forwardRef<HTMLInputElement, InputProps>(
    ({ className, ...props }, ref) => {
        const [showInput, setShowInput] = useState(false)
        const disabled = props.value === "" || props.value === undefined || props.disabled

        return (
            <div className="relative w-full">
                <Input
                
                    type={showInput ? "text" : "password"}
                    className={cn("hide-input-toggle pr-10", className)}
                    ref={ref}
                    {...props}
                />
                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowInput((prev) => !prev)}
                    disabled={disabled}
                >
                    {showInput ? (
                        <IoEye
                            className="h-4 w-4"
                            aria-hidden="true"
                        />
                    ) : (
                        <IoEyeOff
                            className="h-4 w-4"
                            aria-hidden="true"
                        />
                    )}
                    <span className="sr-only">
                        {showInput ? "Hide text" : "Show text"}
                    </span>
                </Button>

                <style>{`
					.hide-input-toggle::-ms-reveal,
					.hide-input-toggle::-ms-clear {
						visibility: hidden;
						pointer-events: none;
						display: none;
					}
				`}</style>
            </div>
        )
    },
)
InputWithEye.displayName = "InputWithEye"

export { InputWithEye }