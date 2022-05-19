import React from 'react'
import Footer from '../../components/shared/Footer'
import Header from '../../components/shared/Header'

type Props = {
    children: React.ReactNode
}

const MainLayout = ({ children }: Props) => {
    return (
        <>
            <Header />
            <div className="font relative mx-auto mt-36 min-h-screen w-[90%] max-w-[1444px] lg:w-full lg:px-10 xl:px-20">
                {children}
            </div>
            <Footer />
        </>
    )
}

export default MainLayout
