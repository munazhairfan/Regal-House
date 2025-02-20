import Image from "next/image";
import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import WishList from "../app/wishlist/page";
import SearchBar from "@/components/searchBar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const header = () => {
  // const addToCart = (product: WishList) => {
  //   setWishList((prevCart) => {
  //     const productIndex = prevCart.findIndex((item) => item.id === product.id);
  //     let updatedList;
  //     if (productIndex > -1) {
  //       updatedList = [...prevCart];
  //       updatedList[productIndex].quantity += 1;
  //     } else {
  //       updatedList = [...prevCart, { ...product, quantity: 1 }];
  //     }

  //     updateLocalStorage(updatedList);
  //     return updatedList;
  //   });
  // };

  // const updateQuantity = (
  //   productId: string,
  //   action: "increase" | "decrease"
  // ) => {
  //   setWishList((prevCart) => {
  //     return prevCart.map((product) => {
  //       if (product.id === productId) {
  //         return {
  //           ...product,
  //           quantity:
  //             action === "increase"
  //               ? product.quantity + 1
  //               : Math.max(1, product.quantity - 1),
  //         };
  //       }
  //       return product;
  //     });
  //   });
  // };

  // const getTotalPrice = () => {
  //   return wishList
  //     .reduce((total, product) => total + product.price * product.quantity, 0)
  //     .toFixed(2);
  // };

  return (
    <div className="w-full h-[100px] flex font-poppins flex-row-reverse bg-hamza">
      <div
        className="lg:w-[1050px] flex lg:flex-row-reverse justify-around h-[100px] items-center xs:flex-col
      xs:items-center xs:w-full"
      >
        <div className="w-[215px] h-7 flex justify-between items-center cursor-pointer">
          <Link href={"/signup"}>
            <Image
              src={"/images/user.png"}
              alt="user"
              height={28}
              width={28}
            ></Image>
          </Link>
          <Popover>
            <PopoverTrigger>
                <Image
                  src={"/images/search.png"}
                  alt="user"
                  height={28}
                  width={28}
                ></Image>
            </PopoverTrigger>
            <PopoverContent>
              <SearchBar />
            </PopoverContent>
          </Popover>
          <Sheet>
            <SheetTrigger>
              <Image
                src={"/images/heart.png"}
                alt="user"
                height={28}
                width={28}
              ></Image>
            </SheetTrigger>
            <SheetContent>
              <p className="bold text-2xl text-center">Wishlist</p>
              <WishList />
              {/* <SheetHeader>
      <SheetTitle>Are you absolutely sure?</SheetTitle>
      <SheetDescription>
        This action cannot be undone. This will permanently delete your account
        and remove your data from our servers.
      </SheetDescription>
    </SheetHeader> */}
            </SheetContent>
          </Sheet>

          <Link href={"/cart"}>
            <Image
              src={"/images/cart.png"}
              alt="user"
              height={28}
              width={28}
            ></Image>
          </Link>
        </div>
        <div className="lg:w-[430px] h-6 flex items-center xs:w-full xs:p-3 xs:justify-center">
          <ul
            className="flex justify-between w-[430px] font-medium cursor-pointer text-black
            no-underline"
          >
            <li>
              <Link href={"/"}>Home</Link>
            </li>
            <li>
              <Link href={"/shop"}>Shop</Link>
            </li>
            <li>
              <Link href={"/about"}>About</Link>
            </li>
            <li>
              <Link href={"/contact"}>Contact</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
export default header;
