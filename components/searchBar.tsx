"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation"; // useRouter is still used for navigation
import Image from "next/image";

const SearchBar = () => {
  const [query, setQuery] = useState(""); // For the search query
  const router = useRouter(); // Use useRouter from Next.js

  // Handle search input change
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  // Handle form submit
  const handleSearchSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (query.trim()) {
      // Redirect to the dynamic search results page with the query in the URL
      router.push(`/search/${query}`);
    }
  };

  return (
    <form onSubmit={handleSearchSubmit}>
      <div className="w-full flex items-center justify-center">
        <input
          type="text"
          value={query}
          onChange={handleSearchChange}
          placeholder="Search..."
          className="focus:outline-none"
        />
        <button type="submit">
          <Image
            src={"/images/search.png"}
            alt="user"
            height={28}
            width={28}
          ></Image>
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
