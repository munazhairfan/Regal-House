"use client"
import Image from 'next/image'
import Footer2 from '@/components/footer2'
import imageUrlBuilder from '@sanity/image-url';
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import Link from 'next/link';
import client from "../sanity"
import React, { useEffect, useState } from "react";
import Pagination from "./pagination"; // Import the Pagination component
import Header2 from '@/components/header2'

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

const page = () => {

  const productsPerPage = 15; // Number of products per page
  const [currentPage, setCurrentPage] = useState(1); // Current page
  const [totalPages, setTotalPages] = useState(0); // Total number of pages
  const [products, setProducts] = useState<Product[]>([]); // All products
  const [loading, setLoading] = useState<boolean>(false);
  
  const fetchTotalProductsCount = async () => {
    try {
      const query = '*[_type == "product"]'; // Query to fetch all products
      const totalProducts = await client.fetch(query);
      setTotalPages(Math.ceil(totalProducts.length / productsPerPage)); // Calculate total pages
    } catch (error) {
      console.error("Error fetching total products count:", error);
    }
  };

  // Fetch products for the current page from Sanity
  const fetchProducts = async () => {
    try {
      const startIndex = (currentPage - 1) * productsPerPage; // Start index for current page
      const query = `*[_type == "product"] | order(name) [${startIndex}...${startIndex + productsPerPage}]`; // Query to fetch products for the current page
      const data = await client.fetch(query);
      setProducts(data); // Set the products for the current page
      setLoading(false)
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false)
    }
  };

  useEffect(() => {
    fetchTotalProductsCount(); // Fetch the total product count on mount
  }, []);

  useEffect(() => {
    fetchProducts(); // Fetch products when currentPage changes
  }, [currentPage]);

  // Handle page change
  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return; // Prevent invalid page
    setCurrentPage(newPage); // Update the current page
  };

  
  const builder = imageUrlBuilder(client);
  const urlFor = (source: SanityImageSource) => builder.image(source);

  return (
    <div>
      <div className='pb-20 font-poppins'>
      {loading && (
        <div className="h-screen flex flex-col justify-center items-center">
          <div className="lg:h-[80px] lg:w-[80px] h-[40px] w-[40px] lg:border-8 border-4 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
        </div>
      )}
        {/* images */}
        <div className='h-[316px] w-full bg-components_bg flex justify-center items-center'>
            <div className='flex justify-between items-center flex-col'>
            <Image src={'/images/logo.png'} alt='logo'
            height={77} width={77}></Image>
            <p className='font-medium text-[52px] leading-10'>Shop</p>
            <div className='flex w-[140px] h-16 justify-between text-xl items-center'>
                <p className='font-medium'>Home</p>
                <p><Image src={'/images/arrow.png'} alt='arrow' 
                height={8} width={14} className='h-[18px] w-[10px]'></Image></p>
                <p className='font-light'>Shop</p>
            </div>
            </div>
        </div>
        {/* div 2 */}
        <Header2/>
        {/* div 3 */}
        <div className='flex justify-center'>
              <div className='grid grid-col-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 py-6'>
              {products.map((myProducts)=>{
                const imageUrl = urlFor(myProducts.imagePath).width(287).height(287).url();
                return(
                    <div className="w-[287px] h-[390px] shadow-lg transition hover:scale-105 mt-3
                    rounded-e-lg" key={myProducts._id}>
                        <Link href={"/products/"+myProducts.id}>
                    <div className="w-full h-[287px] flex justify-center items-center flex-col">
                      <Image src={imageUrl} alt="table" height={287} width={287}
                      className='rounded-lg'></Image>
                  </div>
                  <div className='ml-3 w-full mt-2'>
                  <p className="w-full">{myProducts.name}</p>
                  <div className='flex w-full justify-between'>
                  <p className="font-medium leading-[48px] text-[24px] text-slate-600">$ {myProducts.price}</p>
                  </div>
                  </div>
                  </Link>
                  </div>
                )
              })}
              </div>
              </div>
        {/* div 4 */}
        <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      </div>
      <Footer2/>
    </div>
  )
}

export default page
