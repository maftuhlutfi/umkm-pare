import React from 'react'
import Select from '../../shared/Select'

type Props = {}

const SortProduct = (props: Props) => {
    return (
        <Select>
            <option value="terbaru">Terbaru</option>
            <option value="terbaru">Termurah</option>
            <option value="terbaru">Termahal</option>
        </Select>
    )
}

export default SortProduct
