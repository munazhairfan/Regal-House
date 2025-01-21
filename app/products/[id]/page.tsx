"use client";

import React, { useState, useEffect } from "react";
import imageUrlBuilder from "@sanity/image-url";
import { useParams } from "next/navigation";
import Image from "next/image";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import Link from "next/link";
import client from "../../sanity"
import Header2 from "@/components/header2";
import { useToast } from "@/hooks/use-toast"

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

type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
};
type WishlistItem = {
  id: string;
  name: string;
  image: string;
};

const builder = imageUrlBuilder(client);
  
    const urlFor = (source: SanityImageSource) => builder.image(source);
    
    const Page = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const { toast } = useToast()
  
  useEffect(() => {
    if (!id) return;

    const query = `*[_type == 'product' && id == $id][0]`;

    client
      .fetch(query, { id })
      .then((data: Product) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
        setLoading(false);
      });
      const fetchRelatedProducts = async () => {
        if (!product?.category) return; // Ensure that category is available
        const query = `*[_type == 'product' && category == $category && id != $id][0..2]`;
  
        const products = await client.fetch(query, { category: product.category, id });
        setRelatedProducts(products);
      };
  
      if (product?.category) {
        fetchRelatedProducts();
      }
    }, [id, product?.category]);

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

    const addToCart = () => {
      const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
  
      const existingProductIndex = savedCart.findIndex(
        (item: CartItem) => item.id === product?._id
      );
      if (existingProductIndex > -1) {
        savedCart[existingProductIndex].quantity += 1;
      } else {
        savedCart.push({
          id: product?._id,
          name: product?.name,
          price: product?.price,
          quantity: 1,
          image: product?.imagePath?.asset
            ? urlFor(product?.imagePath.asset).width(100).height(100).url()
            : "/logo.png",
        });
      }
  
      localStorage.setItem("cart", JSON.stringify(savedCart));
  
      // alert(`${product?.name} added to cart`);
      toast({
        title: "Added to Cart",
        description: `${product?.name} has been added to you cart!`,
      })
    }
    const addToWishlist = () => {
      let heart = document.getElementsByClassName("heart") as HTMLCollectionOf<HTMLElement>;
      heart[0].style.backgroundColor = "rgb(251 207 232)"
      const savedList = JSON.parse(localStorage.getItem("wishList") || "[]");
  
      const existingProductIndex = savedList.findIndex(
        (item: WishlistItem) => item.id === product?._id
      );
      if (existingProductIndex > -1) {
        savedList[existingProductIndex].quantity += 1;
      } else {
        savedList.push({
          id: product?._id,
          name: product?.name,
          price: product?.price,
          quantity: 1,
          image: product?.imagePath?.asset
            ? urlFor(product?.imagePath.asset).width(100).height(100).url()
            : "/logo.png",
        });
      }
  
      localStorage.setItem("wishList", JSON.stringify(savedList));
  
      // alert(`${product?.name} added to cart`);
      toast({
        className:"bg-fahad",
        title: "Added to Wishlist",
        description: `${product?.name} has been added to you wish list!`,
      })
    }

    return (
    <div className="font-poppins">
      <div className="xl:px-[100px]">
        <div className="w-[320px] lg:w-[400px] h-[100px] flex justify-between items-center xs:mx-auto xl:mx-0 pink">
          <p className="text-hackathon">Home</p>
          <Image
            src={"/images/arrow.png"}
            alt="arrow"
            height={8}
            width={14}
            className="h-[18px] w-[10px]"
          ></Image>
          <p className="text-hackathon">Shop</p>
          <Image
            src={"/images/arrow.png"}
            alt="arrow"
            height={8}
            width={14}
            className="h-[18px] w-[10px]"
          ></Image>
          <div className="w-[1px] border h-10 border-gray-500"></div>
          <p className="ml-2 w-[220px]">{product?.name}</p>
        </div>
        {/* main */}
        <div className="w-full lg:h-[600px] py-[35px] flex xl:justify-between justify-evenly xs:flex-col lg:flex-row md:px-4">
          <div className="lg:w-[530px] lg:h-[500px] flex lg:justify-evenly xs:justify-center">
            
            <div
              className="lg:w-[423px] lg:h-[500px] rounded-[10px] bg-pinki
                flex justify-center items-center xs:size-80"
            >
              <Image
                src={product?.imagePath? urlFor(product.imagePath).width(423).height(391).url():"/image.png"}
                alt="sofa"
                height={391}
                width={423}
              ></Image>
            </div>
          </div>
          {/* 2 */}
          <div className="md:w-[607px] lg:h-[531px] xs:ml-2 lg:ml-0">
            <div className="w-full h-[350px] border-b pb-10 justify-between flex flex-col">
              <p className="text-[42px] leading-[63px]">{product?.name}</p>
              <p className="font-medium leading-[36px] text-[24px] text-hackathon">
                $ {product?.price}
              </p>
              <div className="h-5 flex items-center gap-4 w-[300px] justify-between">
                <div className="h-[18px] flex gap-1">
                  <Image
                    src={"/images/star.png"}
                    alt="star"
                    height={18}
                    width={18}
                  ></Image>
                  <Image
                    src={"/images/star.png"}
                    alt="star"
                    height={18}
                    width={18}
                  ></Image>
                  <Image
                    src={"/images/star.png"}
                    alt="star"
                    height={18}
                    width={18}
                  ></Image>
                  <Image
                    src={"/images/star.png"}
                    alt="star"
                    height={18}
                    width={18}
                  ></Image>
                  <Image
                    src={"/images/star-half.png"}
                    alt="star"
                    height={18}
                    width={9}
                  ></Image>
                </div>
                <div className="w-[1px] border h-10 border-gray-500"></div>
                <div className="text-hackathon text-[13px] leading-5">
                  5 Customer Review
                </div>
              </div>
              <p className="text-[13px] leading-5 lg:w-[424px]">
                {product?.description}
              </p>
              <div className="flex gap-4 items-center">
                <button className="w-[215px] h-[64px] rounded-[10px] border border-black"
                onClick={addToCart}>
                  Add To Cart
                </button>
                <div onClick={addToWishlist} className="size-10 rounded-full flex items-center justify-center heart">
                   <Image src={'/images/heart.png'} alt='user' height={28} width={28}></Image>
                </div>
              </div>
            </div>
            <div className="flex leading-8">
              <p className="text-hackathon">Category</p>
              <p className="text-hackathon ml-[19px]">: {product?.category}</p>
            </div>
            <div className="flex leading-8">
              <p className="text-hackathon">Stock</p>
              <p className="text-hackathon ml-[56px]">
                : {product?.stockLevel}
              </p>
            </div>
            <div className="flex leading-8">
              <p className="text-hackathon">Share</p>
              <div className="text-hackathon h-5 ml-[49px] flex gap-4 justify-center items-center mt-[8px]">
                {" "}
                :
                <Image
                  src={"/images/fb.png"}
                  alt="fb"
                  width={20}
                  height={20}
                ></Image>
                <Image
                  src={"/images/linkedIn.png"}
                  alt="LinkedIn"
                  width={20}
                  height={20}
                ></Image>
                <Image
                  src={"/images/twitter.png"}
                  alt="twitter"
                  width={20}
                  height={20}
                ></Image>
              </div>
            </div>
          </div>
        </div>
       
      </div>
        <hr></hr>
              {/* div 3 */}
              <Header2/>
      <div className="w-full flex flex-col justify-evenly my-4">
        {/* text div */}
        <div className="w-full h-[85px] flex flex-col justify-between">
          <p className="font-medium text-[36px] leading-[54px] text-center">Related Products</p>
        </div>
        {/* furniture div */}
        <div className="flex justify-center w-full md:p-4">
        <div className="grid xs:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-24 md:gap-12">
        {
          relatedProducts.map((p)=>{
            return(
              <div className="w-[287px] h-[390px] shadow-lg transition hover:scale-105 mt-3
                    rounded-e-lg" key={p._id}>
                        <Link href={p.id}>
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
    </div>
  );
};

export default Page;
