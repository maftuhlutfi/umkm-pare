import { ImageField, PrismicDocument, RichTextField } from '@prismicio/types'

export type ProductRemoteDataType = {
    id: string
    slugs: string[]
    uid: string
    name: string
    category: {
        data: {
            name: string
            uid: string
        }
    }
    price: number
    umkm: {
        data: {
            name: string
            uid: string
            whatsapp: string
            address: string
            picture: ImageField & { url: string; alt: string }
        }
    }
    description: RichTextField
    material: RichTextField
    pictures: { picture: ImageField & { url: string; alt: string } }[]
    variants: {
        name: string
        value: string
        price: number
    }[]
}

export type ProductType = {
    id: string
    slugs: string[]
    uid: string
    name: string
    category: {
        name: string
        uid: string
    }
    price: number
    umkm: {
        name: string
        uid: string
        whatsapp: string
        address: string
        picture: ImageField & { url: string; alt: string }
    }
    description: RichTextField
    material: RichTextField
    pictures: ImageField & { url: string; alt: string }[]
    variants: {
        name: string
        value: string
        price: number
    }[]
}

export type ProductsResponse = PrismicDocument<
    Record<string, any>,
    string,
    string
> & {
    uid: string
    data: ProductRemoteDataType
}
