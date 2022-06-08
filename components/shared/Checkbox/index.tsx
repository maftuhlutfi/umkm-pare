import Image from 'next/image'
import React from 'react'

type Props = React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
> & {
    label: string
    size?: number
}

const Checkbox = ({ id, label, size = 20, className, ...props }: Props) => {
    return (
        <>
            <input {...props} id={id} type="checkbox" className="hidden" />
            <label
                htmlFor={id}
                className={`flex cursor-pointer items-center ${className}`}
            >
                <Image
                    src={
                        props.checked
                            ? '/icons/checkbox-active.svg'
                            : '/icons/checkbox.svg'
                    }
                    width={size}
                    height={size}
                />
                <span className="mt-px ml-4">{label}</span>
            </label>
        </>
    )
}

export default Checkbox
