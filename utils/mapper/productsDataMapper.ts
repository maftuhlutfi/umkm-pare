import React from 'react'
import {
    ProductRemoteDataType,
    ProductsResponse,
    ProductType,
} from '../../ts/types/Product'

type ProductsDataMapperType<T, K> = {
    toLocal: (products: T) => K
    toLocalList: (products: ProductsResponse[]) => K[]
}

const productsDataMapper: ProductsDataMapperType<
    ProductRemoteDataType,
    ProductType
> = {
    toLocal: (product) => ({
        ...product,
        category: {
            name: product.category.data.name,
            uid: product.category.data.uid,
        },
        umkm: {
            name: product.umkm.data.name,
            uid: product.umkm.data.uid,
        },
        pictures: product.pictures.map((picture) => picture.picture),
    }),
    toLocalList: (products) =>
        products.map((product) =>
            productsDataMapper.toLocal({
                ...product.data,
                uid: product.uid,
                id: product.id,
            })
        ),
}

export default productsDataMapper
