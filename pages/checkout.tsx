import Link from 'next/link'
import React from 'react'
import FormCard from '../components/Checkout/CheckoutHeader/FormCard'
import Button from '../components/shared/Button'
import Input from '../components/shared/Input'
import SelectInput from '../components/shared/SelectInput'
import TextArea from '../components/shared/TextArea'
import MainLayout from '../layout/MainLayout'
import useCartStore from '../store/useCartStore'
import { cartItemsTotalCheckoutPrice } from '../utils/cartUtils'
import currencyFormatter from '../utils/currencyFormatter'

const CheckoutPage = () => {
    const { cart } = useCartStore()
    const totalPrice = cartItemsTotalCheckoutPrice(cart)

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault()
        const target = e.target as typeof e.target & {
            name: { value: string }
            email: { value: string }
            hp: { value: string }
            address: { value: string }
            pengiriman: { value: string }
            pembayaran: { value: string }
        }

        const name = target.name.value
        const email = target.email.value
        const hp = target.hp.value
        const address = target.address.value
        const pengiriman = target.pengiriman.value
        const pembayaran = target.pembayaran.value
    }

    return (
        <MainLayout>
            <section className="flex items-start">
                <form
                    id="checkout-form"
                    className="grid w-full gap-6"
                    onSubmit={handleSubmit}
                >
                    <h4 className="text-xl font-semibold">
                        Informasi dan Alamat
                    </h4>
                    <FormCard>
                        <Input
                            name="name"
                            id="name"
                            label="Nama"
                            type="text"
                            autoComplete="off"
                            required
                        />
                        <Input
                            name="email"
                            id="email"
                            label="Email"
                            type="email"
                            autoComplete="off"
                            required
                        />
                        <Input
                            name="hp"
                            id="hp"
                            label="Nomor HP"
                            type="tel"
                            autoComplete="off"
                            required
                        />
                        <TextArea
                            name="address"
                            id="address"
                            label="Alamat Lengkap"
                            type="text"
                            autoComplete="off"
                            className="h-32"
                            required
                        />
                    </FormCard>
                    <h4 className="text-xl font-semibold">Pengiriman</h4>
                    <FormCard>
                        <SelectInput
                            label="Pilih Pengiriman"
                            id="pengiriman"
                            name="pengiriman"
                            required
                        >
                            <option value="pick up">Ambil Sendiri</option>
                            <option value="j&t">J&T</option>
                            <option value="gosend">Go-Send</option>
                            <option value="grab">Grab Express</option>
                        </SelectInput>
                    </FormCard>
                    <h4 className="text-xl font-semibold">Pembayaran</h4>
                    <FormCard>
                        <SelectInput
                            label="Pilih Pembayaran"
                            id="pembayaran"
                            name="pembayaran"
                            required
                        >
                            <option value="cod">Cash on Delivery (COD)</option>
                            <option value="transfer">Transfer Bank</option>
                            <option value="gopay">Gopay</option>
                            <option value="ovo">OVO</option>
                        </SelectInput>
                    </FormCard>
                </form>
                <div className="sticky w-64 p-5 ml-8 border border-gray-900 top-32 shrink-0">
                    <h5 className="mb-6 text-lg">Ringkasan Pesanan</h5>
                    <div className="grid gap-2 pb-4 mb-6 text-sm border-b border-b-gray-400">
                        {cart
                            .filter((i) => i.isChecked)
                            .map((item) => (
                                <div
                                    key={item.id}
                                    className="flex justify-between text-xs"
                                >
                                    <p>
                                        {item.name} x{item.quantity}
                                    </p>
                                    <b>
                                        {currencyFormatter(
                                            item.quantity
                                                ? item.price * item.quantity
                                                : item.price
                                        )}
                                    </b>
                                </div>
                            ))}
                    </div>
                    <div className="flex justify-between pb-4 mb-6 text-sm border-b border-b-gray-400">
                        <p className="font-semibold text-gray-900">
                            Harga Total
                        </p>
                        <b>{currencyFormatter(totalPrice)}</b>
                    </div>
                    <div className="flex justify-between pb-4 mb-6 text-sm border-b border-b-gray-400">
                        <p className="font-semibold text-gray-900">
                            Pengiriman
                        </p>
                        <b>{currencyFormatter(20000)}</b>
                    </div>
                    <div className="flex justify-between mb-6">
                        <h4>Total</h4>
                        <b>{currencyFormatter(totalPrice + 20000)}</b>
                    </div>
                    <button
                        className="w-full"
                        type="submit"
                        form="checkout-form"
                    >
                        <Button center full className="py-2 text-base">
                            Checkout
                        </Button>
                    </button>
                </div>
            </section>
        </MainLayout>
    )
}

export default CheckoutPage
