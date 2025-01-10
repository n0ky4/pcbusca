import { LoaderCircle } from 'lucide-react'
import { twMerge } from 'tailwind-merge'

const buttonThemes = {
    primary: twMerge(
        'bg-teal-300 text-slate-900 enabled:hover:bg-teal-500 enabled:focus:ring-white'
    ),
    ghost: twMerge(
        'bg-transparent text-slate-400 hover:bg-white/10 hover:text-slate-200 focus:ring-teal-200/50'
    ),
}

const sizes = {
    sm: 'min-w-8 min-h-8',
    md: 'min-w-10 min-h-10',
}

type Theme = keyof typeof buttonThemes
type Size = keyof typeof sizes

interface RoundButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    loading?: boolean
    theme?: Theme
    size?: Size
}

export function RoundButton({
    children,
    loading,
    className,
    disabled,
    theme = 'primary',
    size = 'md',
    ...props
}: RoundButtonProps) {
    const th = buttonThemes[theme]
    const sz = sizes[size]

    return (
        <button
            className={twMerge(
                'transition-all ease-out',
                'flex items-center justify-center leading-none',
                'rounded-full outline-none focus:ring-2',
                'disabled:opacity-75 disabled:cursor-not-allowed',
                sz,
                th,
                className
            )}
            disabled={disabled || loading}
            {...props}
        >
            {loading ? <LoaderCircle size={24} className='animate-spin' /> : children}
        </button>
    )
}
