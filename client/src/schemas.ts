import { z } from 'zod'

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
export type Item = z.infer<typeof itemSchema>

export const storeSchema = z.union([
    z.literal('kabum'),
    z.literal('pichau'),
    z.literal('terabyte'),
    // z.literal('amazon'),
    // z.literal('mercadolivre'),
])
export type Store = z.infer<typeof storeSchema>

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

export const searchResultSchema = z.object({
    store: storeSchema,
    data: responseSchema.nullable(),
})
export type SearchResult = z.infer<typeof searchResultSchema>
