import { getRandomUA, KABUM_BASE_URL } from '@/core/const.js'
import { KabumError } from '@/errors.js'
import { log, t, te } from '@/log.js'
import { PaginationInput, paginationSettingsSchema } from '@/types/index.js'
import { KabumResponse } from '@/types/kabum.types'
import { Item, Meta, Response } from 'shared'

const isDataValid = (data: unknown): data is KabumResponse => {
    if (
        typeof data === 'object' &&
        data != null &&
        'meta' in data &&
        'data' in data &&
        Array.isArray(data.data)
    ) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const meta = (data as any)?.meta
        const page = meta?.page
        return !!(
            meta?.total_items_count != null &&
            meta?.total_pages_count != null &&
            page?.number != null &&
            page?.size != null
        )
    }

    return false
}

const getMaxInstallments = (maxInstallment: string): number | undefined => {
    try {
        return parseInt(maxInstallment.split('x')[0])
    } catch {
        return
    }
}

const getInstallmentPrice = (maxInstallment: string): number | undefined => {
    try {
        return parseFloat(maxInstallment.split('R$')[1].replace(',', '.'))
    } catch {
        return
    }
}

/**
 * Pesquisa produtos na Kabum com paginação.
 * @param query Termo de pesquisa.
 * @param settings Configurações de paginação.
 * @returns Promise<Response>
 * @example
 * ```ts
 * const result = await kabum('rtx 3080', { page: 1, pageLimit: 10 })
 * console.log(result)
 * ```
 */
export async function kabum(query: string, settings?: PaginationInput): Promise<Response> {
    t('[kabum] total')

    const cfg = paginationSettingsSchema.parse(settings || {})
    log.info('searching kabum', { query, settings: cfg })

    t('[kabum] request')
    const encodedQuery = encodeURIComponent(query)
    const url = `${KABUM_BASE_URL}/catalog/v2/products?query=${encodedQuery}&page_size=${cfg.pageLimit}&page_number=${cfg.page}`

    log.info('requesting kabum:', url)
    const res = await fetch(url, {
        headers: {
            Accept: 'application/json, text/plain, */*',
            'Accept-Language': 'pt-BR,pt;q=0.7',
            Referer: 'https://www.kabum.com.br/',
            'Referrer-Policy': 'strict-origin-when-cross-origin',
            'User-Agent': getRandomUA(),
        },
    })

    log.info('kabum response:', res.status)

    if (res.status === 404) throw new KabumError('NOT_FOUND')
    if (!res.ok) throw new KabumError('FETCH_FAILED')

    const rawData: unknown = await res.json()
    te('[kabum] request')

    if (!isDataValid(rawData)) throw new KabumError('UNEXPECTED_RESPONSE')

    const { data, meta: ogMeta } = rawData as KabumResponse

    const meta: Meta = {
        store: 'kabum',
        query,
        items: ogMeta.total_items_count,
        pages: ogMeta.total_pages_count,
        page: ogMeta.page.number,
        pageLimit: ogMeta.page.size,
    }

    log.info('kabum meta:', meta)

    t('[kabum] products-map')
    const products = data
        .filter((x) => x?.attributes?.available === true)
        .map((x) => {
            const { id } = x
            const {
                title,
                price,
                images,
                price_with_discount,
                max_installment,
                discount_percentage,
                photos,
                stock,
            } = x.attributes

            const result: Item = {
                id: id.toString(),
                name: title,
                cash: {
                    total_price: price_with_discount,
                    discount: discount_percentage,
                },
                installment: {
                    total_price: price,
                    max_installments: max_installment
                        ? getMaxInstallments(max_installment)
                        : undefined,
                    installment_price: max_installment
                        ? getInstallmentPrice(max_installment)
                        : undefined,
                },
                stock,
                url: `https://www.kabum.com.br/produto/${id}`,
                images: {
                    default: images?.[0],
                    sm: photos?.p?.[0],
                    md: photos?.m?.[0],
                    lg: photos?.g?.[0],
                    xl: photos?.gg?.[0],
                },
            }

            return result
        })

    te('[kabum] products-map')
    te('[kabum] total')

    return {
        meta,
        products,
    }
}
