'use client'
import { cleanTitle } from '@/lib/format'
import { LABELS } from '@/lib/labels'
import { streamSearch } from '@/lib/req'
import { SearchResult } from '@/schemas'
import { LoaderCircle, SearchIcon } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { twMerge } from 'tailwind-merge'

const Reais = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
})

export default function Home() {
    const [query, setQuery] = useState('')
    const [searched, setSearched] = useState(false)
    const [result, setResults] = useState<SearchResult[]>([])
    const [loading, setLoading] = useState(false)

    const padding = 96
    const [headerContentHeight, setHeaderContentHeight] = useState(0)
    const headerContentRef = useRef<HTMLDivElement | null>(null)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!query || loading) return

        const search = streamSearch(query)

        search.on('start', () => {
            setResults([])
            setLoading(true)
            console.log('start')
        })

        search.on('data', (data: SearchResult) => {
            setSearched((prev) => {
                if (!prev) return true
                return prev
            })
            setResults((prev) => [...prev, data])
        })

        search.on('end', () => {
            setLoading(false)
            console.log('end')
        })
        search.start()
    }

    const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value)
    }

    useEffect(() => {
        if (!headerContentRef.current) return
        setHeaderContentHeight(headerContentRef.current.clientHeight)
    }, [])

    return (
        <>
            <header
                className={twMerge(
                    'w-full flex items-center justify-center py-12',
                    'ease-out duration-500 transition-[height]'
                )}
                style={{ height: searched ? `${headerContentHeight + padding}px` : '70vh' }}
            >
                <div
                    className='text-center max-w-md w-full flex flex-col gap-8'
                    ref={headerContentRef}
                >
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
            <main className='max-w-screen-lg w-full mx-auto p-4'>
                <div className='flex flex-col w-full gap-4'>
                    {result.map((result) => (
                        <div key={result.store} className='flex flex-col gap-4'>
                            <h2 className='text-2xl font-bold'>{LABELS[result.store]}</h2>
                            <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
                                {result.data?.products.map((product) => (
                                    <div key={product.id} className='flex flex-col gap-2'>
                                        <img
                                            src={product.images.default}
                                            alt={product.name}
                                            className='w-full h-48 object-cover rounded-lg'
                                        />
                                        <h3
                                            className='font-bold text-lg truncate'
                                            title={product.name}
                                        >
                                            {cleanTitle(product.name)}
                                        </h3>
                                        <div>
                                            <p className='text-lg font-semibold text-emerald-400'>
                                                {Reais.format(product.cash.total_price)}
                                            </p>
                                            <p className='text-sm text-slate-500'>
                                                {Reais.format(product.installment.total_price)} em
                                                até {product.installment.max_installments}x
                                            </p>
                                        </div>
                                        <a href={product.url} className='text-sm underline'>
                                            Ver na loja
                                        </a>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </>
    )
}
