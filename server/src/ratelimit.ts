import fastifyRateLimit, { RateLimitPluginOptions } from '@fastify/rate-limit'
import { log } from './log'
import { FastifyTypedInstance } from './types/fastify.types'

const rateLimit: {
    enabled: boolean
    settings: RateLimitPluginOptions
} = {
    enabled: process.env.DISABLE_RATE_LIMIT !== 'true',
    settings: {
        max: parseInt(process.env.RATE_LIMIT_MAX || '20'),
        timeWindow: '1 minute',
        addHeaders: {
            'x-ratelimit-limit': true,
            'x-ratelimit-remaining': false,
            'x-ratelimit-reset': false,
            'retry-after': false,
        },
        addHeadersOnExceeding: {
            'x-ratelimit-limit': true,
            'x-ratelimit-remaining': false,
            'x-ratelimit-reset': false,
        },
        errorResponseBuilder: () => {
            return {
                code: 'RATE_LIMIT',
                msg: 'error',
            }
        },
    },
}

export async function setupRateLimit(app: FastifyTypedInstance) {
    if (rateLimit.enabled) {
        log.info('rate limit enabled', {
            max: rateLimit.settings.max,
            timeWindow: rateLimit.settings.timeWindow,
        })
        await app.register(fastifyRateLimit, rateLimit.settings)

        await app.setNotFoundHandler(
            {
                preHandler: app.rateLimit(),
            },
            (_, reply) => {
                reply.code(404).send({ message: 'Route not found' })
            }
        )
    }
}
