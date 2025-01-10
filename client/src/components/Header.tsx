'use client'
import { useSettings } from '@/contexts/settings/SettingsContext'
import { SearchIcon } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { RoundButton } from './RoundButton'

interface HeaderProps {
    searched: boolean
    query: string
    loading: boolean
    inputChange: (query: string) => void
    handleSearch: (query: string) => void
    reset: () => void
}

const padding = 96

export function Header({
    searched,
    query,
    loading,
    inputChange,
    handleSearch,
    reset,
}: HeaderProps) {
    const { settings } = useSettings()
    const savedSearches = settings.savedSearches

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
                <button className='w-fit mx-auto font-bold text-6xl' onClick={reset}>
                    <h1>pcbusca</h1>
                </button>
                <form
                    className='flex items-center gap-2'
                    onSubmit={(e) => {
                        e.preventDefault()
                        handleSearch(query)
                    }}
                >
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
                        onChange={(e) => {
                            inputChange(e.target.value)
                        }}
                    />
                    <RoundButton loading={loading}>
                        <SearchIcon size={24} />
                    </RoundButton>
                </form>
                {savedSearches?.length > 0 && !searched && (
                    <div className='w-full text-sm text-slate-500'>
                        <span className='text-slate-400 font-medium'>Pesquisas salvas:</span>
                        <div className='w-full flex items-center justify-center gap-4 flex-wrap'>
                            {savedSearches.map(({ query, id }) => (
                                <button
                                    key={id}
                                    className='hover:underline'
                                    onClick={() => {
                                        inputChange(query)
                                        handleSearch(query)
                                    }}
                                >
                                    {query}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </header>
    )
}
