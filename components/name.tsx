import React from 'react'
import Image from 'next/image'

const Name = () => {
  return (
    <div className='flex w-full items-center bg-hamza font-poppins justify-center'>
      <Image src={'/images/logo.png'} alt='logo' width={100} height={100}
      className='md:size-24 size-14'></Image>
      <h1 className='bold md:text-5xl xs:text-3xl text-yellow-800'>Regal House</h1>
    </div>
  )
}

export default Name
