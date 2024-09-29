import React from 'react';
import { Product } from '@/types/ApiResponse';
import Image from 'next/image';


interface ProductCardProps {
  productDetail: Product;
}

function ProductCard({ productDetail }: ProductCardProps) {
  const { title, description, price, rating, thumbnail  } = productDetail;

  return (
    <>
      <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 transition-transform transform hover:scale-105 duration-300 self-center ">
        <a href="#">
          <Image
            className="p-6 rounded-t-lg w-full object-cover h-64"
            src={thumbnail}
            alt="product-image"
          />
        </a>
        <div className="px-5 pb-5">
          <a href="#">
            <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white mb-2">
              {title}
            </h5>
          </a>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            {description}
          </p>
          <div className="flex items-center mt-2 mb-4">
            <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-green-200 dark:text-green-800">
              {rating} ⭐
            </span>
            <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
              Based on {Math.floor(rating * 20)} reviews
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-3xl font-bold text-gray-900 dark:text-white">
              ${price}
            </span>
            <a
              href="#"
              className="text-[#ff5302] bg-[#ffeee5] hover:bg-[#ffe4d5] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800 transition-colors"
            >
              View Detail
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductCard;
