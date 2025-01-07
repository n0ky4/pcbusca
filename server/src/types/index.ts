import type {
    FastifyBaseLogger,
    FastifyInstance,
    RawReplyDefaultExpression,
    RawRequestDefaultExpression,
    RawServerDefault,
} from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { DEFAULT_PAGE_LIMIT } from '../core/const'

export type FastifyTypedInstance = FastifyInstance<
    RawServerDefault,
    RawRequestDefaultExpression,
    RawReplyDefaultExpression,
    FastifyBaseLogger,
    ZodTypeProvider
>
export type SearchResult = z.infer<typeof searchResultSchema>
export type Meta = z.infer<typeof metaSchema>
export type Response = z.infer<typeof responseSchema>
export type PaginationInput = z.input<typeof paginationSettingsSchema>
export type SearchAllSettingsInput = z.input<typeof searchAllSettingsSchema>
export type Store = z.infer<typeof storeSchema>
export type SearchSettings = z.input<typeof settingsSchema>
export type SearchItem = z.infer<typeof searchItemSchema>
export type PaginationSettings = z.infer<typeof paginationSettingsSchema>
export type Item = z.infer<typeof itemSchema>

export const storeSchema = z.union([
    z.literal('kabum'),
    z.literal('pichau'),
    z.literal('terabyte'),
    // z.literal('amazon'),
    // z.literal('mercadolivre'),
])

export const settingsSchema = z.object({
    store: storeSchema,
    query: z.string().min(3),
    page: z.number().int().default(1),
})

export const searchItemSchema = z.object({
    name: z.string(),
    installment_price: z.number(),
    cash_price: z.number(),
    link: z.string(),
    image: z.string(),
})

export const paginationSettingsSchema = z.object({
    page: z.number().int().min(1).default(1),
    pageLimit: z.number().int().min(1).default(DEFAULT_PAGE_LIMIT),
})

export const itemSchema = z.object({
    id: z.string(),
    name: z.string(),
    cash: z.object({
        total_price: z.number(),
        discount: z.number(),
    }),
    installment: z.object({
        total_price: z.number(),
        max_installments: z.number(),
        installment_price: z.number(),
    }),
    stock: z.number().optional(),
    url: z.string(),
    images: z.object({
        default: z.string(),
        sm: z.string().optional(),
        md: z.string().optional(),
        lg: z.string().optional(),
        xl: z.string().optional(),
    }),
})

export const metaSchema = z.object({
    store: storeSchema,
    query: z.string(),
    items: z.number(),
    page: z.number(),
    pages: z.number().nullable(),
    pageLimit: z.number().nullable(),
})

export const responseSchema = z.object({
    meta: metaSchema,
    products: z.array(itemSchema),
})

export const searchAllSettingsSchema = z.object({
    page: z.number().int().min(1).default(1),
    stores: z.array(storeSchema).min(1).default(['kabum', 'pichau', 'terabyte']),
})

export const searchResultSchema = z.object({
    store: storeSchema,
    data: responseSchema.nullable(),
})
