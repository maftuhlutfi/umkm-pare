import React from 'react'
import Button from '../../shared/Button'

type Props = {
    variants: { value: string; price: number; isActive: boolean }[]
    onChange: (index: number) => void
}

const VariantListButton = ({ variants, onChange }: Props) => {
    return (
        <div className="flex flex-wrap">
            {variants.map((variant, index) => (
                <Button
                    key={index}
                    type="outlined"
                    className={`mb-4 mr-4 py-2 font-sans text-base font-medium ${
                        variant.isActive ? 'bg-slate-200' : ''
                    }`}
                    onClick={() => onChange(index)}
                >
                    {variant.value}
                </Button>
            ))}
        </div>
    )
}

export default VariantListButton
