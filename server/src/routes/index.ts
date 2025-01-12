import { buildKey, cacheHandler } from '@/core/cache'
import { quota } from '@/core/quota'
import { searchAll, searchEmitter } from '@/core/search.js'
import { streamSimulator } from '@/example'
import { log } from '@/log'
import { internalServerErrorSchema, quotaExceededSchema } from '@/types'
import type { FastifyTypedInstance } from '@/types/fastify.types'
import {
    MAX_SEARCH_LENGTH,
    MIN_SEARCH_LENGTH,
    SearchResult,
    searchResultSchema,
    storeSchema,
} from 'shared'
import { z } from 'zod'

export const SEPARATOR = '␀'

export async function routes(app: FastifyTypedInstance) {
    app.post(
        '/products/search',
        {
            schema: {
                tags: ['products'],
                description: 'Search for products',
                body: z.object({
                    query: z.string().max(100).min(3),
                    // page: z.number().int().min(1).default(1),
                    stores: z.array(storeSchema).default(['kabum', 'pichau', 'terabyte']),
                }),
                response: {
                    200: searchResultSchema.array(),
                    403: quotaExceededSchema,
                    500: internalServerErrorSchema,
                },
            },
        },
        async (req, reply) => {
            const cacheKey = buildKey(req.body)

            const cached = cacheHandler.normal(cacheKey)
            if (cached) return cached

            if (!quota.check(req.ip)) {
                reply.code(403).send({ msg: 'error', code: 'QUOTA_EXCEEDED' })
                return
            }

            const {
                body: { query, stores },
            } = req

            quota.increment(req.ip)

            try {
                const results = await searchAll(query, { stores })
                cacheHandler.set(cacheKey, results)
                return results
            } catch (err) {
                log.error('search error', err)
                reply.code(500).send({ msg: 'error', code: 'INTERNAL_SERVER_ERROR' })
            }
        }
    )

    app.post(
        '/products/stream-search',
        {
            schema: {
                tags: ['products'],
                description: 'Stream search for products',
                body: z.object({
                    test: z.boolean().default(false),
                    query: z.string().max(MAX_SEARCH_LENGTH).min(MIN_SEARCH_LENGTH),
                    stores: z.array(storeSchema).min(1).default(['kabum', 'pichau', 'terabyte']),
                }),
                response: {
                    200: z
                        .string()
                        .describe(
                            'Stream of JSON messages separated by the "␀" (symbol for null / U+2400) character. Each message is a JSON object with the following structure:\n' +
                                '- Control messages: Objects with the key `msg`, which can be one of `"start"`, `"end"`, or `"error"`. The error message will also contain the key `store` with the store name that caused the error. Examples: `{"msg": "start"}`, `{"msg": "end"}`, `{"msg": "error", "store": "kabum"}`.\n' +
                                '- Search results: JSON objects representing product search results as per the `SearchResult` schema.\n' +
                                'Example stream:\n' +
                                '```json\n' +
                                '{"msg": "start"}␀{"store": "kabum", "data": [...]}␀{"store": "pichau", "data": [...]}␀{"store": "terabyte", "data": null}␀{"msg": "end"}␀\n' +
                                '```'
                        ),
                    403: quotaExceededSchema,
                },
            },
        },
        async (req, reply) => {
            // content type: text/event-stream
            reply.raw.setHeader('Content-Type', 'text/event-stream')
            reply.raw.setHeader('Cache-Control', 'no-cache')
            reply.raw.setHeader('Connection', 'keep-alive')
            // idk why cors isn't working, so i'm setting it manually
            reply.raw.setHeader('Access-Control-Allow-Origin', '*')

            const cacheKey = buildKey(req.body)
            const cached = cacheHandler.stream(cacheKey, reply)
            if (cached) return

            if (!quota.check(req.ip)) {
                reply.raw.write(
                    JSON.stringify({ msg: 'error', code: 'QUOTA_EXCEEDED' }) + SEPARATOR
                )
                reply.raw.end()
                return
            }

            const emitter = req.body.test
                ? streamSimulator()
                : searchEmitter(req.body.query, { stores: req.body.stores })

            const send = (data: object) => {
                reply.raw.write(JSON.stringify(data) + SEPARATOR)
            }

            let hasErrors = false
            const finalRes: SearchResult[] = []

            emitter.on('start', () => {
                send({ msg: 'start' })
                quota.increment(req.ip)
            })

            emitter.on('data', (data: SearchResult) => {
                send(data)
                finalRes.push(data)
            })

            emitter.on('end', () => {
                log.info('stream end')

                send({ msg: 'end' })

                if (!hasErrors) cacheHandler.set(cacheKey, finalRes)

                reply.raw.end()
            })

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            emitter.on('error', (err: any) => {
                log.warn('erro recebido no stream', err)
                hasErrors = true

                if (err?.store) send({ msg: 'error', store: err?.store })
            })

            emitter.start()
        }
    )
}
