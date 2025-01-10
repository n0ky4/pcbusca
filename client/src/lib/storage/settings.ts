import { defaultSettings, Settings, settingsSchema } from '@/contexts/settings/SettingsContext'

export const SETTINGS_KEY = 'hatsunemiku'

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
