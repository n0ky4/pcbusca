'use client'
import { GridItem } from '@/components/GridItem'
import { Header } from '@/components/Header'
import { AboutModal } from '@/components/modal/AboutModal'
import { HistoryModal } from '@/components/modal/HistoryModal'
import { SettingsModal } from '@/components/modal/SettingsModal'
import { NotFound } from '@/components/NotFound'
import { ProductsRanking } from '@/components/ProductsRanking'
import { t } from '@/components/Toaster'
import { TopBar } from '@/components/TopBar'
import { useSettings } from '@/contexts/settings/SettingsContext'
import { formatDate, getStoreLabel } from '@/lib/common'
import { LABELS } from '@/lib/labels'
import { log } from '@/lib/log'
import { StreamError, streamSearch } from '@/lib/req'
import { useEffect, useMemo, useState } from 'react'
import { MIN_SEARCH_LENGTH, SearchResult } from 'shared'

const Reais = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
})

interface HomeProps {
    initialSearch: string | undefined
}

export function Home({ initialSearch }: HomeProps) {
    const [query, setQuery] = useState('')
    const [searched, setSearched] = useState(false)
    const [loading, setLoading] = useState(false)
    const [result, setResults] = useState<SearchResult[]>([])

    const { settings, history } = useSettings()

    // modal states
    const [showSettingsModal, setShowSettingsModal] = useState(false)
    const [showHistoryModal, setShowHistoryModal] = useState(false)
    const [showAboutModal, setShowAboutModal] = useState(false)

    const onSearch = async (_query: string, changeInput?: boolean) => {
        if (!_query || loading) return
        if (changeInput) setQuery(_query)

        // check query length
        if (_query.length < MIN_SEARCH_LENGTH) {
            t.error('Essa pesquisa é muito curta!')
            return
        } else if (_query.length > 100) {
            t.error('Essa pesquisa é muito longa!')
            return
        }

        // change "q" query param
        const url = new URL(window.location.href)
        url.searchParams.set('q', _query)
        window.history.pushState({}, '', url.toString())

        // instantiate search
        const search = streamSearch(_query, settings.stores)

        log.info(`searching for "${_query}" in ${settings.stores.join(', ')}`)

        let startedAt: null | Date = null
        let endedAt: null | Date = null

        // on { msg: "start" }
        search.on('start', () => {
            setResults([])
            setLoading(true)

            if (settings.keepHistory) history.add(_query)

            startedAt = new Date()
            log.info('search started at', formatDate(startedAt))
        })

        // on { store, data: [...] }
        search.on('data', (data: SearchResult) => {
            if (!data.data?.products) {
                log.warn(`no products found in ${getStoreLabel(data.store)}`)
                t.warning(`Nenhum produto encontrado na loja ${getStoreLabel(data.store)}`)
                return
            }

            setSearched((prev) => {
                if (!prev) return true
                return prev
            })
            setResults((prev) => [...prev, data])
        })

        // on { msg: "error" } (store or rate/quota errors)
        search.on('error', (error: StreamError) => {
            if (error.type === 'store') {
                const { store } = error
                log.error(`error while fetching products in ${getStoreLabel(store)}`)
                t.error(`Erro ao buscar produtos na loja ${getStoreLabel(store)}`)

                return
            }

            switch (error.code) {
                case 'QUOTA_EXCEEDED':
                    log.error('quota exceeded')
                    t.error('Cota excedida, tente novamente amanhã! :3')
                    break
                case 'RATE_LIMIT':
                    log.error('rate limit exceeded')
                    t.error('Calmaaaaaa!!')
                    break
            }
        })

        // on { msg: "end" }
        search.on('end', () => {
            setLoading(false)

            endedAt = new Date()
            log.info('search ended at', formatDate(endedAt))
            log.info('search took', endedAt.getTime() - startedAt!.getTime(), 'ms')
        })

        // start search
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
    const openAbout = () => setShowAboutModal(true)

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

    // start search if initialSearch is provided (from query param)
    useEffect(() => {
        if (initialSearch) onSearch(initialSearch, true)
    }, [initialSearch])

    return (
        <>
            <AboutModal show={showAboutModal} onClose={() => setShowAboutModal(false)} />
            <HistoryModal
                show={showHistoryModal}
                onClose={() => setShowHistoryModal(false)}
                onSearch={onSearch}
            />
            <SettingsModal show={showSettingsModal} onClose={() => setShowSettingsModal(false)} />
            <TopBar
                onSettingsClick={openSettings}
                onHistoryClick={openHistory}
                onAboutClick={openAbout}
            />
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
                                <h2 className='text-xl md:text-2xl font-bold'>Menores preços</h2>
                                <ProductsRanking products={cheapestProducts} Reais={Reais} />
                            </div>
                        )}

                        {/* grid */}
                        {sorted.length > 0 && (
                            <div className='flex flex-col w-full gap-8'>
                                {sorted.map((result) => (
                                    <div key={result.store} className='flex flex-col gap-4'>
                                        <h2 className='text-xl md:text-2xl font-bold'>
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
