"use client"
import React, { useState } from 'react'
import { SearchBar } from './search-bar'
import { UploadButton } from './dialog/upload-file'

function FilesHeader() {
    const [query, setQuery] = useState("");
    return (
        <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold">{"title"}</h1>

            <SearchBar query={query} setQuery={setQuery} />

            <UploadButton />
        </div>
    )
}

export default FilesHeader