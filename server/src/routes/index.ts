import { searchAll, searchEmitter } from '@/core/search.js'
import {
    SearchResult,
    searchResultSchema,
    storeSchema,
    type FastifyTypedInstance,
} from '@/types/index.js'
import { z } from 'zod'

export async function routes(app: FastifyTypedInstance) {
    app.post(
        '/api/products/search',
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
        '/api/products/stream-search',
        {
            schema: {
                tags: ['products'],
                description: 'Stream search for products',
                body: z.object({
                    query: z.string().max(100).min(3),
                    stores: z.array(storeSchema).default(['kabum', 'pichau', 'terabyte']),
                }),
                response: {
                    200: z.string().describe('Stream of search results'),
                },
            },
        },
        async (req, reply) => {
            const emitter = searchEmitter(req.body.query, { stores: req.body.stores })
            let ended = false

            emitter.on('start', () => {
                reply.raw.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' })
                reply.raw.write(JSON.stringify({ msg: 'start' }) + '\n')
            })

            emitter.on('data', (data: SearchResult) => {
                if (ended) return
                reply.raw.write(JSON.stringify(data) + '\n')
            })

            emitter.on('end', () => {
                if (ended) return
                ended = true
                reply.raw.write(JSON.stringify({ msg: 'end' }) + '\n')
                reply.raw.end()
            })

            emitter.on('error', (err) => {
                if (ended) return
                ended = true
                console.error(err)
                reply.raw.write(JSON.stringify({ msg: 'error', error: err.message }) + '\n')
                reply.raw.end()
            })

            emitter.start()
        }
    )
}
