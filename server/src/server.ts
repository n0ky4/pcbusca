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

let startedAt: Date | null = null

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000

const app = fastify({
    logger: true,
}).withTypeProvider<ZodTypeProvider>()

async function main() {
    setupQuotaCron()

    await app.setValidatorCompiler(validatorCompiler)
    await app.setSerializerCompiler(serializerCompiler)

    await setupRateLimit(app)

    await app.register(fastifyHelmet)
    await app.register(fastifyCors, { origin: '*' })

    await app.register(fastifySwagger, {
        openapi: {
            info: {
                title: 'pcbusca-api',
                version: '1.0.0',
            },
        },
        transform: jsonSchemaTransform,
    })
    await app.register(fastifySwaggerUi, {
        routePrefix: '/docs',
        logo: undefined, // hide fastify logo
    })

    await app.register(routes)

    app.get('/', async () => {
        return { ok: true, startedAt }
    })

    app.listen({ port: PORT }).then(() => {
        startedAt = new Date()
        log.info(`server listening on port http://localhost:${PORT}`)
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
        await app.close()
        process.exit(0)
    })
})

main()
