import { cleanTitle, truncate } from '@/lib/format'
import { useMemo } from 'react'
import { Item } from 'shared'

interface GridItemProps {
    product: Item
    Reais: Intl.NumberFormat
}

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
                    <div
                        style={
                            product.images?.default
                                ? { backgroundImage: `url(${product.images.default})` }
                                : {
                                      background:
                                          'linear-gradient(135deg, #f6f6f6 0%, #eaeaea 100%)',
                                  }
                        }
                        className='w-full h-48 bg-cover bg-center rounded-lg group-hover:scale-105 transition-transform ease-out duration-200'
                    />
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
