import { log } from '@/log'
import cron from 'node-cron'

const QUOTA_MAP = new Map<string, number>()
const QUOTA_LIMIT = parseInt(process.env.QUOTA_LIMIT ?? '50')

const CRON = '0 0 * * *' // every day at midnight

const getQuota = (key: string) => {
    if (!QUOTA_MAP.has(key)) QUOTA_MAP.set(key, 0)
    if (QUOTA_MAP.get(key) == null) return Infinity

    log.info(`quota for ${key}: ${QUOTA_MAP.get(key)}`)

    return QUOTA_MAP.get(key) as number
}

export const quota = {
    check: (key: string) => {
        const get = getQuota(key)
        log.info(`checking quota for ${key}: ${get}`, get < QUOTA_LIMIT)
        return get < QUOTA_LIMIT
    },
    increment: (key: string) => {
        const get = getQuota(key)
        log.info(`incrementing quota for ${key}: ${get + 1}`)
        QUOTA_MAP.set(key, get + 1)
    },
    resetAll: () => {
        QUOTA_MAP.clear()
    },
}

export function setupQuotaCron() {
    log.info('setting up quota cron')
    cron.schedule(CRON, () => {
        log.info('resetting quota')
        quota.resetAll()
    })
}
