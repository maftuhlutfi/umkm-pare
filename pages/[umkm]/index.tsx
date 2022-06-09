import { createClient } from '../../prismicio'
import React from 'react'
import umkmDataMapper from '../../utils/mapper/umkmDataMapper'
import { UmkmResponse, UmkmType } from '../../ts/types/Umkm'
import MainLayout from '../../layout/MainLayout'
import UmkmInformation from '../../components/Umkm/UmkmInformation'
import { ProductsResponse, ProductType } from '../../ts/types/Product'
import { predicate } from '@prismicio/client'
import productsDataMapper from '../../utils/mapper/productsDataMapper'
import ProductItem from '../../components/Products/ProductItem'
import Head from 'next/head'

type Props = {
    umkm: UmkmType
    products: ProductType[]
}

const UmkmPage = ({ umkm, products }: Props) => {
    return (
        <>
            <Head>
                <title>{umkm.name}</title>
            </Head>
            <MainLayout>
                <UmkmInformation umkm={umkm} />
                <section className="mt-16">
                    <h3 className="mb-8 text-2xl">Daftar Produk</h3>
                    <div className="grid grid-cols-5 gap-5">
                        {products.map((product) => (
                            <ProductItem key={product.id} product={product} />
                        ))}
                    </div>
                </section>
            </MainLayout>
        </>
    )
}

export default UmkmPage

export const getServerSideProps = async ({ previewData, ...context }: any) => {
    const { umkm } = context.params
    const client = createClient({ previewData })

    const umkmData = await client.getByUID<UmkmResponse>('umkm', umkm)
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
        orderings: {
            field: 'document.first_publication_date',
            direction: 'desc',
        },
        predicates: [predicate.at('my.product.umkm', umkmData.id)],
    })

    return {
        props: {
            umkm: umkmDataMapper.toLocalList([umkmData])[0],
            products: productsDataMapper.toLocalList(products),
        },
    }
}
