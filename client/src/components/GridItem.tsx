import { cleanTitle, truncate } from '@/lib/format'
import { ImageBroken } from '@phosphor-icons/react'
import { useMemo } from 'react'
import { Item } from 'shared'
import { twMerge } from 'tailwind-merge'

interface GridItemProps {
    product: Item
    Reais: Intl.NumberFormat
}

const imageStyle = twMerge(
    'w-full h-48 rounded-lg group-hover:scale-105 transition-transform ease-out duration-200'
)

export function GridItem({ product, Reais }: GridItemProps) {
    const title = useMemo(() => truncate(cleanTitle(product.name), 64), [product.name])

    return (
        <div className='flex flex-col gap-2'>
            <a
                className='group flex flex-col gap-2 cursor-pointer'
                title={product.name}
                href={product.url}
                target='_blank'
                rel='noopener noreferrer'
            >
                <div className='w-full h-48 rounded-lg overflow-hidden'>
                    {product.images?.default ? (
                        <div
                            style={{ backgroundImage: `url(/proxy?url=${product.images.default})` }}
                            className={twMerge('bg-cover bg-center', imageStyle)}
                        />
                    ) : (
                        <div
                            className={twMerge(
                                'bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center text-slate-200 opacity-75',
                                imageStyle
                            )}
                        >
                            <ImageBroken size={32} />
                        </div>
                    )}
                </div>
                <h3 className='block leading-tight font-bold text-lg group-hover:underline'>
                    {title}
                </h3>
            </a>
            <div>
                <p className='text-xl font-semibold text-emerald-400 leading-tight'>
                    {Reais.format(product.cash.total_price)}
                </p>
                {product?.installment?.total_price && product?.installment?.max_installments && (
                    <p className='text-xs text-slate-500 leading-tight'>
                        {Reais.format(product.installment.total_price)} em até{' '}
                        {product.installment.max_installments}x
                    </p>
                )}
            </div>
        </div>
    )
}
