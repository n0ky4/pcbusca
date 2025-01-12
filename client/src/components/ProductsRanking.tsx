import { cleanTitle } from '@/lib/format'
import { Item } from 'shared'

export interface ItemWithStore extends Item {
    store: string
}

interface ProductsRankingProps {
    products: ItemWithStore[]
    Reais: Intl.NumberFormat
}

export function ProductsRanking({ products, Reais }: ProductsRankingProps) {
    return (
        <div>
            {/* Desktop View */}
            <div className='hidden md:block'>
                <DesktopProductsRanking products={products} Reais={Reais} />
            </div>

            {/* Mobile View */}
            <div className='block md:hidden'>
                <MobileProductsRanking products={products} Reais={Reais} />
            </div>
        </div>
    )
}

function DesktopProductsRanking({ products, Reais }: ProductsRankingProps) {
    return (
        <div className='overflow-x-auto'>
            <table className='w-full table-auto divide-y divide-slate-800'>
                <thead>
                    <tr>
                        <th className='text-left !font-semibold'>Produto</th>
                        <th className='text-right !font-semibold'>Preço à vista</th>
                        <th className='text-right !font-semibold'>Preço parcelado</th>
                        <th className='text-right !font-semibold'>Loja</th>
                    </tr>
                </thead>
                <tbody className='divide-y divide-slate-800 text-sm text-slate-300'>
                    {products.map((product) => (
                        <tr key={product.id} className='hover:bg-slate-900'>
                            <td className='max-w-md truncate' title={product.name}>
                                <a
                                    href={product.url}
                                    target='_blank'
                                    rel='noopener noreferrer'
                                    className='hover:underline'
                                >
                                    {cleanTitle(product.name)}
                                </a>
                            </td>
                            <td className='text-right'>
                                {Reais.format(product.cash.total_price)} ({product.cash.discount}%)
                            </td>
                            {product?.installment?.total_price &&
                            product?.installment?.max_installments ? (
                                <td className='text-right'>
                                    {Reais.format(product.installment.total_price)} (
                                    {product.installment.max_installments}x)
                                </td>
                            ) : (
                                <td className='text-right text-slate-500'>-</td>
                            )}
                            <td className='text-right'>{product.store}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

function MobileProductsRanking({ products, Reais }: ProductsRankingProps) {
    return (
        <ul className='space-y-4'>
            {products.map((product) => (
                <li
                    key={product.id}
                    className='p-4 border border-slate-800 rounded-lg bg-slate-900 text-sm text-slate-300'
                >
                    <h3 className='font-medium text-base truncate text-white'>
                        <a
                            href={product.url}
                            target='_blank'
                            rel='noopener noreferrer'
                            className='hover:underline'
                        >
                            {cleanTitle(product.name)}
                        </a>
                    </h3>
                    <p>
                        <span className='font-medium'>Preço à vista:</span>{' '}
                        {Reais.format(product.cash.total_price)} ({product.cash.discount}%)
                    </p>
                    {product?.installment?.total_price && product?.installment?.max_installments ? (
                        <p>
                            <span className='font-medium'>Preço parcelado:</span>{' '}
                            {Reais.format(product.installment.total_price)} (
                            {product.installment.max_installments}x)
                        </p>
                    ) : (
                        <p className='text-slate-500'>Sem parcelamento</p>
                    )}
                    <p>
                        <span className='font-medium'>Loja:</span> {product.store}
                    </p>
                </li>
            ))}
        </ul>
    )
}
