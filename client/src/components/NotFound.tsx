import { twMerge } from 'tailwind-merge'

interface NotFoundProps {
    center?: boolean
}

export function NotFound({ center = true }: NotFoundProps) {
    return (
        <p className={twMerge('text-slate-500', center && 'w-full text-center')}>
            Nenhum resultado encontrado.
        </p>
    )
}
