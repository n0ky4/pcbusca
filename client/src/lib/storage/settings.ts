import { defaultSettings, Settings, settingsSchema } from '@/contexts/settings/SettingsContext'
import { log } from '../log'

export const SETTINGS_KEY = 'hatsunemiku'

export function setSettingsToStorage(settings: Settings) {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings))
}

export function getSettingsFromStorage(): Settings {
    log.info('getting settings from local storage')

    const savedSettings = localStorage.getItem(SETTINGS_KEY)
    if (!savedSettings) {
        log.warn('no settings found in storage, using default settings')
        return defaultSettings
    }

    log.info('parsing settings from storage')

    try {
        const parsed = JSON.parse(savedSettings)
        const check = settingsSchema.safeParse(parsed)
        if (check.success) {
            log.info('settings parsed successfully')

            if (JSON.stringify(check.data) !== savedSettings) {
                log.warn('settings were modified to match the schema')
                setSettingsToStorage(check.data)
            }

            return check.data
        }

        log.error('invalid settings found in storage:', check.error)
        log.warn('using default settings instead')

        return defaultSettings
    } catch (err) {
        log.error('error parsing settings from storage:', err)
        log.warn('using default settings instead')

        return defaultSettings
    }
}
