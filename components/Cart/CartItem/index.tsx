import Image from 'next/image'
import React from 'react'
import useCartStore from '../../../store/useCartStore'
import { CartItem } from '../../../ts/types/Cart'
import currencyFormatter from '../../../utils/currencyFormatter'
import Checkbox from '../../shared/Checkbox'

type Props = {
    item: CartItem
}

const CartItem = ({ item }: Props) => {
    const { id, name, variant, quantity, price, picture, isChecked } = item
    const { addToCart, removeItem, clearItem, toggleChecked } = useCartStore()

    return (
        <div className="flex items-start p-5 border border-gray-900">
            <Checkbox
                id={id}
                name={name}
                label=""
                className="relative mr-1 top-10"
                size={24}
                checked={isChecked}
                onChange={() => toggleChecked(id)}
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
                        <Image
                            src="/icons/trash.svg"
                            width={24}
                            height={24}
                            onClick={() => clearItem(id)}
                            className="cursor-pointer"
                        />
                        <div className="ml-4 grid h-6 w-[72px] grid-cols-3 border border-gray-900">
                            <button
                                className="text-center text-white bg-gray-900"
                                onClick={() => removeItem(item)}
                            >
                                -
                            </button>
                            <div className="text-center cursor-pointer">
                                {quantity}
                            </div>
                            <button
                                className="text-center text-white bg-gray-900"
                                onClick={() => addToCart(item)}
                            >
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
