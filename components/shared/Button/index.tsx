import React, { HTMLAttributeAnchorTarget, MouseEventHandler } from 'react'

type Props = {
    type?: 'primary' | 'outlined' | 'dark'
    className?: string
    full?: boolean
    children: React.ReactNode
    onClick?: MouseEventHandler<HTMLAnchorElement>
    center?: boolean
    href?: string
    target?: HTMLAttributeAnchorTarget
}

const typeStyle = {
    primary: 'bg-gray-900 text-white',
    outlined: 'border border-gray-900 text-gray-900',
    dark: 'bg-white text-gray-900',
}

const Button = React.forwardRef<HTMLAnchorElement, Props>(
    (
        {
            type = 'primary',
            className,
            full,
            children,
            href,
            onClick,
            center,
            target,
        }: Props,
        ref
    ) => {
        return (
            <a
                href={href}
                onClick={onClick}
                ref={ref}
                className={`${
                    full ? 'w-full' : 'w-fit'
                } flex cursor-pointer items-center justify-center py-4 px-5 font-display text-xl font-bold ${
                    typeStyle[type]
                } ${center ? 'relative mx-auto' : ''} ${className}`}
                target={target}
            >
                {children}
            </a>
        )
    }
)

export default Button
