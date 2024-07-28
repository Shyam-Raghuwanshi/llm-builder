import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
//@ts-ignore
import pdf from "pdf-parse/lib/pdf-parse.js";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

//Id Generator function
export function generateId() {
  const chars = "123456789qwertyuiopasdfghjklzxcvbnm"
  const idLength = 6;
  let id = ""
  for (let i = 0; i < idLength; i++) {
    id += chars[Math.floor(Math.random() * chars.length)];
  }
  return id
}

export async function loadPdf(buffer: Buffer) {
  try {
    const pdfData = await pdf(buffer);
    return pdfData.text;
  } catch (error) {
    console.error("Error loading PDF:", error);
    throw error;
  }
}