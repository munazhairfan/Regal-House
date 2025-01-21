// /app/search/[query]/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation"; // useParams to capture the query
import client from "../../sanity"; // Assuming your Sanity client is set up
import Link from "next/link";
import Image from "next/image";
import imageUrlBuilder from '@sanity/image-url';
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

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

const SearchResults = () => {
  const { query } = useParams(); // Capture the dynamic segment from the URL
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!query) return; // If there's no query, return early

    const fetchFilteredProducts = async () => {
      setLoading(true);
      try {
        // Sanity query to search for products that match the query in the name or description
        const filterQuery = `*[_type == "product" && (name match "${query}" || description match "${query}")][0...12]`;
        const fetchedProducts = await client.fetch(filterQuery);
        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFilteredProducts();
  }, [query]); // Re-run effect when the query changes

  if (loading) {
    return <div className="h-screen flex flex-col justify-center items-center">
    <div className="lg:h-[80px] lg:w-[80px] xs:h-[40px] xs:w-[40px] lg:border-8 xs:border-4 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
  </div>;
  }
  const builder = imageUrlBuilder(client);
  const urlFor = (source: SanityImageSource) => builder.image(source);

  return (
    <div className="font-poppins">
      <p className="text-xl text-hackathon text-center mt-3">Search Results for: &quot;{query}&quot;</p>
      <div className='flex justify-center'>
              <div className='grid xs:grid-col-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 py-6'>
        {products.length > 0 ? (
          products.map((product) => {
            const imageUrl = urlFor(product.imagePath).width(287).height(287).url();
            console.log(product.id)
            return(
            <div className="w-[287px] h-[390px] shadow-lg transition hover:scale-105 mt-3
                    rounded-e-lg" key={product._id}>
                        <Link href={"/products/"+product.id}>
                    <div className="w-full h-[287px] flex justify-center items-center flex-col">
                      <Image src={imageUrl} alt="table" height={287} width={287}
                      className='rounded-lg'></Image>
                  </div>
                  <div className='ml-3 w-full mt-2'>
                  <p className="w-full">{product.name}</p>
                  <div className='flex w-full justify-between'>
                  <p className="font-medium leading-[48px] text-[24px] text-slate-600">$ {product.price}</p>
                  </div>
                  </div>
                  </Link>
                  </div>
                  )
                    })
        ) : (
          <p>No products found</p>
        )}
      </div>
      </div>
    </div>
  );
};

export default SearchResults;
