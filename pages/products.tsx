import type { NextPage } from 'next'
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
            <MainLayout>
                <section className="flex items-center justify-between mb-12">
                    <h1 className="text-4xl">Pilih Produk Pilihanmu</h1>
                    <SortProduct />
                </section>
                <section className="flex items-start">
                    <FilterCategory categories={[...categories]} />
                    <div className="grid grid-cols-4 gap-6 ml-12">
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

export const getServerSideProps = async ({ previewData }: any) => {
    const client = createClient({ previewData })

    const products = await client.getAllByType<ProductsResponse>('product', {
        fetchLinks: ['category.name', 'category.uid', 'umkm.name', 'umkm.uid'],
        limit: 4,
    })
    const categories = await client.getAllByType<CategoriesResponse>('category')

    return {
        props: {
            products: productsDataMapper.toLocalList(products),
            categories: categoriesDataMapper.toLocalList(categories),
        }, // Will be passed to the page component as props
    }
}
