'use client'
import { useSettings } from '@/contexts/settings/SettingsContext'
import { Button } from './Button'

export function ClearHistoryButton() {
    const { history } = useSettings()
    return (
        <Button theme='ghost' onClick={() => history.clear()}>
            Limpar histórico
        </Button>
    )
}
