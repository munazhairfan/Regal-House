import React from "react";
import Image from "next/image";
import Link from "next/link";

const AboutPage = () => {
  return (
    <div className="font-poppins">

      {/* Hero Section */}
        <div className="h-[316px] w-full bg-components_bg flex justify-center items-center">
        <div className="text-center text-slate-800 relative z-10 px-6 sm:px-12 flex flex-col items-center">
            <Image src={"/images/logo.png"} alt="logo" width={80} height={80}></Image>
          <h1 className="text-3xl sm:text-5xl font-bold">Welcome to Regal House</h1>
          <p className="text-lg mt-4">Where Luxury Meets Comfort</p>
        </div>
        </div>

      {/* Our Story Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto text-center px-6">
          <h2 className="text-3xl font-semibold">Our Story</h2>
          <p className="mt-4 text-xl leading-relaxed">
            Regal House was founded with the vision of bringing timeless elegance and luxurious comfort into every home. 
            From classic to contemporary, we offer a wide range of furniture pieces designed to transform your living space into a sanctuary of style.
                With over two decades of craftsmanship, Regal House is committed to creating exceptional furniture using high-quality materials. 
                Each piece is designed to elevate the ambiance of any room, bringing both style and functionality together.
              </p>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto text-center px-6">
          <h2 className="text-3xl font-semibold">Our Core Values</h2>
          <div className="mt-8 grid sm:grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="space-y-4">
              <Image
                src="/images/b4.png"
                alt="Quality"
                className="mx-auto rounded-full"
                width="150"
                height="150"
              />
              <h3 className="text-2xl font-medium">Quality</h3>
              <p>We are committed to offering only the highest quality craftsmanship and materials in every piece of furniture we create.</p>
            </div>
            <div className="space-y-4">
              <Image
                src="/images/b7.png"
                alt="Design"
                className="mx-auto rounded-full"
                width="150"
                height="150"
              />
              <h3 className="text-2xl font-medium">Design</h3>
              <p>Our designs blend sophistication with practicality to create timeless furniture that complements any interior style.</p>
            </div>
            <div className="space-y-4">
              <Image
                src="/images/b6.png"
                alt="Sustainability"
                className="mx-auto rounded-full"
                width="150"
                height="150"
              />
              <h3 className="text-2xl font-medium">Sustainability</h3>
              <p>We prioritize sustainability, ensuring that every piece is crafted with eco-friendly materials and processes, making a positive impact on the planet.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="bg-rose-200 py-16 text-white text-center">
        <h2 className="text-3xl font-semibold">Ready to Transform Your Space?</h2>
        <p className="mt-4 text-lg">Discover our range of exclusive furniture pieces that will elevate your home.</p>
        <a
          href="/shop"
          className="mt-8 inline-block px-6 py-3 bg-slate-600 text-white rounded-full text-xl font-medium hover:bg-slate-800"
        >
          Shop Now
        </a>
      </section>
    </div>
  );
};

export default AboutPage;
