"use client";
import client from "../../sanity";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Header2 from "@/components/header2";
import imageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import Link from "next/link";
import Image from "next/image";

interface Product {
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

const Page = () => {
  const { category } = useParams();
  const [product, setProduct] = useState<Product[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!category) return;

    const query = `*[_type == 'product' && category == "${category}"]`;

    async function fetchProducts() {
      try {
        setLoading(true); // Set loading to true before the fetch
        const data: Product[] = await client.fetch(query);
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
        setProduct([]); // Set empty array in case of an error
      } finally {
        setLoading(false); // Always set loading to false when the request finishes
      }
    }

    fetchProducts();
  }, [category]);

  if (loading)
    return (
  <div className="h-screen flex flex-col justify-center items-center">
      <div
        className="lg:h-[80px] lg:w-[80px] xs:h-[40px] xs:w-[40px] lg:border-8
        xs:border-4 border-gray-300
        border-t-gray-600 rounded-full animate-spin"
        ></div>
      </div>
  );
  if (!product && !loading) return <div>Product not found</div>;

  const builder = imageUrlBuilder(client);
  const urlFor = (source: SanityImageSource) => builder.image(source);

  return (
    <div>
      <Header2 />
      <div>
        <h1 className="text-5xl font-poppins bold text-center mt-2">
          {category}
        </h1>
      <div className="w-full flex justify-center pb-8">
        <div className="grid xs:grid-col-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 py-6">
          {product?.map((products) => {
            return (
              <div
                className="w-[287px] h-[390px] shadow-lg transition hover:scale-105 mt-3
                    rounded-e-lg"
                key={products._id}
              >
                <Link href={"/products/" + products.id}>
                  <div className="w-[287px] h-[287px] flex justify-center items-center flex-col">
                    {/* <Image src={imageUrl} alt="table" height={287} width={287}
                      className='rounded-lg'></Image> */}
                    <Image
                    className="rounded-lg"
                      src={
                        products?.imagePath
                          ? urlFor(products.imagePath)
                              .width(287)
                              .height(287)
                              .url()
                          : "/image.png"
                      }
                      alt="sofa"
                      height={287}
                      width={287}
                    ></Image>
                  </div>
                  <div className="ml-3 w-full mt-2">
                    <p className="w-[212px]">{products.name}</p>
                    <p className="font-medium leading-[48px] text-[24px] text-slate-600">
                      $ {products.price}
                    </p>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
