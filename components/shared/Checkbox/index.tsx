import Image from 'next/image'
import React from 'react'

type Props = React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
> & {
    label: string
}

const Checkbox = ({ id, label, ...props }: Props) => {
    return (
        <div className="flex items-center">
            <Image
                src={
                    props.checked
                        ? '/icons/checkbox-active.svg'
                        : '/icons/checkbox.svg'
                }
                width={20}
                height={20}
            />
            <input {...props} id={id} type="checkbox" className="hidden" />
            <label htmlFor={id} className="mt-px ml-4">
                {label}
            </label>
        </div>
    )
}

export default Checkbox
