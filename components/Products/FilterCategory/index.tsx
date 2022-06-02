import Image from 'next/image'
import React from 'react'

type Props = {}

const FilterCategory = (props: Props) => {
    return (
        <aside className="p-8 border-2 border-gray-900">
            <div className="flex items-center mb-8">
                <Image src="/icons/filter.svg" width={24} height={24} />
                <h5 className="ml-4 text-lg">Filter Kategori</h5>
            </div>
        </aside>
    )
}

export default FilterCategory
