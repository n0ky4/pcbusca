import { useSettings } from '@/contexts/settings/SettingsContext'
import { Gear } from '@phosphor-icons/react'
import { History } from 'lucide-react'
import { RoundButton } from './button/RoundButton'

interface TopBarProps {
    onHistoryClick: () => void
    onSettingsClick: () => void
}

export function TopBar({ onSettingsClick, onHistoryClick }: TopBarProps) {
    const {
        settings: { keepHistory },
    } = useSettings()

    return (
        <div className='absolute top-0 left-0 w-full pointer-events-none'>
            <div className='w-full p-4 mx-auto flex items-center justify-between'>
                <div />
                <div className='flex items-center gap-2 pointer-events-auto'>
                    {keepHistory && (
                        <RoundButton theme='ghost' onClick={onHistoryClick}>
                            <History size={24} />
                        </RoundButton>
                    )}
                    <RoundButton theme='ghost' onClick={onSettingsClick}>
                        <Gear size={24} />
                    </RoundButton>
                </div>
            </div>
        </div>
    )
}
