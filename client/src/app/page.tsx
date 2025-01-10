'use client'
import { GridItem } from '@/components/GridItem'
import { Header } from '@/components/Header'
import { HistoryModal } from '@/components/HistoryModal'
import { NotFound } from '@/components/NotFound'
import { ProductsRanking } from '@/components/ProductsRanking'
import { SettingsModal } from '@/components/SettingsModal'
import { TopBar } from '@/components/TopBar'
import { useSettings } from '@/contexts/settings/SettingsContext'
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
    const [showHistoryModal, setShowHistoryModal] = useState(false)

    const { settings, history } = useSettings()

    const onSearch = async (_query: string, changeInput?: boolean) => {
        if (!_query || loading) return

        if (changeInput) setQuery(_query)
        const search = streamSearch(_query)

        search.on('start', () => {
            setResults([])
            setLoading(true)

            if (settings.keepHistory) history.add(_query)

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

    const onReset = () => {
        if (loading) return
        setQuery('')
        setSearched(false)
        setResults([])
    }

    const openSettings = () => setShowSettingsModal(true)
    const openHistory = () => setShowHistoryModal(true)

    const cheapestProducts = useMemo(() => {
        return result
            .flatMap(
                (store) =>
                    store?.data?.products?.map((product) => ({
                        ...product,
                        store: store.store,
                    })) || []
            )
            .sort((a, b) => a.cash.total_price - b.cash.total_price)
            .slice(0, settings.rankingSize)
    }, [result, settings.rankingSize])

    const sorted = useMemo(
        () =>
            result.sort((a, b) => {
                if (a?.data?.products.length === 0) return 1
                if (b?.data?.products.length === 0) return -1
                return 0
            }),
        [result]
    )

    const empty = useMemo(() => searched && !loading && !result.length, [searched, loading, result])

    return (
        <>
            <HistoryModal
                show={showHistoryModal}
                onClose={() => setShowHistoryModal(false)}
                onSearch={onSearch}
            />
            <SettingsModal show={showSettingsModal} onClose={() => setShowSettingsModal(false)} />
            <TopBar onSettingsClick={openSettings} onHistoryClick={openHistory} />
            <Header
                onSearch={onSearch}
                onInputChange={(_query) => setQuery(_query)}
                loading={loading}
                query={query}
                searched={searched}
                onReset={onReset}
            />
            <main className='max-w-screen-lg w-full mx-auto p-4 pb-48 flex flex-col gap-8'>
                {empty && <NotFound />}

                {!empty && searched && (
                    <>
                        {/* menores preços  */}
                        {cheapestProducts.length > 0 && (
                            <div className='flex flex-col gap-4'>
                                <h2 className='text-2xl font-bold'>Menores preços</h2>
                                <ProductsRanking products={cheapestProducts} Reais={Reais} />
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
