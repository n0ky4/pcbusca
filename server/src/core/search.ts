import { log } from '@/log'
import {
    Response,
    SearchAllSettingsInput,
    searchAllSettingsSchema,
    SearchResult,
    Store,
} from '@/types'
import EventEmitter from 'events'
import { writeFileSync } from 'fs'
import { kabum } from './store/kabum'
import { pichau } from './store/pichau'
import { terabyte } from './store/terabyte'

type SearchEmitter = EventEmitter & {
    start: () => void
}

const getPromises = (query: string, settings: SearchAllSettingsInput) => {
    const { page, stores } = searchAllSettingsSchema.parse(settings)
    const promises: { store: Store; promise: Promise<Response> }[] = []

    if (stores.includes('kabum')) promises.push({ store: 'kabum', promise: kabum(query, { page }) })
    if (stores.includes('pichau'))
        promises.push({ store: 'pichau', promise: pichau(query, { page }) })
    if (stores.includes('terabyte'))
        promises.push({ store: 'terabyte', promise: terabyte(query, page) })

    return promises
}

export function searchEmitter(query: string, settings: SearchAllSettingsInput) {
    const em = new EventEmitter() as SearchEmitter
    let running = false

    em.start = () => {
        if (running) {
            log.warn('search already running')
            return
        }

        running = true

        const promises: { store: Store; promise: Promise<Response> }[] = getPromises(
            query,
            settings
        ).map(({ store, promise }) => {
            promise.then((data) => {
                em.emit('data', { store, data })
            })
            return { store, promise }
        })

        em.emit('start')
        Promise.all(promises.map((p) => p.promise))
            .then(() => {
                em.emit('end')
            })
            .catch((err) => {
                em.emit('error', err)
            })
            .finally(() => {
                running = false
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
