import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import HomeProductItem from '../components/Home/HomeProductItem'
import Button from '../components/shared/Button'
import MainLayout from '../layout/MainLayout'
import { createClient } from '../prismicio'
import { ProductsResponse, ProductType } from '../ts/types/Product'
import productsDataMapper from '../utils/mapper/productsDataMapper'

type HomePropsTypes = {
    products: ProductType[]
}

const Home: NextPage<HomePropsTypes> = ({ products }) => {
    return (
        <>
            <Head>
                <title>Beranda UMKM Desa Pare</title>
            </Head>
            <MainLayout>
                <section className="mb-[108px] flex w-full flex-col-reverse items-center justify-between lg:flex-row">
                    <div className="mr-20 mt-12 max-w-[535px] lg:mt-0">
                        <h1 className="mb-5 text-5xl leading-tight">
                            Yuk Dukung Kami untuk Indonesia Maju!
                        </h1>
                        <p className="mb-8 text-lg">
                            Beli produk berkualitas kami untuk mendukung UMKM
                            dan ikut berkontribusi dalam memajukan usaha bangsa.
                        </p>
                        <Link href="/products" passHref>
                            <Button>Lihat Produk</Button>
                        </Link>
                    </div>
                    <Image
                        src="/hero-img.jpg"
                        width={665}
                        height={520}
                        className="object-cover shrink-0 "
                    />
                </section>
                <section className="grid justify-center gap-16">
                    <div className="text-center">
                        <h1 className="mb-4 text-4xl leading-tight">
                            Produk Terbaru
                        </h1>
                        <p className="mb-8 text-lg">
                            Temukan produk terbaru dari UMKM yang ada.
                        </p>
                    </div>
                    <div className="grid grid-cols-2 gap-8 lg:grid-cols-4 lg:gap-12">
                        {products.map((product, index) => (
                            <HomeProductItem
                                key={product.id}
                                product={product}
                            />
                        ))}
                    </div>
                    <Link href="/products" passHref>
                        <Button center type="outlined">
                            Lihat Lainnya
                        </Button>
                    </Link>
                </section>
            </MainLayout>
        </>
    )
}

export default Home

export const getServerSideProps = async ({ previewData }: any) => {
    const client = createClient({ previewData })

    const products = await client.getAllByType<ProductsResponse>('product', {
        fetchLinks: [
            'category.name',
            'category.uid',
            'umkm.name',
            'umkm.uid',
            'umkm.whatsapp',
            'umkm.address',
            'umkm.picture',
        ],
        limit: 4,
    })

    return {
        props: { products: productsDataMapper.toLocalList(products) }, // Will be passed to the page component as props
    }
}
