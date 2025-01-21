"use client";
import React, { useState } from "react";
import client from "../sanity"; // Import the sanity client
import { useToast } from "@/hooks/use-toast";

interface FormData {
  name: string;
  email: string;
  address: string;
  city: string;
  zipcode: string;
  country: string;
  cardName: string;
  cardNumber: string;
  cvv: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  address?: string;
  city?: string;
  zipcode?: string;
  country?: string;
  cardName?: string;
  cardNumber?: string;
  cvv?: string;
}

const CheckoutForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    zipcode: "",
    country: "",
    cardName: "",
    cardNumber: "",
    cvv: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const { toast } = useToast();

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(email);
  };

  const validatePostalCode = (zipcode: string, country: string): boolean => {
    if (country === "us") {
      return /^\d{5}(-\d{4})?$/.test(zipcode); // US ZIP Code validation
    }
    return /^\d{5,6}$/.test(zipcode); // Other countries can be adjusted here
  };

  const validateCardNumber = (cardNumber: string): boolean => {
    // Luhn Algorithm to validate card number
    let sum = 0;
    let shouldDouble = false;
    for (let i = cardNumber.length - 1; i >= 0; i--) {
      let digit = parseInt(cardNumber.charAt(i));
      if (shouldDouble) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }
      sum += digit;
      shouldDouble = !shouldDouble;
    }
    return sum % 10 === 0;
  };

  const validateCVV = (cvv: string): boolean => {
    return /^\d{3,4}$/.test(cvv); // CVV validation (3 digits for Visa/Mastercard, 4 digits for Amex)
  };

  // Handle form field changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Submit form data to Sanity
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formErrors: FormErrors = {};

    if (!formData.name) formErrors.name = "Full Name is required.";
    if (!validateEmail(formData.email))
      formErrors.email = "Invalid email format.";
    if (!formData.address) formErrors.address = "Address is required.";
    if (!formData.city) formErrors.city = "City is required.";
    if (!validatePostalCode(formData.zipcode, formData.country))
      formErrors.zipcode = "Invalid postal code.";
    if (!validateCardNumber(formData.cardNumber))
      formErrors.cardNumber = "Invalid card number.";
    if (!validateCVV(formData.cvv)) formErrors.cvv = "Invalid CVV code.";

    if (Object.keys(formErrors).length === 0) {
      const document = {
        _type: "checkout",
        fullName: formData.name,
        email: formData.email,
        shippingAddress: formData.address,
        city: formData.city,
        zipcode: formData.zipcode,
        country: formData.country,
        cardholderName: formData.cardName,
        cardNumber: formData.cardNumber,
        cvv: formData.cvv,
      };

      try {
        const result = await client.create(document); // Create document in Sanity
        console.log("Checkout submitted successfully:", result);
        toast({
          title: "Order Confirmed",
          description: `Checkout submitted successfully!`,
        });
        setFormData({
          name: "",
          email: "",
          address: "",
          city: "",
          zipcode: "",
          country: "",
          cardName: "",
          cardNumber: "",
          cvv: "",
        });
      } catch (error) {
        console.error("Error submitting data:", error);
        toast({
          title: "Order Not Confirmed",
          description: `There occured an issue in submitting your details!`,
        });
      }
    } else {
      setErrors(formErrors); // Show errors on form
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="bg-white p-8 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Checkout
        </h2>

        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div className="mb-6">
            <label
              htmlFor="name"
              className="block text-lg font-medium text-gray-700"
            >
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter your full name"
              className="mt-2 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-700 focus:border-transparent"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block text-lg font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
              className="mt-2 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-700 focus:border-transparent"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>

          {/* Shipping Address */}
          <div className="mb-6">
            <label
              htmlFor="address"
              className="block text-lg font-medium text-gray-700"
            >
              Shipping Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              placeholder="Enter your shipping address"
              className="mt-2 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-700 focus:border-transparent"
            />
            {errors.address && (
              <p className="text-red-500 text-sm">{errors.address}</p>
            )}
          </div>

          {/* City */}
          <div className="mb-6">
            <label
              htmlFor="city"
              className="block text-lg font-medium text-gray-700"
            >
              City
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
              placeholder="Enter your city"
              className="mt-2 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-700 focus:border-transparent"
            />
            {errors.city && (
              <p className="text-red-500 text-sm">{errors.city}</p>
            )}
          </div>

          {/* Postal Code */}
          <div className="mb-6">
            <label htmlFor="zipcode" className="block text-lg font-medium text-gray-700">Postal Code</label>
            <input
              type="text"
              id="zipcode"
              name="zipcode"
              value={formData.zipcode}
              onChange={handleChange}
              required
              placeholder="Enter your postal code"
              className="mt-2 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-700 focus:border-transparent"
            />
            {errors.zipcode && <p className="text-red-500 text-sm">{errors.zipcode}</p>}
          </div>

          {/* Country */}
          <div className="mb-6">
            <label
              htmlFor="country"
              className="block text-lg font-medium text-gray-700"
            >
              Country
            </label>
            <input
              type="text"
              id="country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              required
              placeholder="Enter your country"
              className="mt-2 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-700 focus:border-transparent"
            />
          </div>

          {/* Cardholder Name */}
          <div className="mb-6">
            <label
              htmlFor="cardName"
              className="block text-lg font-medium text-gray-700"
            >
              Cardholder&apos;s Name
            </label>
            <input
              type="text"
              id="cardName"
              name="cardName"
              value={formData.cardName}
              onChange={handleChange}
              required
              placeholder="Enter the cardholder's name"
              className="mt-2 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-700 focus:border-transparent"
            />
          </div>

          {/* Card Number */}
          <div className="mb-6">
            <label htmlFor="cardNumber" className="block text-lg font-medium text-gray-700">Card Number
              <span className="text-sm">&#40;Card Number should not contain spaces&#41;</span>
            </label>
            <input
              type="text"
              id="cardNumber"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleChange}
              required
              placeholder="Enter your card number"
              className="mt-2 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-700 focus:border-transparent"
            />
            {errors.cardNumber && <p className="text-red-500 text-sm">{errors.cardNumber}</p>}
          </div>

          {/* CVV */}
          <div className="mb-6">
            <label
              htmlFor="cvv"
              className="block text-lg font-medium text-gray-700"
            >
              CVV
            </label>
            <input
              type="text"
              id="cvv"
              name="cvv"
              value={formData.cvv}
              onChange={handleChange}
              required
              placeholder="Enter CVV"
              maxLength={4} // Max length for CVV should be 4 (for Amex)
              className="mt-2 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-700 focus:border-transparent"
            />
            {errors.cvv && <p className="text-red-500 text-sm">{errors.cvv}</p>}
          </div>

          {/* Submit Button */}
          <div className="flex justify-center mt-4">
            <button
              type="submit"
              className="w-full py-3 px-4 bg-yellow-500 text-white font-semibold rounded-md hover:bg-yellow-600 transition duration-200"
            >
              Complete Purchase
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutForm;
