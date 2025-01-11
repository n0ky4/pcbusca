import { LABELS } from './labels'

export const getRandomId = () => Math.random().toString(16).slice(2, 9)

export const getStoreLabel = (store: string) => {
    return store in LABELS ? LABELS[store as keyof typeof LABELS] : store
}

export const formatDate = (date: Date) => {
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`
}
