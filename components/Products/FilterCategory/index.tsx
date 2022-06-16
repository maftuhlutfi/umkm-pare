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
    const [showFilter, setShowFilter] = useState(false)

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
        <aside className="w-full p-6 border-2 border-gray-900 top-36 shrink-0 lg:sticky lg:w-auto lg:p-8">
            <div
                className={`${
                    showFilter ? 'mb-8' : 'mb-0 lg:mb-8'
                } flex cursor-pointer items-center justify-between lg:cursor-default`}
                onClick={() => setShowFilter((p) => !p)}
            >
                <div className="flex items-center">
                    <Image src="/icons/filter.svg" width={24} height={24} />
                    <h5 className="ml-4 text-lg">Filter Kategori</h5>
                </div>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={20}
                    height={20}
                    fill="none"
                    viewBox="0 0 24 24"
                    className="lg:hidden"
                >
                    <path
                        stroke="#1A202C"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="m19 8.596-7 7-7-7"
                    />
                </svg>
            </div>
            <div
                className={`${
                    showFilter
                        ? 'h-auto'
                        : 'h-0 overflow-x-hidden lg:h-auto lg:overflow-auto'
                }`}
            >
                <div className="grid grid-cols-2 gap-6 mb-6 lg:grid-cols-1">
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
                <Button
                    className="text-sm"
                    center
                    full
                    onClick={handleFilterApply}
                >
                    Terapkan
                </Button>
            </div>
        </aside>
    )
}

export default FilterCategory
