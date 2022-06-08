import Image from 'next/image'
import React from 'react'
import { ProductType } from '../../../ts/types/Product'
import currencyFormatter from '../../../utils/currencyFormatter'
import Button from '../../shared/Button'

type Props = {
    product: ProductType
}

const ProductItem = ({
    product: {
        pictures,
        name,
        umkm: { uid: umkmUid, name: umkmName },
        price,
        id,
    },
}: Props) => {
    return (
        <div className="flex flex-col border-2 border-gray-900">
            <Image
                src={pictures[0].url}
                width={512}
                height={512}
                objectFit="cover"
                alt={pictures[0].alt}
            />
            <div className="p-4 bg-gray-900">
                <div className="mb-3">
                    <h4 className="text-lg font-semibold text-white">{name}</h4>
                    <p className="text-sm text-gray-200">{umkmName}</p>
                </div>
                <p className="mb-4 text-xl font-bold text-white">
                    {currencyFormatter(price)}
                </p>
                <Button type="dark" full className="py-3 text-base">
                    + Keranjang
                </Button>
            </div>
        </div>
    )
}

export default ProductItem
