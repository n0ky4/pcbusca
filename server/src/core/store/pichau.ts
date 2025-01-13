import { PICHAU_BASE_URL } from '@/core/const.js'
import { browserPool } from '@/core/puppeteer.js'
import { PichauError } from '@/errors.js'
import { log } from '@/log.js'
import { PaginationInput, paginationSettingsSchema } from '@/types/index.js'
import { PichauItem, PichauResponse } from '@/types/pichau.types'
import { Item, Meta } from 'shared'

const PICHAU_PAYLOAD = `
query category($id: Int!, $pageSize: Int!, $onServer: Boolean!, $currentPage: Int!) {
  category(id: $id) {
    id
    description
    name
    product_count
    url_key
    search_filters_order
    breadcrumbs {
      category_id
      category_name
      category_level
      category_url_key
      __typename
    }
    pichau_faq {
      answer
      question
      __typename
    }
    meta_title @include(if: $onServer)
    meta_keywords @include(if: $onServer)
    meta_description @include(if: $onServer)
    __typename
  }
  products(
    pageSize: $pageSize
    currentPage: $currentPage
    search: "{{QUERY}}"
    filter: {category_id: {eq: "2"}, hide_from_search: {eq: "0"}}
    sort: {relevance: DESC}
  ) {
    aggregations {
      count
      label
      attribute_code
      options {
        count
        label
        value
        __typename
      }
      __typename
    }
    items {
      id
      sku
      url_key
      name
      socket
      hide_from_search
      is_openbox
      openbox_state
      openbox_condition
      tipo_de_memoria
      caracteristicas
      distribution_center_name
      slots_memoria
      marcas
      marcas_info {
        name
        __typename
      }
      product_page_layout
      formato_placa
      plataforma
      portas_sata
      slot_cooler_120
      slot_cooler_80
      slot_cooler_140
      slot_cooler_200
      coolerbox_included
      potencia
      quantidade_pacote
      alerta_monteseupc
      vgaintegrado
      product_set_name
      categories {
        name
        url_path
        path
        __typename
      }
      special_price
      pichau_prices {
        avista
        avista_discount
        avista_method
        base_price
        final_price
        max_installments
        min_installment_price
        __typename
      }
      price_range {
        __typename
      }
      description {
        html
        __typename
      }
      garantia
      informacoes_adicionais
      image {
        url
        url_listing
        path
        label
        __typename
      }
      media_gallery {
        url
        path
        label
        position
        __typename
      }
      short_description {
        html
        __typename
      }
      amasty_label {
        name
        product_labels {
          image
          position
          size
          label
          label_color
          __typename
        }
        category_labels {
          image
          position
          size
          label
          label_color
          __typename
        }
        __typename
      }
      reviews {
        rating
        count
        __typename
      }
      mysales_promotion {
        expire_at
        price_discount
        price_promotional
        promotion_name
        promotion_url
        qty_available
        qty_sold
        __typename
      }
      only_x_left_in_stock
      stock_status
      codigo_barra
      codigo_ncm
      meta_title @include(if: $onServer)
      meta_keyword @include(if: $onServer)
      meta_description @include(if: $onServer)
      __typename
    }
    page_info {
      total_pages
      current_page
      __typename
    }
    total_count
    __typename
  }
  banners: rbsliderBanner(area: CATEGORY, categoryId: 2) {
    id
    name
    position
    page_type
    display_arrows
    display_bullets
    sliders {
      id
      url
      is_add_nofollow_to_url
      is_open_url_in_new_window
      status
      display_to
      display_from
      img_url_final
      mobile_url_final
      img_alt
      img_url
      img_type
      img_title
      __typename
    }
    __typename
  }
}
`.trim()

const formatParams = (params: object) => {
    return Object.entries(params)
        .map(([key, value]) => {
            if (typeof value === 'object') value = JSON.stringify(value)
            return `${key}=${encodeURIComponent(value)}`
        })
        .join('&')
}

const formatProducts = (items: PichauItem[]): Item[] => {
    return items
        .filter((x) => x.stock_status === 'IN_STOCK')
        .map((x) => {
            const { sku, name, url_key, image, pichau_prices } = x

            const result: Item = {
                id: sku,
                name,
                url: `https://www.pichau.com.br/${url_key}`,
                images: {
                    default: image.url,
                    sm: image.url_listing,
                },
                cash: {
                    total_price: pichau_prices.avista,
                    discount: pichau_prices.avista_discount,
                },
                installment: {
                    total_price: pichau_prices.final_price,
                    max_installments: pichau_prices.max_installments,
                    installment_price: pichau_prices.min_installment_price,
                },
            }

            return result
        })
}

