'use client'
import { SearchIcon } from 'lucide-react'
import { useState } from 'react'
import { twMerge } from 'tailwind-merge'

export default function Home() {
    const [search, setSearch] = useState('')

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
    }

    const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
    }

    return (
        <main className='p-4 w-screen h-[70vh] flex items-center justify-center'>
            <div className='text-center max-w-md w-full flex flex-col gap-8'>
                <h1 className='font-bold text-6xl'>pcbusca</h1>
                <form className='flex items-center gap-2' onSubmit={handleSubmit}>
                    <input
                        type='text'
                        placeholder='Pesquise uma peça de computador'
                        className={twMerge(
                            'transition-all ease-out min-h-10',
                            'w-full p-2 border rounded-full bg-slate-900 border-slate-800',
                            'outline-none ring-0 focus:ring-2 focus:ring-teal-400',
                            'placeholder-slate-500 text-white'
                        )}
                        value={search}
                        onChange={inputChange}
                    />
                    <button
                        className={twMerge(
                            'min-w-10 min-h-10 flex items-center justify-center leading-none',
                            'transition-all ease-out bg-teal-300 rounded-full text-slate-900',
                            'hover:bg-teal-500 outline-none focus:ring-2 focus:ring-white'
                        )}
                    >
                        <SearchIcon size={24} />
                    </button>
                </form>
            </div>
        </main>
    )
}
