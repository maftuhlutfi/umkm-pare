import { useRouter } from 'next/router'
import React from 'react'
import CheckoutHeader from '../../components/Checkout/CheckoutHeader'
import Footer from '../../components/shared/Footer'
import Header from '../../components/shared/Header'
import WantJoinSection from '../../components/shared/WantJoinSection'

type Props = {
    children: React.ReactNode
}

const MainLayout = ({ children }: Props) => {
    const isCheckoutPage = useRouter().pathname === '/checkout'

    return (
        <>
            {isCheckoutPage ? <CheckoutHeader /> : <Header />}
            <div className="font relative mx-auto mt-36 mb-28 min-h-screen w-[90%] max-w-[1444px] lg:w-full lg:px-10 xl:px-20">
                {children}
            </div>
            <WantJoinSection />
            <Footer />
        </>
    )
}

export default MainLayout
