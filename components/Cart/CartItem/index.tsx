import Image from 'next/image'
import React from 'react'
import { CartItem } from '../../../ts/types/Cart'
import currencyFormatter from '../../../utils/currencyFormatter'
import Checkbox from '../../shared/Checkbox'

type Props = {
    item: CartItem
}

const CartItem = ({
    item: { id, name, variant, quantity, price, picture },
}: Props) => {
    return (
        <div className="flex items-start">
            <Checkbox
                id="id"
                label=""
                className="relative mr-1 top-10"
                size={24}
            />
            <Image
                src={picture.url}
                width={108}
                height={108}
                alt={picture.alt}
                className="object-cover object-center"
            />
            <div className="flex-1 ml-6">
                <h4 className="text-lg font-medium">{name}</h4>
                <p>{variant}</p>
                <div className="my-2.5 flex items-center justify-between">
                    <p className="text-lg font-bold">
                        {currencyFormatter(price)}
                    </p>
                    <div className="flex items-center">
                        <Image src="/icons/trash.svg" width={24} height={24} />
                        <div className="ml-4 grid h-6 w-[72px] grid-cols-3 border border-gray-900">
                            <button className="text-center text-white bg-gray-900">
                                -
                            </button>
                            <div className="text-center">{quantity}</div>
                            <button className="text-center text-white bg-gray-900">
                                +
                            </button>
                        </div>
                    </div>
                </div>
                <div className="mb-2.5 h-px w-full bg-gray-300" />
                <p className="text-right">
                    Subtotal:{' '}
                    <b>
                        {currencyFormatter(quantity ? price * quantity : price)}
                    </b>
                </p>
            </div>
        </div>
    )
}

export default CartItem
