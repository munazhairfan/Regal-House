import React from 'react'

const footer2 = () => {
  return (
    <div className='w-full h-[300px] xs:flex-col flex justify-evenly bg-fahad items-center lg:flex-row'>
      <div className='lg:w-[376px] xs:w-full h-[108px] xs:ml-2 lg:ml-0'>
        <p className='font-medium lg:text-3xl xs:text-xl leading-[48px]'>Free Delivery</p>
        <p className='lg:text-xl xs:text-sm text-hackathon'>For all oders over $50, consectetur adipim scing elit.</p>
      </div>
      <div className='lg:w-[376px] xs:w-full h-[108px] xs:ml-2 lg:ml-0'>
        <p className='font-medium lg:text-3xl xs:text-xl leading-[48px]'>90 Days Return</p>
        <p className='lg:text-xl xs:text-sm text-hackathon'>If goods have problems, consectetur adipim scing elit.</p>
      </div>
      <div className='lg:w-[376px] xs:w-full h-[108px] xs:ml-2 lg:ml-0'>
        <p className='font-medium lg:text-3xl xs:text-xl leading-[48px]'>Secure Payment</p>
        <p className='lg:text-xl xs:text-sm text-hackathon'>100% secure payment, consectetur adipim scing elit.</p>
      </div>
    </div>
  )
}

export default footer2
