'use client'
import { HistoryHandler } from '@/lib/storage/history'
import { SavedSearchHandler } from '@/lib/storage/savedSearch'
import { createContext, useContext } from 'react'
import { storeSchema } from 'shared'
import { z } from 'zod'

export const idItemSchema = z.object({
    id: z.string(),
    entry: z.string(),
})
export type IdItem = z.infer<typeof idItemSchema>

export const settingsSchema = z.object({
    pageLimit: z.number().default(10),
    rankingSize: z.number().default(10),
    stores: z.array(storeSchema).default(['kabum', 'pichau', 'terabyte']),
    savedSearches: z.array(idItemSchema).default([]),
    history: z.array(idItemSchema).default([]),
    keepHistory: z.boolean().default(true),
})
export type Settings = z.infer<typeof settingsSchema>

export interface SettingsContextType {
    settings: Settings
    setSettings: (settings: Settings) => void
    savedSearch: SavedSearchHandler
    history: HistoryHandler
}

export const defaultSettings: Settings = {
    savedSearches: [],
    pageLimit: 10,
    rankingSize: 10,
    stores: ['kabum', 'pichau', 'terabyte'],
    history: [],
    keepHistory: true,
}

const handlerPlaceholder = { get: () => [], add: () => [], remove: () => [] }
export const SettingsContext = createContext<SettingsContextType>({
    settings: defaultSettings,
    setSettings: () => {},
    savedSearch: handlerPlaceholder,
    history: { ...handlerPlaceholder, clear: () => [] },
})

export function useSettings() {
    return useContext(SettingsContext)
}
