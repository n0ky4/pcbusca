import { Field, Checkbox as HeadlessCheckbox, Label } from '@headlessui/react'
import { Check } from '@phosphor-icons/react'
import { PropsWithChildren } from 'react'
import { twMerge } from 'tailwind-merge'

interface CheckboxProps extends PropsWithChildren {
    enabled: boolean
    setEnabled: (enabled: boolean) => void
}

export function Checkbox({ enabled, setEnabled, children }: CheckboxProps) {
    const cb = (
        <HeadlessCheckbox
            checked={enabled}
            onChange={setEnabled}
            className={twMerge(
                'group flex items-center justify-center size-6 rounded-md border cursor-pointer',
                'bg-slate-900 border-slate-800 data-[checked]:bg-teal-400'
            )}
        >
            {enabled && <Check className='w-4 h-4 text-slate-900' weight='bold' />}
        </HeadlessCheckbox>
    )

    if (!children) return cb

    return (
        <Field className='flex items-center gap-2'>
            {cb}
            <Label className='text-slate-300 cursor-pointer'>{children}</Label>
        </Field>
    )
}
