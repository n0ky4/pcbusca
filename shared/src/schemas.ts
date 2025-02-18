import { z } from 'zod'

export type Meta = z.infer<typeof metaSchema>
export type Response = z.infer<typeof responseSchema>
export type Store = z.infer<typeof storeSchema>
export type Item = z.infer<typeof itemSchema>
export type SearchResult = z.infer<typeof searchResultSchema>

export const storeSchema = z.union([
    z.literal('kabum'),
    z.literal('pichau'),
    z.literal('terabyte'),
    // z.literal('amazon'),
    // z.literal('mercadolivre'),
])

export const ALL_STORES = storeSchema.options.map((option) => {
    if (option instanceof z.ZodLiteral) return option.value
    throw new Error('Schema contains non-literal types.')
})

export const itemSchema = z.object({
    id: z.string(),
    name: z.string(),
    cash: z.object({
        total_price: z.number(),
        discount: z.number(),
    }),
    installment: z
        .object({
            total_price: z.number().optional(),
            max_installments: z.number().optional(),
            installment_price: z.number().optional(),
        })
        .optional(),
    stock: z.number().optional(),
    url: z.string(),
    images: z
        .object({
            default: z.string().optional(),
            sm: z.string().optional(),
            md: z.string().optional(),
            lg: z.string().optional(),
            xl: z.string().optional(),
        })
        .optional(),
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

export const searchResultSchema = z.object({
    store: storeSchema,
    data: responseSchema.nullable(),
})
