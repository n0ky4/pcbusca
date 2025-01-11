import { IdItem, Settings } from '@/contexts/settings/SettingsContext'
import { log } from '../log'

// i know this code looks like the savedsearch thingy
// but this logic is only used twice so it's pointless
// to add unnecessary complexity for something so simple
// (also i'm lazy)

const MAX_HISTORY = 100

export function createHistoryHandler(
    settings: Settings,
    setSettings: (settings: Settings) => void
) {
    const get: () => IdItem[] = () => {
        log.info(`got history: ${settings.history.length} entries`)
        return settings.history
    }

    const add: (entry: string) => IdItem[] = (entry) => {
        const saved = get()
        if (saved.length >= MAX_HISTORY) {
            // remove the last entry if the history is full
            log.warn('history is full, removing last entry')
            saved.shift()
        }

        saved.push({
            id: Date.now().toString(),
            entry,
        })

        setSettings({ ...settings, history: saved })
        log.info(`added to history: ${entry}`)

        return saved
    }

    const remove: (id: string) => IdItem[] = (id) => {
        const saved = get()
        const filtered = saved.filter((s) => s.id !== id)

        setSettings({ ...settings, history: filtered })
        log.info(`removed from history: ${id}`)

        return filtered
    }

    const clear: () => IdItem[] = () => {
        setSettings({ ...settings, history: [] })
        log.info('cleared history')

        return []
    }

    return { get, add, remove, clear }
}
export type HistoryHandler = ReturnType<typeof createHistoryHandler>
