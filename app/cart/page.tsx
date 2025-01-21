"use client"
import React, {useEffect,useState} from 'react'
import Footer2 from '@/components/footer2'
import Image from 'next/image'
import Link from 'next/link'

type CartProduct = {
  _id: string;
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
};


const Page = () => {
  const [cart, setCart] = useState<CartProduct[]>([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(savedCart);
  }, []);

  const updateLocalStorage = (updatedCart: CartProduct[]) => {
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const addToCart = (product: CartProduct) => {
    setCart((prevCart) => {
      const productIndex = prevCart.findIndex((item) => item.id === product.id);
      let updatedCart;
      if (productIndex > -1) {
        updatedCart = [...prevCart];
        updatedCart[productIndex].quantity += 1;
      } else {
        updatedCart = [...prevCart, { ...product, quantity: 1 }];
      }

      updateLocalStorage(updatedCart);
      return updatedCart;
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter(
        (product) => product.id !== productId
      );
      updateLocalStorage(updatedCart);
      return updatedCart;
    });
  };

  const updateQuantity = (
    productId: string,
    action: "increase" | "decrease"
  ) => {
    setCart((prevCart) => {
      return prevCart.map((product) => {
        if (product.id === productId) {
          return {
            ...product,
            quantity:
              action === "increase"
                ? product.quantity + 1
                : Math.max(1, product.quantity - 1),
          };
        }
        return product;
      });
    });
  };

  const getTotalPrice = () => {
    return cart
      .reduce((total, product) => total + product.price * product.quantity, 0)
      .toFixed(2);
  };
  return (
    <div className='font-poppins'>
      <div>
      <div className='h-[316px] w-full bg-components_bg flex justify-center items-center'>
            <div className='flex justify-between items-center flex-col'>
            <Image src={'/images/logo.png'} alt='logo'
            height={77} width={77}></Image>
            <p className='font-medium text-[52px] leading-10'>Cart</p>
            <div className='flex w-[140px] h-16 justify-between text-xl items-center'>
                <p className='font-medium'>Home</p>
                <p><Image src={'/images/arrow.png'} alt='arrow' 
                height={8} width={14} className='h-[18px] w-[10px]'></Image></p>
                <p className='font-light'>Cart</p>
            </div>
            </div>
        </div>
        <div className='w-full 
         flex xl:justify-between justify-evenly xl:px-[100px] py-[72px] flex-col lg:flex-row'>
          <div className='flex flex-col'>
      {cart.length === 0 ? (
        <div className="ml-4">Your cart is empty.</div>
      ) : (
        cart.map((product) => {
          return(
            <div className='grid grid-cols-4 bg-slate-100 mb-8 mx-3' key={product._id}>
              <div>
                <p className="mb-8 text-center bg-pinki h-10 flex items-center justify-center">Product</p>
                {/* lg:w-[150px] xs:w-11 xs:h-11 lg:h-[106px] */}
                <div className='rounded-[10px] 
                 md:size-40 size-20 flex justify-center items-center flex-col'>
                   <div className='size-12 md:size-28 flex justify-center items-center'>
                  <Image src={product.image} alt='sofa'
                  height={106} width={106} className='rounded-lg'></Image>
                  </div>
                <p className='md:w-32 w-20 ml-2 md:text-[10px] text-[8px] h-5'>{product.name}</p>
                </div>
                  </div>
              <div>
              <p className="mb-8 text-center bg-pinki h-10 flex items-center justify-center">Price</p>
              <div className='md:size-40 xs:size-20 flex justify-center items-center'>
              <p className=''>{product.price}</p>
              </div>
                
              </div>
              <div>
                <p className="mb-8 text-center bg-pinki h-10 flex items-center justify-center">Quantity</p>
                <div className='md:size-40 xs:size-20 flex justify-center items-center'>
                  <div className='size-24 flex justify-between items-center'>
                <button
                    onClick={() => updateQuantity(product.id, "increase")}
                    className="text-white text-xl h-5 w-5 rounded-full bg-hamza flex items-center justify-center"
                  >
                    +
                  </button>
                  <div className="number w-8 h-8 focus:outline-none border-[3px] border-hamza rounded text-black flex items-center justify-center">
                    {product.quantity}
                  </div>
                  <button
                    onClick={() => updateQuantity(product.id, "decrease")}
                    className="text-white text-xl h-5 w-5 rounded-full bg-hamza flex items-center justify-center"
                  >
                    -
                  </button>
                  </div>
                  </div>
              </div>
              <div>
                <p className="mb-8 text-center bg-pinki h-10 flex items-center justify-center">Subtotal</p>
                <div className='flex md:size-40 xs:size-20 justify-center items-center'>
                <p className=''>{(product.price * product.quantity)}</p>
              </div>
              </div>
              <div className='col-span-4 flex justify-center bg-slate-900'>
            <Image src={'/images/delete.png'} alt='remove'
              height={22} width={21} className='w-[21] h-[22]'
              onClick={() => removeFromCart(product.id)}></Image>
            </div>
            </div>
          )
          })
       )} 
       </div>
        <div className='lg:w-[393px] h-[390px] border bg-pinki lg:px-[75px] px-[20px]
        flex flex-col justify-around pb-20'>
          <p className='font-semibold text-[32px] text-center'>Cart Totals</p>
          <div className='w-full flex justify-between'>
            <p className='font-medium'>Subtotal</p>
            <p>${getTotalPrice()}</p>
          </div>
          <div className='w-full flex justify-between'>
            <p className='font-medium'>Total</p>
            <p className='font-medium text-xl text-eelow'>${getTotalPrice()}</p>
          </div>
          <div className='w-full flex justify-center items-center'>
          <Link href='/checkout' className='w-[222px] h-[59px] border rounded-[15px] border-black text-xl
          flex justify-center items-center'>Check Out</Link>
          </div>
        </div>
        </div>
      </div>
      <Footer2/>
    </div>
  )
}

export default Page
