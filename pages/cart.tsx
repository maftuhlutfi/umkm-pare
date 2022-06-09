import Head from 'next/head'
import Link from 'next/link'
import React from 'react'
import CartItem from '../components/Cart/CartItem'
import Button from '../components/shared/Button'
import MainLayout from '../layout/MainLayout'
import useCartStore from '../store/useCartStore'
import { cartItemsTotalCheckoutPrice } from '../utils/cartUtils'
import currencyFormatter from '../utils/currencyFormatter'

const CartPage = () => {
    const { cart } = useCartStore()
    const totalPrice = cartItemsTotalCheckoutPrice(cart)

    return (
        <>
            <Head>
                <title>Keranjang</title>
            </Head>
            <MainLayout>
                <h1 className="mb-10 text-2xl font-semibold">
                    Keranjang Belanja
                </h1>
                <section className="flex items-start">
                    {cart.length > 0 ? (
                        <>
                            <div className="grid w-full gap-6">
                                {cart.map((item) => (
                                    <CartItem key={item.id} item={item} />
                                ))}
                            </div>
                            <div className="sticky w-64 p-5 ml-8 border border-gray-900 top-32 shrink-0">
                                <h5 className="mb-6 text-lg">
                                    Ringkasan Pesanan
                                </h5>
                                <div className="flex justify-between pb-4 mb-6 text-sm border-b border-b-gray-400">
                                    <p>Harga Total</p>
                                    <b>{currencyFormatter(totalPrice)}</b>
                                </div>
                                <div className="flex justify-between mb-6">
                                    <h4>Total</h4>
                                    <b>{currencyFormatter(totalPrice)}</b>
                                </div>
                                <Link href="/checkout">
                                    <Button
                                        center
                                        full
                                        className="py-2 text-base"
                                    >
                                        Checkout
                                    </Button>
                                </Link>
                            </div>
                        </>
                    ) : (
                        <div className="w-full p-8 text-center bg-slate-200">
                            Belum ada produk ditambahkan.
                        </div>
                    )}
                </section>
            </MainLayout>
        </>
    )
}

export default CartPage
