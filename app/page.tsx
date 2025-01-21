import React from 'react'
import Image from 'next/image'
import imageUrlBuilder from '@sanity/image-url';
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import Link from 'next/link';
import client from "./sanity";

export interface Product {
  _id: string;
  _type: "product";
  id: string;
  name: string;
  description: string;
  imagePath: {
    _type: "image";
    asset: {
      _ref: string;
      _type: "reference";
    };
  };
  price: string;
  discountPercentage?: number;
  category?: string;
  isFeaturedProduct?: boolean;
  stockLevel?: number;
}

export default async function Home() {

  const randomNumber = Math.floor(Math.random() * 60) + 1;
  
  const products:Product[] = await client.fetch(`*[_type == 'product'][0...3]`);
  const newArrival:Product = await client.fetch(`*[_type == 'product'] | order(id desc)[0]`);
  const heroImage:Product = await client.fetch(`*[_type == 'product' && id == '${randomNumber}'][0]`);
  console.log(randomNumber)
    const builder = imageUrlBuilder(client);
  
    const urlFor = (source: SanityImageSource) => builder.image(source);

  return (
    <>
    <div className="bg-hamza">
    </div>
    <div className="font-poppins">
      {/* hero div */}
      <div className="w-full lg:h-[900px] h-[600px]  bg-hamza flex items-center justify-center lg:flex-row flex-col-reverse">
        <div className="lg:w-[440px] flex flex-col justify-between">
        <div className="">
          <p className="font-medium xl:text-[64px] lg:text-5xl lg:leading-[96px] text-3xl">{heroImage.name}</p>
        </div>
        <div className="w-[121px] h-[49px] border-b-2 border-black">
          <Link href={"/products/"+heroImage.id} className="text-[24px] leading-[36px] font-medium">Shop Now</Link>
        </div>
        </div>
        <div className="lg:w-[600px] lg:h-[600px] size-80">
          <Image src={urlFor(heroImage.imagePath).width(600).height(600).url()}
           alt="seater image"
          height={600} width={600}></Image>
        </div>
      </div>
      {/* div 2 */}
      {/* div 3 */}
      <div className="w-full lg:h-[777px] flex flex-col justify-evenly h-[1800px] md:h-[1400px]">
        {/* text div */}
        <div className="w-full h-[85px] flex flex-col justify-between">
          <p className="font-medium text-[36px] leading-[54px] text-center">Top Picks For You</p>
          <p className="text-hackathon font-medium leading-6 text-center">Find a bright ideal to suit your taste with our great selection of suspension, floor and table lights.</p>
        </div>
        {/* furniture div */}
        <div className="flex justify-center w-full md:p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-24 lg:gap-16">
        {
          products.map((p)=>{
            return(
              <div className="w-[287px] h-[390px] shadow-lg transition hover:scale-105 mt-3
                    rounded-e-lg" key={p._id}>
                        <Link href={"/products/"+p.id}>
                    <div className="w-[287px] h-[287px] flex justify-center items-center flex-col">
                      <Image src={urlFor(p.imagePath).width(287).height(287).url()}
                       alt="table" height={287} width={287}
                      className='rounded-lg'></Image>
                  </div>
                  <div className='ml-3 w-full mt-2'>
                  <p className="w-[212px]">{p.name}</p>
                  <p className="font-medium leading-[48px] text-[24px] text-slate-600">$ {p.price}</p>
                  </div>
                  </Link>
                  </div>
            )
          })
        }
        </div>
        </div>
        {/* view */}
        <div className="w-full flex justify-center items-center">
        <Link href={'/shop'} className="font-medium text-xl
         border-b-2 leading-[54px] border-black w-[110px]">View More</Link>
        </div>
      </div>
      {/* div 3 */}
      <div className="w-full h-[639px] bg-fahad flex lg:flex-row flex-col lg:justify-evenly items-center">
        <Image 
        src={urlFor(newArrival.imagePath).width(920).height(639).url()}
         alt="asgaard sofa" className="md:size-96 lg:w-[800px] lg:h-[500px]"
         height={639} width={920}></Image>
          <div className="text-center flex flex-col items-center justify-center">
         <div className="h-[210px]">
            <p className="font-medium text-[24px] leading-[36px]">New Arrivals</p>
            <p className="font-bold text-[48px] leading-[72px]">{newArrival.name}</p>
            <Link href={"/products/"+newArrival.id}>
            <button className="border text-xl w-[225px] h-16 mt-8 border-black">Order Now</button>
            </Link>
          </div>
          </div>
      </div>
      {/* div 4 */}
      <div className="w-full h-[944px] flex flex-col justify-evenly xl:px-[90px]">
        {/* text div */}
        <div className="w-full h-[85px] flex flex-col justify-between">
          <p className="font-medium text-[36px] leading-[54px] text-center">Top Picks For You</p>
          <p className="text-hackathon font-medium leading-6 text-center">Find a bright ideal to suit your taste with our great selection of suspension, floor and table lights.</p>
        </div>
        {/* blog div */}
        <div className="w-full h-[554px] flex flex-col justify-between">
          <div className="w-full h-[555px]
          flex lg:justify-evenly justify-center xl:justify-between">
          {/* blog one */}
          <div className="md:w-[393px] w-[320px] h-[555px] flex flex-col justify-between items-center">
            <Image src={'/images/blog one.png'} alt="blog one" height={393} width={393}
            className="h-[393px] md:w-[393px] w-[320px]"></Image>
            <div className="md:w-[339px] w-[320px] h-[120px] flex flex-col justify-between items-center">
                <p className="lg:text-xl leading-[30px] text-base">Going all-in with millennial design</p>
                <Link href={'/blog'} className="w-[112px] leading-[36px] text-xl font-medium border-b-2 
                border-black cursor-pointer">Read More</Link>
                <div className="w-[223px] h-5 flex justify-between">
                  <div className="flex w-[73px] h-6 justify-between items-center">
                    <Image src={'/images/clock.png'} alt="clock" height={18} width={18}
                    className="h-[18px]"></Image>
                    <p>5 min</p>
                  </div>
                  <div className="flex w-[131px] h-6 justify-between items-center">
                    <Image src={'/images/calendar.png'} alt="calendar" height={18} width={18}
                    className="h-[18px]"></Image>
                    <p>12<sup>th</sup> Oct 2022</p>
                  </div>
                  
                </div>
            </div>
          </div>
          {/* blog two */}
          <div className="w-[393px] h-[555px] lg:flex flex-col justify-between items-center hidden">
            <Image src={'/images/blog two.png'} alt="blog two" height={393} width={393}
            className="h-[393px] w-[393px]"></Image>
            <div className="w-[339px] h-[120px] flex flex-col justify-between items-center">
                <p className="text-xl leading-[30px]">Going all-in with millennial design</p>
                <Link href={'/blog'} className="w-[112px] leading-[36px] text-xl font-medium border-b-2 
                border-black cursor-pointer">Read More</Link>
                <div className="w-[223px] h-5 flex justify-between">
                  <div className="flex w-[73px] h-6 justify-between items-center">
                    <Image src={'/images/clock.png'} alt="clock" height={18} width={18}
                    className="h-[18px]"></Image>
                    <p>5 min</p>
                  </div>
                  <div className="flex w-[131px] h-6 justify-between items-center">
                    <Image src={'/images/calendar.png'} alt="calendar" height={18} width={18}
                    className="h-[18px]"></Image>
                    <p>12<sup>th</sup> Oct 2022</p>
                  </div>
                  
                </div>
            </div>
          </div>
          {/* blog three */}
          <div className="w-[393px] h-[555px] xl:flex flex-col justify-between items-center hidden">
            <Image src={'/images/blog three.png'} alt="blog three" height={393} width={393}
            className="h-[393px] w-[393px]"></Image>
            <div className="w-[339px] h-[120px] flex flex-col justify-between items-center">
                <p className="text-xl leading-[30px]">Going all-in with millennial design</p>
                <Link href={'/blog'} className="w-[112px] leading-[36px] text-xl font-medium border-b-2 
                border-black cursor-pointer">Read More</Link>
                <div className="w-[223px] h-5 flex justify-between">
                  <div className="flex w-[73px] h-6 justify-between items-center">
                    <Image src={'/images/clock.png'} alt="clock" height={18} width={18}
                    className="h-[18px]"></Image>
                    <p>5 min</p>
                  </div>
                  <div className="flex w-[131px] h-6 justify-between items-center">
                    <Image src={'/images/calendar.png'} alt="calendar" height={18} width={18}
                    className="h-[18px]"></Image>
                    <p>12<sup>th</sup> Oct 2022</p>
                  </div>
                  
                </div>
            </div>
          </div>
          </div>
        </div>
        {/* view div */}
        <div className="w-full flex justify-center items-center">
        <Link href={'/blog'} className="font-medium text-xl cursor-pointer
         border-b-2 leading-[54px] border-black w-[126px]">View All Post</Link>
        </div>
      </div>
      {/* div 5 */}
      <div className="w-full h-[450px] flex justify-center items-center bg-instagram">
        <div className="w-[454px] h-[202px] flex flex-col justify-between items-center">
          <div className="flex flex-col justify-between items-center">
            <p className="font-bold lg:text-[60px] leading-[90px] text-4xl">Our Instagram</p>
            <p className="text-xl leading-[30px]">Follow our store on Instagram</p>
          </div>
          <button className="rounded-full w-[225px] h-16 shadow-lg bg-fahad">Follow Us</button>
        </div>
      </div>
    </div>
    </>
  );
}
