import Link from 'next/link'
import React from 'react'
import Button from '../Button'

type Props = {}

const WantJoinSection = (props: Props) => {
    return (
        <div className="w-full py-20 bg-gray-100">
            <div className="relative mx-auto flex w-[90%] max-w-[1444px] items-center justify-between lg:w-full lg:px-10 xl:px-20">
                <div>
                    <h1 className="mb-5 text-4xl">Ingin bergabung?</h1>
                    <p>
                        Yuk hubungi kami agar produk UMKM milikmu ditampilkan di
                        website ini!
                    </p>
                </div>
                <Link href="#" target="_blank" passHref>
                    <Button>Gabung Sekarang!</Button>
                </Link>
            </div>
        </div>
    )
}

export default WantJoinSection