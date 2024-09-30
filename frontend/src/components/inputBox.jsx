"use client";

import { useState } from "react";
import { PlaceholdersAndVanishInput } from "./ui/placeholders-and-vanish-input.tsx";
import { TextGenerateEffect } from "./ui/text-generate-effect";
import { useCardStore } from "../../store/card";
import SortBy from "../components/sortBy.jsx";

const PlaceholdersAndVanishInputDemo = ({ setIsSearchActive }) => {
  const { findCard } = useCardStore();

  const [newName, setNewName] = useState({
    name: "",
  });
  const [isFilterActive, setIsFilterActive] = useState(false);
  const [currentPage, setCurrentPage] = useState(1); // Track the current page
  const [hasMore, setHasMore] = useState(true); // Track if there are more results to load
  const [isHomehActive, setIsHomeActive] = useState(false); // Track if we're in search mode
  const placeholders = [
    "What's the first rule of Fight Club?",
    "Who is Tyler Durden?",
    "Where is Andrew Laeddis Hiding?",
    "Write a Javascript method to reverse a string",
    "How to assemble your own PC?",
  ];

  const handleChange = (e) => {
    setNewName({ ...newName, name: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsSearchActive(true)
    setIsHomeActive(true)
    setCurrentPage(1); // Reset page to 1 for a new search
    const { success, message, totalPages } = await findCard(newName, 1); // Fetch the first page of results
    console.log(success);
    console.log(message);
    setHasMore(totalPages > 1); // If there are more pages, show the "Next" button
  };

  const handleNext = async () => {
    const nextPage = currentPage + 1;
    const { success, message, totalPages } = await findCard(newName, nextPage);
    console.log(success);
    console.log(message);
    setCurrentPage(nextPage); // Move to the next page
    setHasMore(nextPage < totalPages); // If we're on the last page, hide the "Next" button
  };

  const words = `Home made Pokemon Dex`;
  return (
    <div className="relative h-[20rem] flex flex-col justify-center items-center px-4">
      <h2 className="mb-10 sm:mb-20">
        <TextGenerateEffect duration={5} filter={false} words={words} />
      </h2>
      <PlaceholdersAndVanishInput
        placeholders={placeholders}
        onChange={handleChange}
        onSubmit={onSubmit}
        value={newName.name}
      />
      <div className="hidden">

      <SortBy setIsFilterActive={setIsFilterActive}  />
      </div>
       {/* Render "Next" button if there are more results to load */}
       {!isFilterActive &&isHomehActive&&hasMore && (
        <button
          onClick={handleNext}
          className=" z-10 lg:right-20 fixed right-3 bottom-12 mt-4 px-4 py-2 bg-blue-500 text-white rounded-md "
        >
          Next
        </button>
      )}
    </div>
  );
};

export default PlaceholdersAndVanishInputDemo;