import type { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Button from '../components/shared/Button'
import MainLayout from '../layout/MainLayout'

const Home: NextPage = () => {
    return (
        <>
            <MainLayout>
                <div className="flex items-center justify-between w-full">
                    <div className="mr-20 max-w-[535px]">
                        <h1 className="mb-5 text-5xl leading-tight">
                            Yuk Dukung Kami untuk Indonesia Maju!
                        </h1>
                        <p className="mb-8 text-lg">
                            Beli produk berkualitas kami untuk mendukung UMKM
                            dan ikut berkontribusi dalam memajukan usaha bangsa.
                        </p>
                        <Link href="/product" passHref>
                            <Button>Lihat Produk</Button>
                        </Link>
                    </div>
                    <Image
                        src="/hero-img.jpg"
                        width={665}
                        height={520}
                        className="object-cover shrink-0 "
                    />
                </div>
            </MainLayout>
        </>
    )
}

export default Home