const isDataValid = (checkData: unknown): checkData is PichauResponse => {
    if (typeof checkData === 'object' && checkData != null && 'data' in checkData) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const data = (checkData as any)?.data
        const products = data?.products
        return !!(
            products?.page_info?.current_page != null &&
            products?.page_info?.total_pages != null &&
            products?.total_count != null
        )
    }

    return false

    // return !!(
    //     data?.products?.items?.length &&
    //     data?.products?.page_info?.current_page != null &&
    //     data?.products?.page_info?.total_pages != null &&
    //     data?.products?.total_count != null
    // )
}

// /**
//  * Pesquisa simples, limitada a 10 resultados sem paginação. (Fetch API)
//  * @param query Termo de pesquisa
//  * @returns Promise<Response>
//  * @example
//  * ```ts
//  * const result = await pichau_simple('rtx 3080')
//  * console.log(result)
//  * ```
//  * @deprecated
//  */
// export async function pichau_simple(query: string): Promise<Response> {
//     log.info('searching pichau:', query)

//     const searchParams = formatParams({
//         query: PICHAU_SIMPLE_PAYLOAD,
//         operationName: 'search',
//         variables: { search: query },
//     })
//     const url = PICHAU_BASE_URL + '?' + searchParams

//     const headers = {
//         accept: '*/*',
//         'accept-language': 'pt-BR,pt;q=0.6',
//         authorization: '',
//         'content-type': 'application/json',
//         priority: 'u=1, i',
//         vendor: 'Pichau',
//         Referer: `https://www.pichau.com.br/search?q=${encodeURIComponent(query)}`,
//         'Referrer-Policy': 'strict-origin-when-cross-origin',
//     }

//     const res = await fetch(`${url}?${searchParams}`, {
//         headers,
//         method: 'GET',
//     })

//     log.info('pichau response:', res.status)
//     if (!res.ok) throw new PichauError('FETCH_FAILED')

//     const rawData = await res.json()
//     const data = rawData?.data

//     if (!isDataValid(data)) throw new PichauError('UNEXPECTED_RESPONSE')

//     const meta: Meta = {
//         store: 'pichau',
//         query,
//         items: data.products.total_count,
//         page: data.products.page_info.current_page,
//         pages: data.products.page_info.total_pages,
//         pageLimit: data.products.items.length,
//     }

//     const products = formatProducts(data.products.items)

//     return {
//         meta,
//         products,
//     }
// }

/**
 * Pesquisa avançada, com paginação e mais detalhes. (Puppeteer)
 * @param query Termo de pesquisa
 * @param settings Configurações de paginação
 * @returns Promise<Response>
 * @example
 * ```ts
 * const result = await pichau('rtx 3080', { page: 3, pageLimit: 5 })
 * console.log(result)
 * ```
 */
export async function pichau(query: string, settings?: PaginationInput) {
    const { page, pageLimit } = paginationSettingsSchema.parse(settings || {})
    log.info(`[pichau] searching for "${query}"`, { page, pageLimit })

    const searchParams = formatParams({
        query: PICHAU_PAYLOAD.replaceAll('{{QUERY}}', query),
        operationName: 'category',
        variables: {
            id: 2,
            pageSize: pageLimit,
            currentPage: page,
            idString: 2,
            facetsMainCategoryId: 2,
            onServer: true,
            q: query,
        },
    })

    const url = PICHAU_BASE_URL + '?' + searchParams

    log.info('[pichau] opening browser')
    const browser = await browserPool.acquire()
    const pg = await browser.newPage()

    const close = async () => {
        log.info('[pichau] closing browser')

        await pg.close()
        await browserPool.release(browser)
    }

    log.info('[pichau] fetching url')
    await pg.goto(url, { waitUntil: 'domcontentloaded' })

    log.info('[pichau] evaluating page')
    let preElement = await pg.$('pre')
    let rawJson = await pg.evaluate((el) => el?.textContent, preElement)

    if (!rawJson) {
        log.error('[pichau] rawJson is null')

        const pageContent = await pg.content()
        log.error('[pichau] pageContent', { pageContent })

        await close()

        throw new PichauError('UNEXPECTED_RESPONSE')
    }

    await close()

    log.info('parsing pichau response')

    const parsedData: unknown = JSON.parse(rawJson)
    if (!isDataValid(parsedData)) {
        log.error('[pichau] returning UNEXPECTED_RESPONSE', { parsedData })
        throw new PichauError('UNEXPECTED_RESPONSE')
    }

    const { data } = parsedData as PichauResponse
    preElement = null
    rawJson = null

    if (!data?.products?.items?.length) {
        log.warn('[pichau] returning NOT_FOUND')
        throw new PichauError('NOT_FOUND')
    }

    const meta: Meta = {
        store: 'pichau',
        query,
        items: data.products.total_count,
        page: data.products.page_info.current_page,
        pages: data.products.page_info.total_pages,
        pageLimit: data.products.items.length,
    }
    log.info('[pichau] meta', meta)

    const products = formatProducts(data.products.items)

    return {
        meta,
        products,
    }
}
