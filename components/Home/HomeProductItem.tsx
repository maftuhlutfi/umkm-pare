import { PrismicNextImage } from '@prismicio/next'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { ProductType } from '../../ts/types/Product'

type Props = {
    product: ProductType
}

const HomeProductItem = ({
    product: {
        name,
        umkm: { name: umkmName, uid: umkmUid },
        uid,
        pictures,
    },
}: Props) => {
    return (
        <Link href={`/${umkmUid}/${uid}`}>
            <a className="flex flex-col">
                <Image
                    src={pictures[0].url}
                    width={278 * 2}
                    height={240 * 2}
                    objectFit="cover"
                    alt={pictures[0].alt}
                />
                <div className="p-4 bg-gray-900">
                    <h5 className="mb-2 text-xl font-semibold text-white">
                        {name}
                    </h5>
                    <p className="text-gray-200">{umkmName}</p>
                </div>
            </a>
        </Link>
    )
}

export default HomeProductItem
