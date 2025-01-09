import { Gear } from '@phosphor-icons/react'
import { RoundButton } from './RoundButton'

interface TopBarProps {
    onSettingsClick: () => void
}

export function TopBar({ onSettingsClick }: TopBarProps) {
    return (
        <div className='absolute top-0 left-0 w-full pointer-events-none'>
            <div className='w-full p-4 mx-auto flex items-center justify-between'>
                <div />
                <div className='flex items-center gap-2 pointer-events-auto'>
                    <RoundButton theme='ghost' onClick={onSettingsClick}>
                        <Gear size={24} />
                    </RoundButton>
                </div>
            </div>
        </div>
    )
}
