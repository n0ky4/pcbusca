'use client'
import { SavedSearchHandler } from '@/lib/storage'
import { createContext, useContext } from 'react'
import { z } from 'zod'

export const savedSearchSchema = z.object({
    id: z.string(),
    query: z.string(),
})
export type SavedSearch = z.infer<typeof savedSearchSchema>

export const settingsSchema = z.object({
    savedSearches: z.array(savedSearchSchema),
    pageLimit: z.number(),
    rankingSize: z.number(),
    stores: z.array(z.union([z.literal('kabum'), z.literal('pichau'), z.literal('terabyte')])),
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
}

export const SettingsContext = createContext<SettingsContextType>({
    settings: defaultSettings,
    setSettings: () => {},
    savedSearch: { get: () => [], add: () => [], remove: () => [] },
})

export function useSettings() {
    return useContext(SettingsContext)
}
