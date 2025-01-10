import { twMerge } from 'tailwind-merge'

interface NotFoundProps {
    center?: boolean
    customMessage?: string
}

export function NotFound({ center = true, customMessage }: NotFoundProps) {
    return (
        <p className={twMerge('text-slate-500', center && 'w-full text-center')}>
            {customMessage || 'Nenhum resultado encontrado.'}
        </p>
    )
}
