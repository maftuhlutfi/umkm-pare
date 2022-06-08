import { ImageField, PrismicDocument, RichTextField } from '@prismicio/types'

export type UmkmRemoteDataType = {
    id: string
    slugs: string[]
    uid: string
    name: string
    picture: ImageField & { url: string; alt: string }
    description: RichTextField
    address: string
    instagram: string
    email: string
    whatsapp: string
    facebook: string
}

export type UmkmType = UmkmRemoteDataType

export type UmkmResponse = PrismicDocument<
    Record<string, any>,
    string,
    string
> & {
    uid: string
    data: UmkmRemoteDataType
}
