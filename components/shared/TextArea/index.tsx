import React from 'react'

type Props = React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
> & {
    label: string
}

const TextArea = ({ label, id, className, ...props }: Props) => {
    return (
        <div className="flex flex-col text-sm">
            <label htmlFor={id} className="mb-2 font-display">
                {label}
            </label>
            <textarea
                id={id}
                className={`border border-gray-400 bg-slate-100 p-3 focus:border-gray-900 focus:outline-none ${className}`}
                {...props}
            />
        </div>
    )
}

export default TextArea
