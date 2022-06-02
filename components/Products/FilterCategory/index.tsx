import Image from 'next/image'
import React from 'react'
import { CategoryType } from '../../../ts/types/Category'
import Button from '../../shared/Button'
import Checkbox from '../../shared/Checkbox'

type Props = {
    categories: CategoryType[]
}

const FilterCategory = ({ categories }: Props) => {
    return (
        <aside className="p-8 border-2 border-gray-900 shrink-0">
            <div className="flex items-center mb-8">
                <Image src="/icons/filter.svg" width={24} height={24} />
                <h5 className="ml-4 text-lg">Filter Kategori</h5>
            </div>
            <div className="grid gap-6 mb-6">
                {categories.map(({ name, id }) => (
                    <Checkbox
                        id={id}
                        label={name}
                        value={name.toLowerCase()}
                        checked={true}
                    />
                ))}
            </div>
            <Button className="text-sm" center full>
                Terapkan
            </Button>
        </aside>
    )
}

export default FilterCategory
