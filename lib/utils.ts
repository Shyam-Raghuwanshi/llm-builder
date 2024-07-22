import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

//Id Generator function
export default function generateId() {
  const chars = "123456789qwertyuiopasdfghjklzxcvbnm"
  const idLength = 6;
  let id = ""
  for (let i = 0; i < idLength; i++) {
      id += chars[Math.floor(Math.random() * chars.length)];
  }
  return id
}