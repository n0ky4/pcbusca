import { Gear } from '@phosphor-icons/react'
import { RoundButton } from './RoundButton'

export function TopBar() {
    return (
        <div className='absolute top-0 left-0 w-full'>
            <div className='w-full p-4 mx-auto flex items-center justify-between'>
                <div />
                <div className='flex items-center gap-2'>
                    <RoundButton theme='ghost'>
                        <Gear size={24} />
                    </RoundButton>
                </div>
            </div>
        </div>
    )
}
