import { IdItem, Settings } from '@/contexts/settings/SettingsContext'
import { getRandomId } from '../common'
import { log } from '../log'

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
        log.info(`got saved searches: ${settings.savedSearches.length} entries`)
        return settings.savedSearches
    }

    const add: (entry: string) => IdItem[] = (entry) => {
        const saved = get()
        if (saved.length >= 5) {
            // remove the first entry if the history is full
            log.warn('saved searches is full, removing first entry')
            saved.shift()
        }

        const fmt = isSearchValid(entry)
        if (!fmt || saved.some((s) => s.entry === fmt)) return saved

        saved.push({
            id: getRandomId(),
            entry: fmt,
        })

        setSettings({ ...settings, savedSearches: saved })
        log.info(`added to saved searches: ${fmt}`)

        return saved
    }

    const remove: (id: string) => IdItem[] = (id) => {
        const saved = get()
        const filtered = saved.filter((s) => s.id !== id)

        setSettings({ ...settings, savedSearches: filtered })
        log.info(`removed from saved searches: ${id}`)

        return filtered
    }

    return { get, add, remove }
}
export type SavedSearchHandler = ReturnType<typeof createSavedSearchHandler>
