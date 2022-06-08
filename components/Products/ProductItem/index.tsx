import Image from 'next/image'
import Link from 'next/link'
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
        uid,
        variants,
    },
}: Props) => {
    const variantsSortedByPrice = variants.sort((a, b) => a.price - b.price)

    return (
        <Link href={`/${umkmUid}/${uid}`}>
            <a className="flex flex-col border-2 border-gray-900">
                <Image
                    src={pictures[0].url}
                    width={512}
                    height={512}
                    objectFit="cover"
                    alt={pictures[0].alt}
                />
                <div className="flex-1 p-4 bg-gray-900">
                    <div className="mb-2">
                        <h4 className="text-lg font-semibold text-white">
                            {name}
                        </h4>
                        <p className="text-sm text-gray-200">{umkmName}</p>
                    </div>
                    <p className="text-xl font-bold text-white">
                        {variants[0].name
                            ? `${currencyFormatter(
                                  variantsSortedByPrice[0].price
                              )}`
                            : currencyFormatter(price)}
                    </p>
                </div>
            </a>
        </Link>
    )
}

export default ProductItem
