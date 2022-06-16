import { predicate } from '@prismicio/client'
import type { NextPage } from 'next'
import Head from 'next/head'
import FilterCategory from '../components/Products/FilterCategory'
import ProductItem from '../components/Products/ProductItem'
import SortProduct from '../components/Products/SortProduct'
import MainLayout from '../layout/MainLayout'
import { createClient } from '../prismicio'
import { CategoriesResponse } from '../ts/types/Category'
import { ProductsResponse, ProductType } from '../ts/types/Product'
import categoriesDataMapper from '../utils/mapper/categoriesDataMapper'
import productsDataMapper from '../utils/mapper/productsDataMapper'

type ProductsPagePropsTypes = {
    products: ProductType[]
    categories: []
}

const ProductsPage: NextPage<ProductsPagePropsTypes> = ({
    products,
    categories,
}) => {
    return (
        <>
            <Head>
                <title>Daftar Produk UMKM Desa Pare</title>
            </Head>
            <MainLayout>
                <section className="flex items-center justify-between mb-12">
                    <h1 className="text-4xl">Pilih Produk Pilihanmu</h1>
                    <SortProduct />
                </section>
                <section className="flex flex-col items-start lg:flex-row">
                    <FilterCategory
                        categories={[
                            { id: '0', name: 'Semua', uid: null },
                            ...categories,
                        ]}
                    />
                    <div className="grid grid-cols-2 gap-6 mt-12 md:grid-cols-3 lg:ml-12 lg:mt-0 xl:grid-cols-4">
                        {products.map((product) => (
                            <ProductItem key={product.id} product={product} />
                        ))}
                    </div>
                </section>
            </MainLayout>
        </>
    )
}

export default ProductsPage

export const getServerSideProps = async ({ previewData, query }: any) => {
    const { sort, category } = query
    const client = createClient({ previewData })

    const categories = await client.getAllByType<CategoriesResponse>('category')

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
            field:
                sort === 'terbaru' || sort === undefined
                    ? 'document.first_publication_date'
                    : 'my.product.price',
            direction: sort && sort == 'termurah' ? 'asc' : 'desc',
        },
        predicates:
            category && category !== 'all'
                ? [
                      predicate.any(
                          'my.product.category',
                          categories
                              .filter((c) =>
                                  category.split(',').includes(c.data.name)
                              )
                              .map((c: any) => c.id)
                      ),
                  ]
                : undefined,
    })

    return {
        props: {
            products: productsDataMapper.toLocalList(products),
            categories: categoriesDataMapper.toLocalList(categories),
        }, // Will be passed to the page component as props
    }
}
