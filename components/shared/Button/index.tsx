import React, { MouseEventHandler } from 'react'

type Props = {
    type?: 'primary' | 'outlined' | 'dark'
    className?: string
    full?: boolean
    children: React.ReactNode
    onClick?: MouseEventHandler<HTMLAnchorElement>
    href?: 'string'
}

const typeStyle = {
    primary: 'bg-gray-900 text-white',
    outlined: 'border border-gray-900 text-gray-900',
    dark: 'bg-white text-gray-900',
}

const Button = React.forwardRef<HTMLAnchorElement, Props>(
    ({ type, className, full, children, href, onClick }: Props, ref) => {
        return (
            <a
                href={href}
                onClick={onClick}
                ref={ref}
                className={`${
                    full ? 'w-full' : ''
                } flex items-center justify-center py-4 px-5 font-display text-xl font-bold ${
                    type ? typeStyle[type] : typeStyle.primary
                } ${className}`}
            >
                {children}
            </a>
        )
    }
)

export default Button
