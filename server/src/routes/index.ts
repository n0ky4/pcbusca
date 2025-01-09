import { searchAll, searchEmitter } from '@/core/search.js'
import { streamSimulator } from '@/example'
import { log } from '@/log'
import {
    SearchResult,
    searchResultSchema,
    storeSchema,
    type FastifyTypedInstance,
} from '@/types/index.js'
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
                    stores: z.array(storeSchema).default(['kabum', 'pichau', 'terabyte']),
                }),
                response: {
                    200: z.string().describe('Stream of search results'),
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

            emitter.on('start', () => {
                reply.raw.write(JSON.stringify({ msg: 'start' }) + separator)
            })

            emitter.on('data', (data: SearchResult) => {
                reply.raw.write(JSON.stringify(data) + separator)
            })

            emitter.on('end', () => {
                log.info('stream end')
                reply.raw.write(JSON.stringify({ msg: 'end' }) + separator)
                reply.raw.end()
            })

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            emitter.on('error', (err: any) => {
                if (err?.name === 'NOT_FOUND') return

                log.error('stream error')
                console.error(err)
            })

            emitter.start()
        }
    )
}
