import { twMerge } from 'tailwind-merge'

const buttonThemes = {
    primary: twMerge('bg-teal-300 text-slate-900', 'enabled:hover:bg-teal-500 focus:ring-teal-100'),
    ghost: twMerge(
        'bg-transparent text-slate-400 hover:bg-white/10 hover:text-slate-200 focus:ring-teal-200/50'
    ),
}
type Theme = keyof typeof buttonThemes

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    theme?: Theme
}

export function Button({ theme = 'primary', children, onClick, className, ...props }: ButtonProps) {
    const th = buttonThemes[theme]
    return (
        <button
            className={twMerge(
                'transition-all ease-out',
                'font-medium rounded-md px-2 py-1',
                'outline-none focus:ring-2',
                'disabled:opacity-50 disabled:cursor-not-allowed',
                'select-none',
                th
            )}
            onClick={onClick}
            {...props}
        >
            {children}
        </button>
    )
}
