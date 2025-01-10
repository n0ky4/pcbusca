import { IdItem, Settings } from '@/contexts/settings/SettingsContext'
import { getRandomId } from '../common'

export const isSearchValid = (search: string) => {
    const fmt = search.trim()
    if (!fmt || fmt.length < 3) return false
    return fmt
}

export function createSavedSearchHandler(
    settings: Settings,
    setSettings: (settings: Settings) => void
) {
    const get: () => IdItem[] = () => {
        return settings.savedSearches
    }

    const add: (entry: string) => IdItem[] = (entry) => {
        const saved = get()
        if (saved.length >= 5) saved.shift()

        const fmt = isSearchValid(entry)
        if (!fmt || saved.some((s) => s.entry === fmt)) return saved

        saved.push({
            id: getRandomId(),
            entry: fmt,
        })

        setSettings({ ...settings, savedSearches: saved })
        return saved
    }

    const remove: (id: string) => IdItem[] = (id) => {
        const saved = get()
        const filtered = saved.filter((s) => s.id !== id)

        setSettings({ ...settings, savedSearches: filtered })
        return filtered
    }

    return { get, add, remove }
}
export type SavedSearchHandler = ReturnType<typeof createSavedSearchHandler>
