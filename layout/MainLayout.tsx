import React from 'react'
import Header from '../components/shared/Header'

type Props = {
    children: React.ReactNode
}

const MainLayout = ({ children }: Props) => {
    return (
        <>
            <Header />
            <div className="font relative mx-auto mt-36 w-[90%] max-w-[1444px] lg:w-full lg:px-10 xl:px-20">
                {children}
            </div>
        </>
    )
}

export default MainLayout
