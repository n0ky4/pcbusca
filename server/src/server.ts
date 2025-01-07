import { fastifyCors } from '@fastify/cors'
import { fastifyHelmet } from '@fastify/helmet'
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
import { log } from './log'
import { routes } from './routes'

let startedAt: Date | null = null

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000
const app = fastify({
    logger: process.env.NODE_ENV === 'production',
}).withTypeProvider<ZodTypeProvider>()

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(fastifyCors, { origin: '*' })
app.register(fastifyHelmet)
app.register(fastifySwagger, {
    openapi: {
        info: {
            title: 'pcbusca-api',
            version: '1.0.0',
        },
    },
    transform: jsonSchemaTransform,
})
app.register(fastifySwaggerUi, {
    routePrefix: '/docs',
    logo: undefined, // hide fastify logo
})

app.register(routes)

app.get('/api', async () => {
    return { ok: true, startedAt }
})

app.listen({ port: PORT }).then(() => {
    startedAt = new Date()
    log.info(`server listening on port http://localhost:${PORT}`)
})

const EXIT_SIGNALS = ['SIGINT', 'SIGTERM', 'uncaughtException', 'unhandledRejection']
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
