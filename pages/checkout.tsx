import Link from 'next/link'
import React, { RefObject, useRef, useState } from 'react'
import FormCard from '../components/Checkout/CheckoutHeader/FormCard'
import Button from '../components/shared/Button'
import Input from '../components/shared/Input'
import SelectInput from '../components/shared/SelectInput'
import TextArea from '../components/shared/TextArea'
import MainLayout from '../layout/MainLayout'
import useCartStore from '../store/useCartStore'
import { cartItemsTotalCheckoutPrice } from '../utils/cartUtils'
import currencyFormatter from '../utils/currencyFormatter'
import emailjs from '@emailjs/browser'
import Modal from '../components/shared/Modal'
import { useRouter } from 'next/router'

const CheckoutPage = () => {
    const { cart, clearCheckedItem } = useCartStore()
    const totalPrice = cartItemsTotalCheckoutPrice(cart)
    const [showModal, setShowModal] = useState(false)

    const router = useRouter()

    const form = useRef<HTMLFormElement>(null)

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault()

        emailjs
            .sendForm(
                'service_z6u9465',
                'template_8za2e8r',
                form?.current as HTMLFormElement | string,
                'user_jjvPUtUMngArL3TR0aMM1'
            )
            .then((result) => {
                clearCheckedItem()
                setShowModal(true)
                const t = setTimeout(() => {
                    router.push('/')
                    clearTimeout(t)
                }, 3000)
            })
            .catch((error) => console.log(error))
    }

    return (
        <>
            <MainLayout>
                <section className="flex items-start">
                    <form
                        id="checkout-form"
                        className="grid w-full gap-6"
                        onSubmit={handleSubmit}
                        ref={form}
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
                                <option value="cod">
                                    Cash on Delivery (COD)
                                </option>
                                <option value="transfer">Transfer Bank</option>
                                <option value="gopay">Gopay</option>
                                <option value="ovo">OVO</option>
                            </SelectInput>
                        </FormCard>
                        <Input
                            type="hidden"
                            name="produk"
                            value={cart
                                .filter((i) => i.isChecked)
                                .map((item) => `${item.name} x${item.quantity}`)
                                .join(' | ')}
                        />
                        <Input
                            type="hidden"
                            name="total_harga"
                            value={currencyFormatter(totalPrice)}
                        />
                        <Input
                            type="hidden"
                            name="biaya_pengiriman"
                            value={currencyFormatter(20000)}
                        />
                        <Input
                            type="hidden"
                            name="total"
                            value={currencyFormatter(totalPrice + 20000)}
                        />
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
            <Modal
                show={showModal}
                onClose={() => setShowModal(false)}
                title="Pesanan Berhasil"
            >
                <p>
                    Sebentar lagi anda akan dihubungi oleh Admin untuk
                    konfirmasi pembayaran.
                </p>
            </Modal>
        </>
    )
}

export default CheckoutPage
