import { fastifyCors } from '@fastify/cors'
import fastifyHelmet from '@fastify/helmet'
import { fastifySwagger } from '@fastify/swagger'
import { fastifySwaggerUi } from '@fastify/swagger-ui'
import 'dotenv/config'
import { fastify } from 'fastify'
import {
    jsonSchemaTransform,
    serializerCompiler,
    validatorCompiler,
    ZodTypeProvider,
} from 'fastify-type-provider-zod'
import { finalize } from './core/puppeteer'
import { setupQuotaCron } from './core/quota'
import { log } from './log'
import { setupRateLimit } from './ratelimit'
import { routes } from './routes'
import { FastifyTypedInstance } from './types/fastify.types'

let startedAt: Date | null = null

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000

let app: FastifyTypedInstance | null = null

async function main() {
    log.info('setting up fastify instance')
    app = await fastify({
        logger: true,
    }).withTypeProvider<ZodTypeProvider>()

    log.info('setting up cron jobs')
    setupQuotaCron()

    log.info('setting up validators')
    await app.setValidatorCompiler(validatorCompiler)
    log.info('setting up serializers')
    await app.setSerializerCompiler(serializerCompiler)

    log.info('setting up rate limit')
    await setupRateLimit(app)

    log.info('setting up helmet')
    await app.register(fastifyHelmet)

    log.info('setting up cors')
    await app.register(fastifyCors, { origin: '*' })

    log.info('setting up swagger')
    await app.register(fastifySwagger, {
        openapi: {
            info: {
                title: 'pcbusca-api',
                version: '1.0.0',
            },
        },
        transform: jsonSchemaTransform,
    })
    log.info('setting up swagger ui')
    await app.register(fastifySwaggerUi, {
        routePrefix: '/docs',
        logo: undefined, // hide fastify logo
    })

    log.info('setting up routes')
    await app.register(routes)

    log.info('setting up root route')
    app.get('/', async () => {
        return { ok: true, startedAt }
    })

    log.info('starting server on port', PORT)

    app.listen({ port: PORT })
        .then(() => {
            startedAt = new Date()
            log.info(`server listening on port http://localhost:${PORT}`)
        })
        .catch((err) => {
            log.error('error starting server', err)
        })
}

const EXIT_SIGNALS = ['SIGINT', 'SIGTERM']
let shuttingDown = false

EXIT_SIGNALS.forEach((signal) => {
    process.on(signal, async () => {
        if (shuttingDown) return

        shuttingDown = true
        log.info(`received ${signal}, shutting down`)

        await finalize()
        await app?.close()
        process.exit(0)
    })
})

main()
