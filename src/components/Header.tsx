"use client"
import React, { useEffect } from 'react';
import { fetchProductCategories, updateCategory, updateSearchQuery } from '@/lib/store/features/products/productSlice';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';

const Header: React.FC = () => {
    const dispatch = useAppDispatch()
    const { categories, searchQuery, seletedCategory }  = useAppSelector(state => state.product)

  // Fetch categories on component mount
  useEffect(() => {
    dispatch(fetchProductCategories())
  }, []);

  // Function to handle category selection
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
     const selected = e.target.value;
     dispatch(updateSearchQuery(''))
     dispatch(updateCategory(selected))
  };

  // Function to handle search input
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    dispatch(updateCategory(''))
    dispatch(updateSearchQuery(query))
  };

  return (
    <div className="flex w-full justify-between align-middle px-10 py-4 bg-[#ffe4d5]">
      {/* Search Input */}
      <div className="flex gap-4 px-3 py-4 text-black">
        <input
          type="text"
          placeholder="Search product here"
          value={searchQuery}
          onChange={handleSearchChange}
          className="border border-[#ff5302] px-6 py-4 rounded-full"
        />

      </div>

      {/* Category Dropdown */}
      <select
        className="border border-[#ff5302] rounded-full h-fit p-3 self-center"
        value={seletedCategory}
        onChange={handleCategoryChange}
      >
        <option value="">All Categories</option>
        {categories &&
          categories.map((category) => (
            <option key={category.id} value={category.name} >
              {category.name}
            </option>
          ))}
      </select>
    </div>
  );
};

export default Header;
