export * from "./modelSettings";

export type llm = {
    id: string;
    name: string;
    description: string | null;
    model: string | null;
    temperature: number | null;
    apiKey: string; userId: string;
    docs: string[];
    maxLoops: number | null;
    create_date: Date;
    update_date: Date | null;
    delete_date: Date | null;
}

export type docsType = {
    name: string;
    url: string;
    type: string;
}

export const models = ['gpt-4o'
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
    , 'gpt-3.5-turbo-0125']