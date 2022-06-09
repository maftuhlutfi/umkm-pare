import React from 'react'

type Props = React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
> & {
    label?: string
}

const Input = ({ label, id, className, ...props }: Props) => {
    return (
        <div className="flex flex-col text-sm">
            <label htmlFor={id} className="mb-2 font-display">
                {label}
            </label>
            <input
                id={id}
                className="p-3 border border-gray-400 bg-slate-100 focus:border-gray-900 focus:outline-none"
                {...props}
            />
        </div>
    )
}

export default Input
