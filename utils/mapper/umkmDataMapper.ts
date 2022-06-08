import React from 'react'
import {
    ProductRemoteDataType,
    ProductsResponse,
    ProductType,
} from '../../ts/types/Product'
import { UmkmRemoteDataType, UmkmResponse, UmkmType } from '../../ts/types/Umkm'

type UmkmDataMapperType<T, K> = {
    toLocal: (umkm: T) => K
    toLocalList: (umkmList: UmkmResponse[]) => K[]
}

const umkmDataMapper: UmkmDataMapperType<UmkmRemoteDataType, UmkmType> = {
    toLocal: (umkm) => ({
        ...umkm,
    }),
    toLocalList: (umkmList) =>
        umkmList.map((umkm) =>
            umkmDataMapper.toLocal({
                ...umkm.data,
                uid: umkm.uid,
                id: umkm.id,
            })
        ),
}

export default umkmDataMapper
