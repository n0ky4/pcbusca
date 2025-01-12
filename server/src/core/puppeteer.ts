import { log } from '@/log.js'
import genericPool from 'generic-pool'
import puppeteer from 'puppeteer-extra'
import AdBlocker from 'puppeteer-extra-plugin-adblocker'
import AnonymizeUA from 'puppeteer-extra-plugin-anonymize-ua'
import StealthPlugin from 'puppeteer-extra-plugin-stealth'

puppeteer.use(StealthPlugin())
puppeteer.use(AdBlocker({ blockTrackers: true }))
puppeteer.use(AnonymizeUA())

const getPoolSettings = () => {
    const min = process.env.POOL_MIN_BROWSERS
    const max = process.env.POOL_MAX_BROWSERS
    return {
        min: min ? parseInt(min) : 2,
        max: max ? parseInt(max) : 5,
    }
}


export const browserPool = genericPool.createPool(
    {
        create: async () => {
            log.info('creating new browser', { poolSize: browserPool.size })
            try {
                const browser = await puppeteer.launch({
                    headless: true,
                    args: ['--no-sandbox', '--disable-setuid-sandbox'],
                })
                return browser
            } catch (err) {
                log.error('error creating browser', err)
                process.exit(1)
            }
        },
        destroy: async (browser) => {
            log.info('destroying browser', { poolSize: browserPool.size })
            await browser.close()
        },
    },
    getPoolSettings()
)

log.info('pool', getPoolSettings(), { poolSize: browserPool.size })

export async function finalize() {
    await browserPool.drain()
    await browserPool.clear()
}

