'use client'
import {
    createSavedSearchStorage,
    getSettingsFromStorage,
    setSettingsToStorage,
} from '@/lib/storage'
import { PropsWithChildren, useEffect, useMemo, useState } from 'react'
import { defaultSettings, Settings, SettingsContext } from './SettingsContext'

export function SettingsContextProvider({ children }: PropsWithChildren) {
    const [settings, _setSettings] = useState<Settings>(defaultSettings)

    const setSettings = (settings: Settings) => {
        _setSettings(settings)
        setSettingsToStorage(settings)
    }

    const savedSearch = useMemo(
        () => createSavedSearchStorage(settings, setSettings),
        [settings, setSettings]
    )

    useEffect(() => {
        _setSettings(getSettingsFromStorage())
    }, [])

    return (
        <SettingsContext.Provider value={{ settings, setSettings, savedSearch }}>
            {children}
        </SettingsContext.Provider>
    )
}
