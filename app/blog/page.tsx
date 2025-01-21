import React from "react";
import Footer2 from "@/components/footer2";
import Image from "next/image";
import Link from "next/link";

const page = () => {
  return (
    <>
      <div className="font-poppins">
        <div className="h-[316px] w-full bg-components_bg flex justify-center items-center">
          <div className="flex justify-between items-center flex-col">
            <Image
              src={"/images/logo.png"}
              alt="logo"
              height={77}
              width={77}
            ></Image>
            <p className="font-medium text-[52px] leading-10">Blog</p>
            <div className="flex w-[140px] h-16 justify-between text-xl items-center">
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
              <p className="font-light">Blog</p>
            </div>
          </div>
        </div>
        {/* main */}
        <div className="w-full lg:px-[100px] lg:py-[100px]
         flex justify-center">
            {/* blog one */}
            <div>
            <div className="lg:w-[830px] flex flex-col gap-5 mt-10 xs:justify-center px-2">
            <div className="lg:w-full justify-center">
              <Image
                src={"/images/b1.png"}
                alt="blog 3"
                width={830}
                height={500}
                className="rounded-[15px]"
              ></Image>
            </div>
            <div className="lg:w-[400px] flex lg:justify-between xs:justify-evenly">
              <div className="flex lg:w-[100px] justify-between items-center">
                <Image
                  src={"/images/user.png"}
                  alt="user"
                  width={28}
                  height={28}
                ></Image>
                <p className="text-hackathon lg:text-xl xs:text-sm">Admin</p>
              </div>
              <div className="flex lg:w-[150px] justify-between items-center">
                <Image
                  src={"/images/calendar.png"}
                  alt="calendar"
                  width={28}
                  height={28}
                ></Image>
                <p className="text-hackathon lg:text-xl xs:text-sm">14 Oct 2022</p>
              </div>
              <div className="flex lg:w-[100px] justify-between items-center">
                <Image
                  src={"/images/tag.png"}
                  alt="tag"
                  width={28}
                  height={28}
                ></Image>
                <p className="text-hackathon lg:text-xl xs:text-sm">Wood</p>
              </div>
            </div>
            {/* paragraph */}
            <div className="flex flex-col gap-3">
              <p className="font-semibold lg:text-4xl text-2xl">
                Going all-in with millennial design
              </p>
              <p className="text-hackathon">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Cupiditate voluptatem repellendus officia maiores inventore
                magni explicabo veritatis sit dicta enim? Officia itaque modi
                perferendis provident. Culpa possimus inventore natus omnis.
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Repudiandae, ab cumque! Doloremque sed pariatur alias architecto
                ipsa quae suscipit quo tempore necessitatibus, velit recusandae
                ullam nam. Excepturi est commodi blanditiis! Lorem, ipsum d olor
                sit amet consectetur adipisicing elit. Illum perferendis neque
                nobis, esse nisi maxime suscipit facere? Nostrum ad aut pariatur
                esse eius, porro doloribus vel, error veritatis, necessitatibus
                quam.
              </p>
            </div>
            <div>
            <Link href={'/blog'} className="lg:w-[112px] leading-[36px] border-b 
                border-black cursor-pointer">Read More</Link>
            </div>
          </div>
          {/* blog two */}
          <div className="lg:w-[830px] flex flex-col gap-5 mt-10 xs:justify-center px-2">
            <div className="lg:w-full justify-center">
              <Image
                src={"/images/b2.png"}
                alt="blog 3"
                width={830}
                height={500}
                className="rounded-[15px]"
              ></Image>
            </div>
            <div className="lg:w-[400px] flex lg:justify-between xs:justify-evenly">
              <div className="flex lg:w-[100px] justify-between items-center">
                <Image
                  src={"/images/user.png"}
                  alt="user"
                  width={28}
                  height={28}
                ></Image>
                <p className="text-hackathon lg:text-xl xs:text-sm">Admin</p>
              </div>
              <div className="flex lg:w-[150px] justify-between items-center">
                <Image
                  src={"/images/calendar.png"}
                  alt="calendar"
                  width={28}
                  height={28}
                ></Image>
                <p className="text-hackathon lg:text-xl xs:text-sm">14 Oct 2022</p>
              </div>
              <div className="flex lg:w-[100px] justify-between items-center">
                <Image
                  src={"/images/tag.png"}
                  alt="tag"
                  width={28}
                  height={28}
                ></Image>
                <p className="text-hackathon lg:text-xl xs:text-sm">Wood</p>
              </div>
            </div>
            {/* paragraph */}
            <div className="flex flex-col gap-3">
              <p className="font-semibold lg:text-4xl text-2xl">
                Exploring new ways of decorating
              </p>
              <p className="text-hackathon">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Cupiditate voluptatem repellendus officia maiores inventore
                magni explicabo veritatis sit dicta enim? Officia itaque modi
                perferendis provident. Culpa possimus inventore natus omnis.
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Repudiandae, ab cumque! Doloremque sed pariatur alias architecto
                ipsa quae suscipit quo tempore necessitatibus, velit recusandae
                ullam nam. Excepturi est commodi blanditiis! Lorem, ipsum d olor
                sit amet consectetur adipisicing elit. Illum perferendis neque
                nobis, esse nisi maxime suscipit facere? Nostrum ad aut pariatur
                esse eius, porro doloribus vel, error veritatis, necessitatibus
                quam.
              </p>
            </div>
            <div>
            <Link href={'/blog'} className="lg:w-[112px] leading-[36px] border-b 
                border-black cursor-pointer">Read More</Link>
            </div>
          </div>
          {/* blog three */}
          <div className="lg:w-[830px] flex flex-col gap-5 mt-10 xs:justify-center px-2">
            <div className="lg:w-full justify-center">
              <Image
                src={"/images/b3.png"}
                alt="blog 3"
                width={830}
                height={500}
                className="rounded-[15px]"
              ></Image>
            </div>
            <div className="lg:w-[400px] flex lg:justify-between xs:justify-evenly">
              <div className="flex lg:w-[100px] justify-between items-center">
                <Image
                  src={"/images/user.png"}
                  alt="user"
                  width={28}
                  height={28}
                ></Image>
                <p className="text-hackathon lg:text-xl xs:text-sm">Admin</p>
              </div>
              <div className="flex lg:w-[150px] justify-between items-center">
                <Image
                  src={"/images/calendar.png"}
                  alt="calendar"
                  width={28}
                  height={28}
                ></Image>
                <p className="text-hackathon lg:text-xl xs:text-sm">14 Oct 2022</p>
              </div>
              <div className="flex lg:w-[100px] justify-between items-center">
                <Image
                  src={"/images/tag.png"}
                  alt="tag"
                  width={28}
                  height={28}
                ></Image>
                <p className="text-hackathon lg:text-xl xs:text-sm">Wood</p>
              </div>
            </div>
            {/* paragraph */}
            <div className="flex flex-col gap-3">
              <p className="font-semibold lg:text-4xl text-2xl">
                Handmade pieces that took time to make
              </p>
              <p className="text-hackathon">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Cupiditate voluptatem repellendus officia maiores inventore
                magni explicabo veritatis sit dicta enim? Officia itaque modi
                perferendis provident. Culpa possimus inventore natus omnis.
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Repudiandae, ab cumque! Doloremque sed pariatur alias architecto
                ipsa quae suscipit quo tempore necessitatibus, velit recusandae
                ullam nam. Excepturi est commodi blanditiis! Lorem, ipsum d olor
                sit amet consectetur adipisicing elit. Illum perferendis neque
                nobis, esse nisi maxime suscipit facere? Nostrum ad aut pariatur
                esse eius, porro doloribus vel, error veritatis, necessitatibus
                quam.
              </p>
            </div>
            <div>
            <Link href={'/blog'} className="lg:w-[112px] leading-[36px] border-b 
                border-black cursor-pointer">Read More</Link>
            </div>
          </div>
          </div>
          </div>
      </div>
      <Footer2 />
    </>
  );
};

export default page;
