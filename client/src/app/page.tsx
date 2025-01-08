'use client'
import { GridItem } from '@/components/GridItem'
import { Header } from '@/components/Header'
import { LABELS } from '@/lib/labels'
import { streamSearch } from '@/lib/req'
import { SearchResult } from '@/schemas'
import { useState } from 'react'

const Reais = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
})

export default function Home() {
    const [query, setQuery] = useState('')
    const [searched, setSearched] = useState(false)
    const [result, setResults] = useState<SearchResult[]>([])
    const [loading, setLoading] = useState(false)

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

    return (
        <>
            <Header
                handleSubmit={handleSubmit}
                inputChange={inputChange}
                loading={loading}
                query={query}
                searched={searched}
            />
            <main className='max-w-screen-lg w-full mx-auto p-4 pb-48'>
                <div className='flex flex-col w-full gap-4'>
                    {result.map((result) => (
                        <div key={result.store} className='flex flex-col gap-4'>
                            <h2 className='text-2xl font-bold'>{LABELS[result.store]}</h2>
                            <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
                                {result.data?.products
                                    .sort((a, b) => a.cash.total_price - b.cash.total_price)
                                    .map((product) => (
                                        <GridItem
                                            key={product.id}
                                            product={product}
                                            Reais={Reais}
                                        />
                                    ))}
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </>
    )
}
