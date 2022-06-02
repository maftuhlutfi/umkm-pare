import {
    CategoriesResponse,
    CategoryRemoteDataType,
    CategoryType,
} from '../../ts/types/Category'

type CategoriesDataMapperType<T, K> = {
    toLocal: (categories: T) => K
    toLocalList: (categories: CategoriesResponse[]) => K[]
}

const categoriesDataMapper: CategoriesDataMapperType<
    CategoryRemoteDataType,
    CategoryType
> = {
    toLocal: (category) => ({
        ...category,
    }),
    toLocalList: (categories) =>
        categories.map((category) =>
            categoriesDataMapper.toLocal({
                ...category.data,
                uid: category.uid,
                id: category.id,
            })
        ),
}

export default categoriesDataMapper
