import { ImageField, PrismicDocument, RichTextField } from '@prismicio/types'

export type CategoryRemoteDataType = {
    id: string
    uid: string | null
    name: string
}

export type CategoryType = {
    id: string
    uid: string | null
    name: string
}

export type CategoriesResponse = PrismicDocument<
    Record<string, any>,
    string,
    string
> & {
    data: CategoryRemoteDataType
}
