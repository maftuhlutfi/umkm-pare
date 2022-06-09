import { useRouter } from 'next/router'
import React, { useRef, useState } from 'react'
import FormCard from '../components/Checkout/CheckoutHeader/FormCard'
import Button from '../components/shared/Button'
import Input from '../components/shared/Input'
import TextArea from '../components/shared/TextArea'
import MainLayout from '../layout/MainLayout'
import emailjs from '@emailjs/browser'
import Modal from '../components/shared/Modal'
import Head from 'next/head'

const ContactPage = () => {
    const [showModal, setShowModal] = useState(false)

    const router = useRouter()

    const form = useRef<HTMLFormElement>(null)

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault()

        emailjs
            .sendForm(
                'service_z6u9465',
                'template_lik1g96',
                form?.current as HTMLFormElement | string,
                'user_jjvPUtUMngArL3TR0aMM1'
            )
            .then((result) => {
                setShowModal(true)
                const t = setTimeout(() => {
                    router.reload()
                    clearTimeout(t)
                }, 3000)
            })
            .catch((error) => console.log(error))
    }
    return (
        <>
            <Head>
                <title>Contact</title>
            </Head>
            <MainLayout>
                <section className="flex flex-col items-center w-full">
                    <h1 className="mb-2 text-[32px]">Hubungi Kami</h1>
                    <p className="mb-10">
                        Silahkan isi form di bawah ini untuk mengirim pertanyaan
                    </p>
                    <form
                        ref={form}
                        onSubmit={handleSubmit}
                        className="w-[90%] max-w-[600px]"
                    >
                        <FormCard>
                            <Input
                                type="text"
                                name="name"
                                id="name"
                                label="Nama"
                                autoComplete="off"
                                required
                            />
                            <Input
                                type="email"
                                name="email"
                                id="email"
                                label="Email"
                                autoComplete="off"
                                required
                            />
                            <Input
                                type="tel"
                                name="hp"
                                id="hp"
                                label="Nomor HP"
                                autoComplete="off"
                                required
                            />
                            <TextArea
                                name="pertanyaan"
                                id="pertanyaan"
                                label="Pertanyaan"
                                className="h-32"
                                required
                            />
                            <button type="submit">
                                <Button full className="mt-2 text-base">
                                    Kirim
                                </Button>
                            </button>
                        </FormCard>
                    </form>
                </section>
            </MainLayout>
            <Modal
                show={showModal}
                onClose={() => setShowModal(false)}
                title="Pesan Terkirim"
            >
                <p>Admin akan membalas pesanmu secepatnya.</p>
            </Modal>
        </>
    )
}

export default ContactPage
