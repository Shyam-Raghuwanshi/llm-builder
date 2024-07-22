import RootLayout from "../layout";

export default function ManageLLmLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <RootLayout>
            <h1 className="text-5xl font-bold underline ml-11 mt-5">Manage LLM</h1>
            {children}
        </RootLayout>
    );
}

