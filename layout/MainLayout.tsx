import React from 'react'

type Props = {
  children: React.ReactNode
}

const MainLayout = ({ children }: Props) => {
  return (
      <>
        <div className='w-[90%] lg:w-full max-w-[1444px] lg:px-10 xl:px-20 relative mx-auto'>
            {children}
        </div>
      </>
  )
}

export default MainLayout
