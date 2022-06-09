import React, { ReactNode } from 'react'

type Props = {
    children?: ReactNode
}

const FormCard = ({ children }: Props) => {
    return (
        <div className="grid gap-6 p-5 border border-gray-900">{children}</div>
    )
}

export default FormCard
