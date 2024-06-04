'use client'

import { useEffect } from 'react'

export default function Error({ error, reset, }: { error: Error & { digest?: string }, reset: () => void }) {
    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <div className={"flex flex-col min-h-screen justify-center items-center"}>
            <h1
                className={"font-bold text-2xl"}>
                piccolo problema
            </h1>

            <button
                className={"mt-5 px-5 py-2 bg-red-600 text-white font-bold rounded-full outline-red-700 hover:bg-red-700 transition-colors ease"}
                onClick={() => reset()}
            >
                riprova
            </button>
        </div>
    )
}