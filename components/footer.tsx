import React from 'react'

const footer = () => {
  return (
    <div className='font-poppins w-full
    flex flex-col justify-between'> 
    {/* <div className='font-poppins w-full lg:h-[555px] xl:px-[90px] xl:pt-[90px] xl:pb-[40px] 
    flex flex-col justify-between xs:h-[1000px]'>  */}
        {/* <div className='lg:h-[312px] flex justify-evenly lg:flex-row xs:flex-col xs:h-[900px]
        xs:ml-11 lg:ml-0'> */}
        <div className='w-full justify-center items-center lg:p-28 p-12 md:p-3'>
        <div className='grid grid-cols-1 gap-28 mb-8 md:grid-cols-4 md:gap-10'>
            <div className='flex h-[312px] items-center'>
                <p className='text-hackathon'>400 University Drive Suite 200 Coral Gables, FL 33134 USA</p>
            </div>
            <div>
                <ul className='font-medium h-[312px] flex justify-between flex-col text-center
                '>
                    <li className='text-hackathon'>Links</li>
                    <li>Home</li>
                    <li>Shop</li>
                    <li>About</li>
                    <li>Contact</li>
                </ul>
            </div>
            <div className=''>
                <ul className='font-medium h-[242px] flex text-center
                 justify-between flex-col'>
                    <li className='text-hackathon'>Help</li>
                    <li>Payment Options</li>
                    <li>Returns</li>
                    <li>Privacy Policies</li>
                </ul>
            </div>
            <div className='w-[286px] lg:w-[286px] md:w-auto h-[101px] text-hackathon
             flex justify-between items-center flex-col mx-auto md:text-[10px] lg:text-base'>
                <p className=''>Newsletter</p>
                <div className='flex justify-evenly flex-col'>
                    <input placeholder='Enter Your Email Address'
                    className='leading-[21px] border-b-2'></input>
                    <button className='leading-[21px] border-b-2 text-black'>SUBSCRIBE</button>
                </div>
            </div>
        </div>
        <div className='w-full lg:h-[59px] flex items-end border-t-2 xs:h-[80px] justify-center'>
            <p>2022 Meubel House. All rights reverved</p>
        </div>
      </div>
      </div>
  )
}

export default footer
