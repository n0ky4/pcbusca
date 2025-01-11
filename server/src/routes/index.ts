import { searchAll, searchEmitter } from '@/core/search.js'
import { streamSimulator } from '@/example'
import { log } from '@/log'
import type { FastifyTypedInstance } from '@/types/fastify.types'
import { SearchResult, searchResultSchema, storeSchema } from 'shared'
import { z } from 'zod'

export async function routes(app: FastifyTypedInstance) {
    app.post(
        '/products/search',
        {
            schema: {
                tags: ['products'],
                description: 'Search for products',
                body: z.object({
                    query: z.string().max(100).min(3),
                    page: z.number().int().min(1).default(1),
                    stores: z.array(storeSchema).default(['kabum', 'pichau', 'terabyte']),
                }),
                response: {
                    200: searchResultSchema.array(),
                },
            },
        },
        async ({ body: { query, page, stores } }) => {
            const results = await searchAll(query, { page, stores })
            return results
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
                    query: z.string().max(100).min(3),
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

            const separator = '␀'
            const emitter = req.body.test
                ? streamSimulator()
                : searchEmitter(req.body.query, { stores: req.body.stores })

            const send = (data: object) => {
                reply.raw.write(JSON.stringify(data) + separator)
            }

            emitter.on('start', () => {
                send({ msg: 'start' })
            })

            emitter.on('data', (data: SearchResult) => {
                send(data)
            })

            emitter.on('end', () => {
                log.info('stream end')

                send({ msg: 'end' })
                reply.raw.end()
            })

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            emitter.on('error', (err: any) => {
                log.warn('erro recebido no stream', err)

                if (err?.store) send({ msg: 'error', store: err?.store })
            })

            emitter.start()
        }
    )
}
