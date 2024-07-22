import { type Language } from "@/utils/languages";
import { z } from "zod"
export const [GPT_35_TURBO, GPT_35_TURBO_16K, GPT_4] = [
  "gpt-3.5-turbo" as const,
  "gpt-3.5-turbo-16k" as const,
  "gpt-4" as const,
];


export const GPTModelNamesEnum = z.enum([
  'gpt-4o'
  , 'gpt-4o-2024-05-13'
  , 'gpt-4-turbo'
  , 'gpt-4-turbo-2024-04-09'
  , 'gpt-4-0125-preview'
  , 'gpt-4-turbo-preview'
  , 'gpt-4-1106-preview'
  , 'gpt-4-vision-preview'
  , 'gpt-4'
  , 'gpt-4-0314'
  , 'gpt-4-0613'
  , 'gpt-4-32k'
  , 'gpt-4-32k-0314'
  , 'gpt-4-32k-0613'
  , 'gpt-3.5-turbo'
  , 'gpt-3.5-turbo-16k'
  , 'gpt-3.5-turbo-0301'
  , 'gpt-3.5-turbo-0613'
  , 'gpt-3.5-turbo-1106'
  , 'gpt-3.5-turbo-16k-0613'
  , 'gpt-3.5-turbo-0125'
]);


type GPTModelNames = z.infer<typeof GPTModelNamesEnum>;

export const MAX_TOKENS: Record<GPTModelNames, number> = {
  "gpt-3.5-turbo": 4000,
  "gpt-3.5-turbo-16k": 16000,
  "gpt-4": 4000,
  "gpt-4o": 4000,
  "gpt-4o-2024-05-13": 4000,
  "gpt-4-turbo": 4000,
  "gpt-4-turbo-2024-04-09": 4000,
  "gpt-4-0125-preview": 4000,
  "gpt-4-turbo-preview": 4000,
  "gpt-4-1106-preview": 4000,
  "gpt-4-vision-preview": 4000,
  "gpt-4-0314": 4000,
  "gpt-4-0613": 4000,
  "gpt-4-32k": 32000,
  "gpt-4-32k-0314": 32000,
  "gpt-4-32k-0613": 32000,
  "gpt-3.5-turbo-0301": 4000,
  "gpt-3.5-turbo-0613": 4000,
  "gpt-3.5-turbo-1106": 4000,
  "gpt-3.5-turbo-16k-0613": 16000,
  "gpt-3.5-turbo-0125": 4000,
};

// export interface ModelSettings {
//   language: Language;
//   customApiKey: string;
//   customModelName: GPTModelNames;
//   customTemperature: number;
//   customMaxLoops: number;
//   maxTokens: number;
// }