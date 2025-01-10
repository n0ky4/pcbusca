import { browserPool } from '@/core/puppeteer.js'
import { TerabyteError } from '@/errors.js'
import { log, t, te } from '@/log.js'
import * as cheerio from 'cheerio'
import { Item, Meta, Response } from 'shared'
import { DEFAULT_PAGE_LIMIT } from './../const'

const requestMaker = (query: string, page: number) => {
    return {
        url: `https://www.terabyteshop.com.br/busca?str=${query}`,
        headers: {
            Accept: '*/*',
            'Accept-Language': 'pt-BR,pt;q=0.5',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            Priority: 'u=1, i',
            'X-Requested-With': 'XMLHttpRequest',
            'Referrer-Policy': 'strict-origin-when-cross-origin',
            Referer: `https://www.terabyteshop.com.br/busca?str=${query}`,
        },
        body: `app=true&url=%2Fbusca%3Fstr%3D${encodeURIComponent(
            query
        )}&more=true&filter%5Bmarca%5D=0&filter%5Border%5D=ordem_asc&filter%5Bpg%5D=${page}&filter%5Bstr%5D=${encodeURIComponent(
            query
        )}`,
        method: 'POST',
    }
}

const extractPrice = (input: string): number | null => {
    // regex para encontrar o preço
    const regex = /R\$\s*([\d.]+),(\d{2})/
    const match = input.match(regex)
    // se não encontrar, retorna null
    if (!match) return null
    // extrair parte inteira e decimal
    const mainPart = match[1].replace(/\./g, '')
    const decimalPart = match[2]
    // juntar as partes e retornar (arredondado para 2 casas decimais)
    return Math.round(parseFloat(`${mainPart}.${decimalPart}`) * 100) / 100
}

/**
 * Busca produtos no site da TerabyteShop
 * @param query Termo de busca
 * @param page Página da busca
 * @returns Promise<Response>
 * @throws TerabyteError
 * @example
 * ```typescript
 * const response = await terabyte('rtx 3060')
 * console.log(response)
 * ```
 */
export async function terabyte(query: string, page?: number): Promise<Response> {
    if (page && page < 1) throw new TerabyteError('INVALID_PAGE')
    const realPage = page || 1

    t('[terabyte] total')

    log.info('searching terabyte', { query, page: realPage })

    t('[terabyte] open-browser')
    const browser = await browserPool.acquire()
    const pg = await browser.newPage()
    te('[terabyte] open-browser')

    const close = async () => {
        t('[terabyte] close-browser')
        await pg.close()
        await browserPool.release(browser)
        te('[terabyte] close-browser')
    }

    t('[terabyte] goto')

    log.info('opening terabyte')
    await pg.goto('view-source:https://www.terabyteshop.com.br/site/formas-de-pagamento-aceitas')

    te('[terabyte] goto')

    t('[terabyte] request')
    log.info('making terabyte request')

    const rawData = await pg.evaluate(async (reqData) => {
        const req = await fetch(reqData.url, {
            method: reqData.method,
            headers: reqData.headers,
            body: reqData.body,
        })
        const data = await req.json()
        return data
    }, requestMaker(query, realPage))

    te('[terabyte] request')

    if (!rawData || !rawData?.more) {
        await close()
        throw new TerabyteError('UNEXPECTED_RESPONSE')
    }
    await close()

    const data = rawData.more
    if (data.includes('Nenhum produto encontrado.')) throw new TerabyteError('NOT_FOUND')

    t('[terabyte] html-parse')
    log.info('parsing terabyte html data')
    const $ = cheerio.load(data)
    te('[terabyte] html-parse')

    t('[terabyte] products-map')
    const products = $('.product-item')
        .map((_, el) => {
            const $el = $(el)

            const nameEl = $el.find('.product-item__name')
            if (!nameEl) return null

            const name = nameEl.attr('title')
            const url = nameEl.attr('href')

            if (!name || !url) return null

            const id = url.split('produto/')[1].split('/')[0]
            if (!id) return null

            const priceText = $el.find('.product-item__new-price').text()
            const installmentText = $el.find('.product-item__juros').text()

            if (!priceText || !installmentText) return null
            const price = extractPrice(priceText)
            const installmentPrice = extractPrice(installmentText)

            if (!price || !installmentPrice) return null

            const maxInstallmentsText = installmentText.match(/(\d+)x/i)?.[1]
            if (!maxInstallmentsText) return null

            const max_installments = parseInt(maxInstallmentsText)
            const total_installment = Math.round(installmentPrice * max_installments * 100) / 100

            const discount = Math.round(((total_installment - price) / total_installment) * 100)

            const img = $el.find('.image-thumbnail').attr('src') as string

            const data: Item = {
                id,
                name,
                cash: {
                    discount,
                    total_price: price,
                },
                installment: {
                    installment_price: installmentPrice,
                    max_installments,
                    total_price: total_installment,
                },
                url,
                images: {
                    default: img,
                },
            }

            return data
        })
        .get()
        .filter((x) => x !== null)

    te('[terabyte] products-map')

    if (products.length === 0) throw new TerabyteError('NOT_FOUND')

    const meta: Meta = {
        store: 'terabyte',
        query,
        page: realPage,
        pages: null,
        pageLimit: null,
        items: products.length,
    }
    log.info('terabyte meta:', meta)

    te('[terabyte] total')

    return {
        meta,
        products: products.slice(0, DEFAULT_PAGE_LIMIT),
    }
}
