const SAVED_SEARCHES_KEY = 'savedSearches'

export type SavedSearch = {
    id: string
    search: string
}

export const isSearchValid = (search: string) => {
    const fmt = search.trim()
    if (!fmt || fmt.length < 3) return false
    return fmt
}

function createSavedSearchStorage() {
    const get: () => SavedSearch[] = () => {
        const saved = localStorage.getItem(SAVED_SEARCHES_KEY)
        if (!saved) return []
        return JSON.parse(saved)
    }

    const add: (search: string) => SavedSearch[] = (search) => {
        const saved = get()
        if (saved.length >= 5) saved.shift()
        const fmt = isSearchValid(search)
        if (!fmt || saved.some((s) => s.search === fmt)) return saved
        saved.push({
            id: Math.random().toString(16).slice(2, 9), // random hex string
            search: fmt,
        })
        localStorage.setItem(SAVED_SEARCHES_KEY, JSON.stringify(saved))

        return saved
    }

    const remove: (id: string) => SavedSearch[] = (id) => {
        const saved = get()
        const filtered = saved.filter((s) => s.id !== id)
        localStorage.setItem(SAVED_SEARCHES_KEY, JSON.stringify(filtered))
        return filtered
    }

    return { get, add, remove }
}

export const savedSearch = createSavedSearchStorage()
