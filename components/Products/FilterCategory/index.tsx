import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { CategoryType } from '../../../ts/types/Category'
import Button from '../../shared/Button'
import Checkbox from '../../shared/Checkbox'

type Props = {
    categories: CategoryType[]
}

const FilterCategory = ({ categories }: Props) => {
    const router = useRouter()

    const [filter, setFilter] = useState<
        (CategoryType & { checked: boolean })[]
    >([])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target

        if (value === '0') {
            setFilter((prev) => prev.map((p) => ({ ...p, checked })))
        } else {
            setFilter((prev) =>
                prev.map((p) => {
                    if (p.id === value) {
                        p.checked = checked
                    }

                    if (p.id === '0' && value !== '0' && !checked) {
                        p.checked = false
                    }

                    if (
                        p.id === '0' &&
                        checked &&
                        prev.filter(({ checked }) => checked).length ===
                            prev.length - 1
                    ) {
                        p.checked = true
                    }
                    return p
                })
            )
        }
    }

    const handleFilterApply = () => {
        router.push({
            query: {
                ...router.query,
                category: filter[0].checked
                    ? 'all'
                    : filter
                          .filter((f) => f.checked)
                          .map((f) => f.name)
                          .join(','),
            },
        })
    }

    useEffect(() => {
        if (router.query.category && router.query.category !== 'all') {
            const { category } = router.query
            const checkedCategory = category.toString().split(',')

            setFilter(
                categories.map((category) => ({
                    ...category,
                    checked: checkedCategory.includes(category.name),
                }))
            )
        } else {
            setFilter(
                categories.map((category) => ({ ...category, checked: true }))
            )
        }
    }, [router])

    return (
        <aside className="p-8 border-2 border-gray-900 shrink-0">
            <div className="flex items-center mb-8">
                <Image src="/icons/filter.svg" width={24} height={24} />
                <h5 className="ml-4 text-lg">Filter Kategori</h5>
            </div>
            <div className="grid gap-6 mb-6">
                {filter.map(({ name, id, checked }) => (
                    <Checkbox
                        id={id}
                        key={id}
                        name="filter"
                        label={name}
                        value={id}
                        checked={checked}
                        onChange={handleChange}
                    />
                ))}
            </div>
            <Button className="text-sm" center full onClick={handleFilterApply}>
                Terapkan
            </Button>
        </aside>
    )
}

export default FilterCategory
