"use client";

import React from "react";
import GlareCardDemo from "../components/cardEffect.jsx";

import PlaceholdersAndVanishInputDemo from "../components/inputBox.jsx";
import SortBy from "../components/sortBy.jsx";
import { useCardStore } from "../../store/card";
import { useEffect, useState } from "react";

export function AuroraBackgroundDemo() {
  const { fetchCard, cards } = useCardStore();
  const [currentPage, setCurrentPage] = useState(1); // State to track current page
  const [hasMore, setHasMore] = useState(true); // State to track if there are more cards to fetch
  const [isSearchActive, setIsSearchActive] = useState(false); // Track if we're in search mode
  const [isFilterActive, setIsFilterActive] = useState(false); // Track if we're in search mode

  // Fetch cards when the component mounts and when currentPage changes
  useEffect(() => {
    const fetchData = async () => {
      const fetchedCards = await fetchCard(currentPage); // Pass the current page to fetchCard
      if (fetchedCards.length < 9) {
        setHasMore(false); // If less than 9 cards are fetched, assume no more pages
      }
    };
    fetchData();
  }, [currentPage, fetchCard]);

  // Handle Next button click
  const handleNext = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
    <div className="flex flex-col justify-center items-center">
      {/* Pass down setIsSearchActive to the search component */}
      <PlaceholdersAndVanishInputDemo setIsSearchActive={setIsSearchActive} />
      
      <SortBy setIsFilterActive={setIsFilterActive}/>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-7 mb-5 md:mb-8">
        {cards.map((card) => (
          <GlareCardDemo key={card._id} card={card} />
        ))}
      </div>

      {/* Show the Next button only if there are more cards to load and search is NOT active */}
      {!isSearchActive &&!isFilterActive&& hasMore && (
        <button
          onClick={handleNext}
          className="px-4 py-2 bg-blue-500 text-white rounded-md z-50 mb-5 hover:bg-black"
        >
          Next
        </button>
      )}
    </div>
  );
}

export default AuroraBackgroundDemo;