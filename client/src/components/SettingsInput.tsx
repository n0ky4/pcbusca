import { twMerge } from 'tailwind-merge'

interface SettingsInputProps extends React.HTMLProps<HTMLInputElement> {}

export function SettingsInput({ className, ...rest }: SettingsInputProps) {
    return (
        <input
            placeholder='Digite o termo da pesquisa'
            className={twMerge(
                'transition-all ease-out',
                'w-full text-white bg-transparent rounded-md border border-slate-700 px-2 py-1 outline-none',
                'focus:ring-2 focus:ring-teal-300',
                className
            )}
            {...rest}
        />
    )
}
