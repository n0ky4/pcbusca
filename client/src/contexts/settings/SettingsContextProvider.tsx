'use client'
import { createHistoryHandler } from '@/lib/storage/history'
import { createSavedSearchHandler } from '@/lib/storage/savedSearch'
import { getSettingsFromStorage, setSettingsToStorage } from '@/lib/storage/settings'
import { PropsWithChildren, useCallback, useEffect, useMemo, useState } from 'react'
import { defaultSettings, Settings, SettingsContext } from './SettingsContext'

export function SettingsContextProvider({ children }: PropsWithChildren) {
    const [settings, _setSettings] = useState<Settings>(defaultSettings)

    const setSettings = useCallback((settings: Settings) => {
        _setSettings(settings)
        setSettingsToStorage(settings)
    }, [])

    const savedSearch = useMemo(() => createSavedSearchHandler(settings, setSettings), [settings])
    const history = useMemo(() => createHistoryHandler(settings, setSettings), [settings])

    useEffect(() => {
        _setSettings(getSettingsFromStorage())
    }, [])

    return (
        <SettingsContext.Provider value={{ settings, setSettings, savedSearch, history }}>
            {children}
        </SettingsContext.Provider>
    )
}
