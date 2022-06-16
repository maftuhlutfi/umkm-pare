import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { Buy } from 'react-iconly'
import useCartStore from '../../../store/useCartStore'
import menuList from './menuList'
import { cartItemsCount } from '../../../utils/cartUtils'

type Props = {}

const Header = (props: Props) => {
    const { pathname } = useRouter()
    const { cart } = useCartStore()
    const [showMenu, setShowMenu] = useState(false)

    useEffect(() => {
        setShowMenu(false)
    }, [pathname])

    const cartItemsTotal = cartItemsCount(cart)

    return (
        <div className="fixed top-0 z-50 w-full py-8 bg-white">
            <div className="relative mx-auto flex w-[90%] max-w-[1444px] items-center justify-between lg:w-full lg:px-10 xl:px-20">
                <Link href="/">
                    <a className="z-10 shrink-0">
                        <Image src="/logo.svg" width={120} height={32} />
                    </a>
                </Link>
                <div
                    className={`fixed inset-0 ${
                        showMenu ? '' : 'translate-x-full lg:translate-x-0'
                    } flex transform flex-col items-center gap-12 bg-white pt-32 transition-all duration-200 lg:static lg:flex-row lg:pt-0`}
                >
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
                <div className="flex items-center">
                    <Link href="/cart">
                        <a className="relative">
                            <div className="absolute -right-1 -top-0.5 h-4 w-4 rounded-full bg-red-600">
                                <p className="absolute text-xs font-semibold text-white transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                                    {cartItemsTotal}
                                </p>
                            </div>
                            <Buy set="bold" size={32} />
                        </a>
                    </Link>
                    <div
                        className="z-10 w-6 ml-8 bg-red-500 cursor-pointer lg:hidden"
                        onClick={() => setShowMenu((prev) => !prev)}
                    >
                        <span
                            className={`absolute block h-0.5 w-6 transform rounded-full bg-gray-900 transition duration-500 ease-in-out ${
                                showMenu ? 'rotate-45' : '-translate-y-2'
                            }`}
                        />
                        <span
                            className={`absolute block h-0.5 w-6 transform rounded-full bg-gray-900 transition duration-500 ease-in-out ${
                                showMenu && '-translate-x-6 opacity-0'
                            }`}
                        />
                        <span
                            className={`absolute block h-0.5 w-6 transform rounded-full bg-gray-900 transition duration-500 ease-in-out ${
                                showMenu ? '-rotate-45' : 'translate-y-2'
                            }`}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header
