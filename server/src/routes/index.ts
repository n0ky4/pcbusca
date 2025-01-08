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

    app.get('/foobar', (req, reply) => {
        console.log(reply.getHeaders())
        reply.send({ ok: true })
    })

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

            const emitter = req.body.test
                ? streamSimulator()
                : searchEmitter(req.body.query, { stores: req.body.stores })

            emitter.on('start', () => {
                // reply.send(JSON.stringify({ msg: 'start' }) + '\n')
                reply.raw.write(JSON.stringify({ msg: 'start' }) + '\n')
            })

            emitter.on('data', (data: SearchResult) => {
                // reply.send(JSON.stringify(data) + '\n')
                reply.raw.write(JSON.stringify(data) + '\n')
            })

            emitter.on('end', () => {
                // reply.send(JSON.stringify({ msg: 'end' }) + '\n')
                // reply.raw.end()
                reply.raw.write(JSON.stringify({ msg: 'end' }) + '\n')
                reply.raw.end()
            })

            emitter.on('error', (err) => {
                log.error('stream error')
                console.error(err)

                reply.raw.write(JSON.stringify({ msg: 'error' }) + '\n')
                reply.raw.end()
            })

            emitter.start()
        }
    )
}
