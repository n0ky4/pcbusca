import { X } from 'lucide-react'
import toast, { Toast } from 'react-hot-toast'
import { twMerge } from 'tailwind-merge'

const toasterStyles = {
    error: 'border-cherryred-500 bg-cherryred-900',
    warning: 'border-yellow-500 bg-yellow-950',
    success: 'border-teal-500 bg-teal-950',
}

interface ToasterProps {
    type: keyof typeof toasterStyles
    msg: string
    t: Toast
}

export function ToasterBase({ t, type, msg }: ToasterProps) {
    const style = toasterStyles[type]
    return (
        <div
            className={twMerge(
                t.visible ? 'animate-enter' : 'animate-leave',
                'flex max-w-screen-sm w-fit border text-white shadow-lg rounded-xl pointer-events-auto',
                'p-2 gap-2 items-center justify-between',
                style
            )}
        >
            <span className='font-medium'>{msg}</span>
            <button
                onClick={() => toast.dismiss(t.id)}
                className='transition-colors ease-out flex items-center justify-center leading-none w-6 h-6 rounded-lg hover:bg-white/20'
            >
                <X size={16} className='pointer-events-none' />
            </button>
        </div>
    )
}

export const t = {
    error: (msg: string) => {
        return toast.custom((t: Toast) => <ToasterBase t={t} type='error' msg={msg} />)
    },
    warning: (msg: string) => {
        return toast.custom((t: Toast) => <ToasterBase t={t} type='warning' msg={msg} />)
    },
    success: (msg: string) => {
        return toast.custom((t: Toast) => <ToasterBase t={t} type='success' msg={msg} />)
    },
}
