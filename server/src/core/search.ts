import { log } from '@/log'
import { SearchAllSettingsInput, searchAllSettingsSchema } from '@/types'
import EventEmitter from 'events'
import { writeFileSync } from 'fs'
import { Response, SearchResult, Store } from 'shared'
import { kabum } from './store/kabum'
import { pichau } from './store/pichau'
import { terabyte } from './store/terabyte'

type SearchEmitter = EventEmitter & {
    start: () => void
}
type SearchPromise = { store: Store; promise: Promise<Response> }

// handlers para cada tipo de pesquisa
const storeHandlers: Record<Store, (query: string, page: number) => Promise<Response>> = {
    kabum: (query, page) => kabum(query, { page }),
    pichau: (query, page) => pichau(query, { page }),
    terabyte: (query, page) => terabyte(query, page),
}

// função que retorna um array com as promises de pesquisa
const getPromises = (query: string, settings: SearchAllSettingsInput): SearchPromise[] => {
    const { page, stores } = searchAllSettingsSchema.parse(settings)
    return stores
        .filter((store) => storeHandlers[store])
        .map((store) => ({
            store,
            promise: storeHandlers[store](query, page),
        }))
}

// função que retorna um EventEmitter para ser utilizado
// na pesquisa via stream (/stream-search)
export function searchEmitter(query: string, settings: SearchAllSettingsInput) {
    const em = new EventEmitter() as SearchEmitter
    let running = false

    em.start = () => {
        if (running) {
            log.warn('search already running')
            return
        }

        running = true

        // trackedPromises são todas as promises
        // já tratadas para emitir os eventos corretos
        const trackedPromises = getPromises(query, settings).map(({ store, promise }) => {
            // setar emit de dados e erro
            const wrappedPromise = promise
                .then((data) => {
                    em.emit('data', { store, data })
                })
                .catch((err: unknown) => {
                    if (err instanceof Error && err?.message === 'NOT_FOUND') {
                        // se for erro de not found, emitir data null
                        em.emit('data', { store, data: null })
                        return
                    }
                    em.emit('error', { store, err })
                })

            return wrappedPromise
        })

        em.emit('start')

        Promise.all(trackedPromises)
            .catch((err) => {
                log.error('unexpected error in searchEmitter', { err })
            })
            .finally(() => {
                running = false
                em.emit('end')
            })
    }

    return em
}

export async function searchAll(
    query: string,
    settings: SearchAllSettingsInput
): Promise<SearchResult[]> {
    const promises: { store: Store; promise: Promise<Response> }[] = getPromises(query, settings)

    const results = await Promise.all(
        promises.map(async ({ store, promise }) => {
            try {
                const data = await promise
                return { store, data }
            } catch (err) {
                log.error('error searching store', { store, err })
                return { store, data: null }
            }
        })
    )

    writeFileSync('searchAll.local.json', JSON.stringify(results, null, 2))

    return results
}
