import React, { useState } from 'react';
import { useCardStore } from '../../store/card'; // Import store Zustand
import PlaceholdersAndVanishInputDemo from "../components/inputBox.jsx";
export default function DropdownComponent({setIsFilterActive}) {
  // State để lưu các giá trị lọc và trang hiện tại
  const [filters, setFilters] = useState({
    generation: '',
    type1: '',
    special_group: '',
  });
  const [isHomehActive, setIsHomeActive] = useState(false);
  // Lấy hàm filterCards và các state từ store Zustand
  const { filterCards, hasNextPage, currentPage } = useCardStore();
  

  // Hàm để xử lý khi người dùng thay đổi giá trị trong dropdown
  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  // Hàm để gửi yêu cầu lọc khi thay đổi giá trị
  const handleFilterSubmit = async () => {
    await filterCards(filters, 1); // Gọi hàm filterCards với trang đầu tiên
    setIsHomeActive(true)
    setIsFilterActive(true)
  };
  const [isSearchActive, setIsSearchActive] = useState(false);
  // Hàm để xử lý khi nhấn nút "Next"
  const handleNextPage = async () => {
    await filterCards(filters, currentPage + 1); // Gọi hàm filterCards với trang tiếp theo
  };

  return (
    
    <div className="relative w-full mb-8 flex flex-col items-center gap-6  ">
      
      <div className="flex justify-center flex-col items-center gap-1 lg:flex-row lg:gap-10">
        {/* Dropdown Generation */}
        <select
          name="generation"
          value={filters.generation}
          onChange={handleFilterChange}
          className="p-2.5 text-gray-500 bg-white border rounded-3xl drop-shadow-lg shadow-md outline-none appearance-none focus:border-indigo-600"
        >
          <option value="">All gen</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
        </select>

        {/* Dropdown Type1 */}
        <select
          name="type1"
          value={filters.type1}
          onChange={handleFilterChange}
          className="p-2.5 text-gray-500 bg-white border rounded-3xl drop-shadow-lg shadow-md outline-none appearance-none focus:border-indigo-600"
        >
          <option value="">All type</option>
          <option value="Water">Water</option>
          <option value="Normal">Normal</option>
          <option value="Rock">Rock</option>
          <option value="Psychic">Psychic</option>
          <option value="Grass">Grass</option>
          <option value="Ghost">Ghost</option>
          <option value="Electric">Electric</option>
          <option value="Steel">Steel</option>
          <option value="Bug">Bug</option>
          <option value="Dragon">Dragon</option>
          <option value="Dark">Dark</option>
          <option value="Ground">Ground</option>
          <option value="Poison">Poison</option>
          <option value="Fire">Fire</option>
          <option value="Flying">Flying</option>
          <option value="Ice">Ice</option>
          <option value="Fairy">Fairy</option>
        </select>

        {/* Dropdown Special Group */}
        <select
          name="special_group"
          value={filters.special_group}
          onChange={handleFilterChange}
          className="p-2.5 text-gray-500 bg-white border rounded-3xl drop-shadow-lg shadow-md outline-none appearance-none focus:border-indigo-600"
        >
          <option value="" className='text-center'>All group</option>
          <option value="Ordinary">Ordinary</option>
          <option value="Legendary">Legendary</option>
          <option value="Mythical">Mythical</option>
          <option value="Ancient_Paradox">Ancient Paradox</option>
          <option value="Future_Paradox">Future Paradox</option>
          <option value="Fossil">Fossil</option>
        </select>

        {/* Button to apply filter */}
        <button
          onClick={handleFilterSubmit}
          className="p-2.5 bg-blue-500 text-white rounded-3xl shadow-md hover:bg-blue-600"
        >
          Apply Filter
        </button>
      </div>

      {/* Pagination - Button Next */}
      { !isSearchActive &&isHomehActive&&(

      <button
        onClick={handleNextPage}
        disabled={!hasNextPage} // Disable if there's no next page
        className={` z-10 lg:right-20 fixed right-3 bottom-12 mt-4 px-4 py-2 bg-blue-500 text-white rounded-md ${!hasNextPage ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        Next
      </button>
      )}
      
    </div>
  );
}