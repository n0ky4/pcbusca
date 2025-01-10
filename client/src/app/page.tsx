'use client'
import { GridItem } from '@/components/GridItem'
import { Header } from '@/components/Header'
import { NotFound } from '@/components/NotFound'
import { SettingsModal } from '@/components/SettingsModal'
import { TopBar } from '@/components/TopBar'
import { useSettings } from '@/contexts/settings/SettingsContext'
import { cleanTitle } from '@/lib/format'
import { LABELS } from '@/lib/labels'
import { streamSearch } from '@/lib/req'
import { useMemo, useState } from 'react'
import { SearchResult } from 'shared'

const Reais = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
})

export default function Home() {
    const [query, setQuery] = useState('')
    const [searched, setSearched] = useState(false)
    const [result, setResults] = useState<SearchResult[]>([])
    const [loading, setLoading] = useState(false)
    const [showSettingsModal, setShowSettingsModal] = useState(false)

    const { settings, setSettings } = useSettings()

    const handleSearch = async (_query: string) => {
        if (!_query || loading) return

        const search = streamSearch(_query)

        search.on('start', () => {
            setResults([])
            setLoading(true)
            console.log('start')
        })

        search.on('data', (data: SearchResult) => {
            if (!data.data?.products) {
                console.warn(`No products found for "${data.store}"`)
                return
            }

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

    const reset = () => {
        if (loading) return
        setQuery('')
        setSearched(false)
        setResults([])
    }

    const openSettings = () => {
        setShowSettingsModal(true)
    }

    const cheapestProducts = useMemo(() => {
        const products = []
        for (const store of result) {
            if (!store?.data?.products) continue

            const mapped = store.data.products.map((product) => ({
                ...product,
                store: store.store,
            }))

            products.push(...mapped)
        }
        return products.sort((a, b) => a.cash.total_price - b.cash.total_price).slice(0, 10)
    }, [result])

    const sorted = useMemo(
        () =>
            result.sort((a, b) => {
                if (a?.data?.products.length === 0) return 1
                if (b?.data?.products.length === 0) return -1
                return 0
            }),
        [result]
    )

    const empty = searched && !loading && !result.length

    return (
        <>
            <SettingsModal show={showSettingsModal} onClose={() => setShowSettingsModal(false)} />
            <TopBar onSettingsClick={openSettings} />
            <Header
                handleSearch={handleSearch}
                inputChange={(_query) => setQuery(_query)}
                loading={loading}
                query={query}
                searched={searched}
                reset={reset}
            />
            <main className='max-w-screen-lg w-full mx-auto p-4 pb-48 flex flex-col gap-8'>
                {empty && <NotFound />}

                {!empty && searched && (
                    <>
                        {/* menores preços  */}
                        {cheapestProducts.length > 0 && (
                            <div className='flex flex-col gap-4'>
                                <h2 className='text-2xl font-bold'>Menores preços</h2>
                                <table className='w-full table-auto divide-y divide-slate-800'>
                                    <thead>
                                        <tr>
                                            <th className='text-left !font-semibold'>Produto</th>
                                            <th className='text-right !font-semibold'>
                                                Preço à vista
                                            </th>
                                            <th className='text-right !font-semibold'>
                                                Preço parcelado
                                            </th>
                                            <th className='text-right !font-semibold'>Loja</th>
                                        </tr>
                                    </thead>
                                    <tbody className='divide-y divide-slate-800 text-sm text-slate-300'>
                                        {cheapestProducts.map((product) => (
                                            <tr key={product.id} className='hover:bg-slate-900'>
                                                <td
                                                    className='max-w-md truncate'
                                                    title={product.name}
                                                >
                                                    <a
                                                        href={product.url}
                                                        target='_blank'
                                                        rel='noopener noreferrer'
                                                        className='hover:underline'
                                                    >
                                                        {cleanTitle(product.name)}
                                                    </a>
                                                </td>
                                                <td className='text-right'>
                                                    {Reais.format(product.cash.total_price)} (
                                                    {product.cash.discount}%)
                                                </td>
                                                <td className='text-right'>
                                                    {Reais.format(product.installment.total_price)}{' '}
                                                    ({product.installment.max_installments}x)
                                                </td>
                                                <td className='text-right'>{product.store}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}

                        {/* grid */}
                        {sorted.length > 0 && (
                            <div className='flex flex-col w-full gap-8'>
                                {sorted.map((result) => (
                                    <div key={result.store} className='flex flex-col gap-4'>
                                        <h2 className='text-2xl font-bold'>
                                            {LABELS[result.store]}
                                        </h2>

                                        {result.data?.products.length === 0 ? (
                                            <NotFound center={false} />
                                        ) : (
                                            <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
                                                {result.data?.products
                                                    .sort(
                                                        (a, b) =>
                                                            a.cash.total_price - b.cash.total_price
                                                    )
                                                    .map((product) => (
                                                        <GridItem
                                                            key={product.url}
                                                            product={product}
                                                            Reais={Reais}
                                                        />
                                                    ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </>
                )}
            </main>
        </>
    )
}
