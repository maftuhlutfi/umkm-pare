import { useRouter } from 'next/router'
import React from 'react'
import Select from '../../shared/Select'

type Props = {}

const SortProduct = (props: Props) => {
    const router = useRouter()

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = e.target

        router.push({
            pathname: router.pathname,
            query: {
                ...router.query,
                sort: value,
            },
        })
    }

    return (
        <Select onChange={handleChange} defaultValue={router.query.sort}>
            <option value="terbaru">Terbaru</option>
            <option value="termurah">Termurah</option>
            <option value="termahal">Termahal</option>
        </Select>
    )
}

export default SortProduct
