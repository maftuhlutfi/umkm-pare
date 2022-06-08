import React from 'react'
import CartItem from '../components/Cart/CartItem'
import MainLayout from '../layout/MainLayout'
import useCartStore from '../store/useCartStore'

const CartPage = () => {
    const { cart } = useCartStore()
    console.log(cart)

    return (
        <MainLayout>
            <h1 className="mb-10 text-2xl font-semibold">Keranjang Belanja</h1>
            <section className="flex">
                {cart.length > 0 ? (
                    <div className="grid w-full gap-6">
                        {cart.map((item) => (
                            <CartItem key={item.id} item={item} />
                        ))}
                    </div>
                ) : (
                    <div className="w-full p-8 text-center bg-slate-200">
                        Belum ada produk ditambahkan.
                    </div>
                )}
            </section>
        </MainLayout>
    )
}

export default CartPage
