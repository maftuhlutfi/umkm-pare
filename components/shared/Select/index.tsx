import React from 'react'

type Props = React.DetailedHTMLProps<
    React.SelectHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement
>

const Select = (props: Props) => {
    return (
        <div className="relative">
            <select
                {...props}
                className={`min-w-[160px] appearance-none border border-gray-900 p-4 pr-12 ${props.className}`}
            >
                {props.children}
            </select>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width={20}
                height={20}
                fill="none"
                viewBox="0 0 24 24"
                className="absolute transform -translate-y-1/2 right-4 top-1/2"
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
    )
}

export default Select
