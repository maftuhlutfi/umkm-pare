import Head from 'next/head'
import Image from 'next/image'
import React from 'react'
import MainLayout from '../layout/MainLayout'

const AboutPage = () => {
    return (
        <>
            <Head>
                <title>Tentang Kami</title>
            </Head>
            <MainLayout>
                <section className="flex flex-col items-center w-full lg:flex-row">
                    <div className="w-full shrink-0 lg:mr-16 lg:w-auto">
                        <Image
                            src="/about-img.jpg"
                            width={500}
                            height={373}
                            className="object-cover object-center"
                        />
                    </div>
                    <div className="mt-8 shrink lg:mt-0">
                        <h1 className="mb-4 text-[32px]">Tentang Kami</h1>
                        <p className="text-lg leading-8">
                            UMKM adalah website yang memuat produk-produk UMKM
                            yang ada di Desa Pare, Kecamatan Kranggan, Kabupaten
                            Temanggung. Website ini bertujuan untuk membantu
                            UMKM dalam hal promosi dan pengelolaan pesanan.
                            Pesanan akan dikelola oleh admin, sehingga para
                            pelaku UMKM bisa berfokus dalam produksi.
                        </p>
                    </div>
                </section>
            </MainLayout>
        </>
    )
}

export default AboutPage
