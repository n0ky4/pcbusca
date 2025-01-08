'use client'
import { LoaderCircle, SearchIcon } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { twMerge } from 'tailwind-merge'

interface HeaderProps {
    searched: boolean
    query: string
    loading: boolean
    inputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
}

const padding = 96

export function Header({ searched, query, loading, inputChange, handleSubmit }: HeaderProps) {
    const headerContentRef = useRef<HTMLDivElement>(null)
    const [headerContentHeight, setHeaderContentHeight] = useState(0)

    useEffect(() => {
        if (!headerContentRef.current) return
        setHeaderContentHeight(headerContentRef.current.clientHeight)
    }, [])

    return (
        <header
            className={twMerge(
                'w-full flex items-center justify-center py-12',
                'ease-out duration-500 transition-[height]'
            )}
            style={{ height: searched ? `${headerContentHeight + padding}px` : '70vh' }}
        >
            <div className='text-center max-w-md w-full flex flex-col gap-8' ref={headerContentRef}>
                <h1 className='font-bold text-6xl'>pcbusca</h1>
                <form className='flex items-center gap-2' onSubmit={handleSubmit}>
                    <input
                        type='text'
                        placeholder='Pesquise uma peça de computador'
                        className={twMerge(
                            'transition-all ease-out min-h-10',
                            'w-full p-2 border rounded-full bg-slate-900 border-slate-800',
                            'outline-none ring-0 focus:ring-2 focus:ring-teal-400',
                            'placeholder-slate-500 text-white',
                            'disabled:opacity-75 disabled:cursor-not-allowed'
                        )}
                        value={query}
                        onChange={inputChange}
                    />
                    <button
                        className={twMerge(
                            'min-w-10 min-h-10 flex items-center justify-center leading-none',
                            'transition-all ease-out bg-teal-300 rounded-full text-slate-900',
                            'hover:bg-teal-500 outline-none focus:ring-2 focus:ring-white',
                            'disabled:opacity-75 disabled:cursor-not-allowed'
                        )}
                        disabled={loading}
                    >
                        {loading ? (
                            <LoaderCircle size={24} className='animate-spin' />
                        ) : (
                            <SearchIcon size={24} />
                        )}
                    </button>
                </form>
            </div>
        </header>
    )
}
