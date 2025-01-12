import { DEFAULT_PAGE_LIMIT } from '@/core/const'
import { storeSchema } from 'shared'
import { z } from 'zod'

export type PaginationInput = z.input<typeof paginationSettingsSchema>
export type PaginationSettings = z.infer<typeof paginationSettingsSchema>
export type SearchAllSettingsInput = z.input<typeof searchAllSettingsSchema>
export type SearchSettings = z.input<typeof settingsSchema>

export const paginationSettingsSchema = z.object({
    page: z.number().int().min(1).default(1),
    pageLimit: z.number().int().min(1).default(DEFAULT_PAGE_LIMIT),
})

export const searchAllSettingsSchema = z.object({
    page: z.number().int().min(1).default(1),
    stores: z.array(storeSchema).min(1).default(['kabum', 'pichau', 'terabyte']),
})

export const settingsSchema = z.object({
    store: storeSchema,
    query: z.string().min(3),
    page: z.number().int().default(1),
})
