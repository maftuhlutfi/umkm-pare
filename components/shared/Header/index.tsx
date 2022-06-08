import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { Buy } from 'react-iconly'
import menuList from './menuList'

type Props = {}

const Header = (props: Props) => {
    const { pathname } = useRouter()

    return (
        <div className="fixed top-0 z-50 w-full py-8 bg-white">
            <div className="relative mx-auto flex w-[90%] max-w-[1444px] items-center justify-between lg:w-full lg:px-10 xl:px-20">
                <Link href="/">
                    <a>
                        <Image src="/logo.svg" width={120} height={32} />
                    </a>
                </Link>
                <div className="flex items-center gap-12">
                    {menuList.map(({ title, href }, index) => (
                        <Link key={index} href={href}>
                            <a
                                className={`${
                                    pathname == href
                                        ? 'font-bold text-gray-900'
                                        : 'text-gray-600'
                                }`}
                            >
                                {title}
                            </a>
                        </Link>
                    ))}
                </div>
                <div className="relative">
                    <Buy set="bold" size={32} />
                </div>
            </div>
        </div>
    )
}

export default Header
