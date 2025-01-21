import React from 'react'
import Image from 'next/image'
import Footer2 from '@/components/footer2'

const page = () => {
  return (
    <div>
      <div className='font-poppins'>
      <div className="h-[316px] w-full bg-components_bg flex justify-center items-center">
          <div className="flex justify-between items-center flex-col">
            <Image
              src={"/images/logo.png"}
              alt="logo"
              height={77}
              width={77}
            ></Image>
            <p className="font-medium text-[52px] leading-10">Contact</p>
            <div className="flex w-[170px] h-16 justify-between text-xl items-center">
              <p className="font-medium">Home</p>
              <p>
                <Image
                  src={"/images/arrow.png"}
                  alt="arrow"
                  height={8}
                  width={14}
                  className="h-[18px] w-[10px]"
                ></Image>
              </p>
              <p className="font-light">Contact</p>
            </div>
          </div>
        </div>
        {/* main */}
                <div className='w-full pt-16'>
        <p className='font-semibold text-[36px] leading-[54px] text-center'>Get In Touch With Us</p>
            <p className='text-center text-hackathon'>For More Information About Our Product & Services. Please Feel Free To Drop Us 
                <br></br> An Email. Our Staff Always Be There To Help You Out. Do Not Hesitate!</p>
        <div className='w-full lg:pt-[50px]
        lg:px-[191px] flex justify-center flex-col lg:flex-row'>
            <div className='lg:w-[393px] h-[600px] flex flex-col px-[54px] py-[62px] justify-between'>
                {/* 1 */}
                <div>
                <div className='flex'>
                    <Image src={'/images/location.png'} alt='location'
                    width={22} height={28.18} className='w-[22px] h-[28.28px]'></Image>
                <p className='font-medium text-2xl ml-8'>Address</p>
                </div>
                <p className='ml-[52px]'>236 5th SE Avenue, New <br></br>York NY10000, United <br></br>States</p>
                </div>
                {/* 2 */}
                <div>
                <div className='flex'>
                    <Image src={'/images/phone.png'} alt='phone'
                    width={22} height={28.18} className='w-[22px] h-[28.28px]'></Image>
                <p className='font-medium text-2xl ml-8'>Phone</p>
                </div>
                <p className='ml-[52px]'>Mobile: +(84) 546-6789 <br></br>Hotline: +(84) 456-6789</p>
                </div>
                {/* 3 */}
                <div>
                <div className='flex'>
                    <Image src={'/images/time.png'} alt='time'
                    width={22} height={28.18} className='w-[22px] h-[28.28px]'></Image>
                <p className='font-medium text-2xl ml-8'>Working Time</p>
                </div>
                <p className='ml-[52px]'>Monday-Friday: 9:00 - <br></br>22:00 <br></br>Saturday-Sunday: 9:00 - <br></br>21:00</p>
                </div>
            </div>

        </div>
        </div>
      </div>
      <Footer2/>
    </div>
  )
}

export default page
