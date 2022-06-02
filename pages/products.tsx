import type { NextPage } from 'next'
import FilterCategory from '../components/Products/FilterCategory'
import SortProduct from '../components/Products/SortProduct'
import MainLayout from '../layout/MainLayout'
import { createClient } from '../prismicio'
import { ProductsResponse, ProductType } from '../ts/types/Product'
import productsDataMapper from '../utils/mapper/productsDataMapper'

type ProductsPagePropsTypes = {
    products: ProductType[]
}

const ProductsPage: NextPage<ProductsPagePropsTypes> = ({ products }) => {
    return (
        <>
            <MainLayout>
                <section className="flex items-center justify-between mb-12">
                    <h1 className="text-4xl">Pilih Produk Pilihanmu</h1>
                    <SortProduct />
                </section>
                <section className="flex">
                    <FilterCategory />
                </section>
            </MainLayout>
        </>
    )
}

export default ProductsPage

export const getServerSideProps = async ({ previewData }: any) => {
    const client = createClient({ previewData })

    const products = await client.getAllByType<ProductsResponse>('product', {
        fetchLinks: ['category.name', 'category.uid', 'umkm.name', 'umkm.uid'],
        limit: 4,
    })

    return {
        props: { products: productsDataMapper.toLocalList(products) }, // Will be passed to the page component as props
    }
}
