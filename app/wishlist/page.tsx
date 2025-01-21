"use client"
import React,{useEffect,useState} from 'react'
import Image from 'next/image';

type WishList = {
    _id: string;
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
  };

const WishList = () => {
    const [wishList, setWishList] = useState<WishList[]>([]);

  useEffect(() => {
    const savedList = JSON.parse(localStorage.getItem("wishList") || "[]");
    setWishList(savedList);
  }, []);

  const updateLocalStorage = (updatedList: WishList[]) => {
    localStorage.setItem("wishList", JSON.stringify(updatedList));
  };
  const removeFromList = (productId: string) => {
    setWishList((preList) => {
      const updatedList = preList.filter(
        (product) => product.id !== productId
      );
      updateLocalStorage(updatedList);
      return updatedList;
    });
  };
  return (
    <div className='font-poppins'>
      {wishList.length === 0 ? (
        <div className="ml-4 py-8">Your wishlist is empty.</div>
      ) : (
        wishList.map((product) => (
          <div
            key={product.id}
            className="w-full bg-pinki h-24 flex items-center justify-evenly mt-5"
          >
              <div className="flex size-5 justify-center items-center
               text-white relative rounded-full bg-slate-700" onClick={() => removeFromList(product.id)}>
                x
              </div>
            <Image
              src={product.image}
              alt={product.name}
              height={60}
              width={60}
              className="rounded-sm"
            />
            <div className="flex flex-col w-8/12">
              <div className="font-semibold text-pink-950">{product.name}</div>
            </div>
          </div>
        ))
      )}
      </div>
  )
}

export default WishList
