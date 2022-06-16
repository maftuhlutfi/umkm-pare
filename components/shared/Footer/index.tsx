import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import menuList from '../Header/menuList'
import socialMediaList from './socialMediaList'

type Props = {}

const Footer = (props: Props) => {
    const { pathname } = useRouter()

    return (
        <div className="w-full py-10 bg-gray-900">
            <div className="relative mx-auto flex w-[90%] max-w-[1444px] flex-col justify-between lg:w-full lg:flex-row lg:px-10 xl:px-20">
                <div className="flex flex-col items-center mb-12 text-center lg:mb-0 lg:items-start lg:text-left">
                    <Image src="/logo-white.svg" width={96} height={24} />
                    <p className="mt-4 text-gray-400 lg:max-w-[250px]">
                        Desa Pare. Kecamatan Kranggan, Kabupaten Temanggung,
                        Jawa Tengah 56271
                    </p>
                </div>
                <div className="flex flex-col items-center mb-12 lg:mb-0 lg:items-start">
                    <h3 className="mb-4 text-xl font-bold text-white">Menu</h3>
                    <div className="flex items-center gap-12">
                        {menuList.map(({ title, href }, index) => (
                            <Link key={index} href={href}>
                                <a
                                    className={`${
                                        pathname == href
                                            ? 'font-medium text-gray-200'
                                            : 'text-gray-400'
                                    }`}
                                >
                                    {title}
                                </a>
                            </Link>
                        ))}
                    </div>
                </div>
                <div className="flex flex-col items-center lg:items-start">
                    <h3 className="mb-4 text-xl font-bold text-white">
                        Sosial Media
                    </h3>
                    <div className="flex gap-2">
                        {socialMediaList.map(({ icon, href }, index) => (
                            <a key={index} href={href} target="_blank">
                                <Image src={icon} width={24} height={24} />
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer
