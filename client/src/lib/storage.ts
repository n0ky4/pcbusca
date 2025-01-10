import {
    defaultSettings,
    SavedSearch,
    Settings,
    settingsSchema,
} from '@/contexts/settings/SettingsContext'

export const SETTINGS_KEY = 'hatsunemiku'

export const isSearchValid = (search: string) => {
    const fmt = search.trim()
    if (!fmt || fmt.length < 3) return false
    return fmt
}

export function createSavedSearchStorage(
    settings: Settings,
    setSettings: (settings: Settings) => void
) {
    const get: () => SavedSearch[] = () => {
        // const saved = localStorage.getItem(SAVED_SEARCHES_KEY)
        // if (!saved) return []
        // return JSON.parse(saved)
        return settings.savedSearches
    }

    const add: (search: string) => SavedSearch[] = (search) => {
        const saved = get()
        if (saved.length >= 5) saved.shift()
        const fmt = isSearchValid(search)
        if (!fmt || saved.some((s) => s.query === fmt)) return saved
        saved.push({
            id: Math.random().toString(16).slice(2, 9), // random hex string
            query: fmt,
        })

        setSettings({ ...settings, savedSearches: saved })
        // localStorage.setItem(SAVED_SEARCHES_KEY, JSON.stringify(saved))
        return saved
    }

    const remove: (id: string) => SavedSearch[] = (id) => {
        const saved = get()
        const filtered = saved.filter((s) => s.id !== id)

        setSettings({ ...settings, savedSearches: filtered })

        return filtered
    }

    return { get, add, remove }
}
export type SavedSearchHandler = ReturnType<typeof createSavedSearchStorage>

export function setSettingsToStorage(settings: Settings) {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings))
}

export function getSettingsFromStorage(): Settings {
    const savedSettings = localStorage.getItem(SETTINGS_KEY)
    if (!savedSettings) return defaultSettings

    try {
        const parsed = JSON.parse(savedSettings)
        const check = settingsSchema.safeParse(parsed)
        if (check.success) {
            if (parsed !== check.data) setSettingsToStorage(check.data)
            return check.data
        }

        console.error('Invalid settings found in storage:', check.error)
        return defaultSettings
    } catch (err) {
        console.error('Error parsing settings from storage:', err)
        return defaultSettings
    }
}
