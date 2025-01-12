import { SEPARATOR } from '@/routes'
import { TimedMap } from '@/timedMap'
import { FastifyReply } from 'fastify'
import { SearchResult } from 'shared'

const SEARCH_CACHE_TTL = parseInt(process.env.SEARCH_CACHE_TTL || '3600')
const SEARCH_CACHE = new TimedMap<string, SearchResult[]>(SEARCH_CACHE_TTL)

interface CachedKeyValuePair {
    query: string
    stores: string[]
}

export const buildKey = ({ query, stores }: CachedKeyValuePair) =>
    `${query}::${stores.sort().join(',')}`

export const cacheHandler = {
    set: (key: string, value: SearchResult[]) => {
        SEARCH_CACHE.set(key, value)
    },
    stream: (key: string, reply: FastifyReply) => {
        const fromCache = SEARCH_CACHE.get(key)

        if (fromCache) {
            const finalRes = [
                { msg: 'start' },
                ...fromCache.map((data) => ({ store: data.store, data: data.data })),
                { msg: 'end' },
            ]

            for (const data of finalRes) {
                reply.raw.write(JSON.stringify(data) + SEPARATOR)
            }

            reply.raw.end()
            return true
        }

        return false
    },
    normal: (key: string) => {
        const fromCache = SEARCH_CACHE.get(key)
        if (fromCache) return fromCache
        return null
    },
}
