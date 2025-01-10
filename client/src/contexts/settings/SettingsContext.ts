'use client'
import { SavedSearchHandler } from '@/lib/storage'
import { createContext, useContext } from 'react'
import { storeSchema } from 'shared'
import { z } from 'zod'

export const savedSearchSchema = z.object({
    id: z.string(),
    query: z.string(),
})
export type SavedSearch = z.infer<typeof savedSearchSchema>

export const settingsSchema = z.object({
    savedSearches: z.array(savedSearchSchema).default([]),
    pageLimit: z.number().default(10),
    rankingSize: z.number().default(10),
    stores: z.array(storeSchema).default(['kabum', 'pichau', 'terabyte']),
    history: z.array(z.string()).default([]),
    historyEnabled: z.boolean().default(true),
})
export type Settings = z.infer<typeof settingsSchema>

export interface SettingsContextType {
    settings: Settings
    setSettings: (settings: Settings) => void
    savedSearch: SavedSearchHandler
}

export const defaultSettings: Settings = {
    savedSearches: [],
    pageLimit: 10,
    rankingSize: 10,
    stores: ['kabum', 'pichau', 'terabyte'],
    history: [],
    historyEnabled: true,
}

export const SettingsContext = createContext<SettingsContextType>({
    settings: defaultSettings,
    setSettings: () => {},
    savedSearch: { get: () => [], add: () => [], remove: () => [] },
})

export function useSettings() {
    return useContext(SettingsContext)
}
