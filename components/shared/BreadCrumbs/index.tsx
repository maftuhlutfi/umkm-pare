import Link from 'next/link'
import { title } from 'process'
import React from 'react'

type Props = {
    links: {
        title: string
        href: string
    }[]
}

const BreadCrumbs = ({ links }: Props) => {
    return (
        <section className="grid items-center grid-flow-col gap-3 mb-8 w-fit">
            {links.map((link, index) => (
                <Link key={index} href={link.href}>
                    <a
                        className={`${
                            index !== links.length - 1
                                ? 'text-gray-600'
                                : 'font-semibold'
                        }`}
                    >
                        <span className="mr-3">{link.title}</span>
                        {index !== links.length - 1 ? '/' : ''}
                    </a>
                </Link>
            ))}
        </section>
    )
}

export default BreadCrumbs
