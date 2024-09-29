"use client";
import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import {
  fetchProductCategories,
  fetchProducts,
  updateSkip,
} from "@/lib/store/features/products/productSlice";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { useEffect, useCallback, useRef } from "react";


export default function Home() {
  const dispatch = useAppDispatch();
  const { products, searchQuery, seletedCategory, skip } = useAppSelector(
    (state) => state.product
  );

  const isFetchingRef = useRef(false); // Track whether a fetch is in progress

  useEffect(() => {
    // Fetch categories and initial products on mount
    dispatch(fetchProductCategories());
    dispatch(
      fetchProducts({
        category: seletedCategory || "",
        query: searchQuery || "",
        skip: 0,
        limit: 5,
      })
    );
  }, [dispatch, searchQuery, seletedCategory]);

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + window.scrollY >=
      document.documentElement.scrollHeight - 100
    ) {
      if (!isFetchingRef.current) {
        isFetchingRef.current = true;

        // Fetch the next batch of products
        dispatch(updateSkip());
        dispatch(
          fetchProducts({
            category: seletedCategory || "",
            query: searchQuery || "",
            skip: skip + 5, // Fetch next set of products
            limit: 5,
          })
        ).finally(() => {
          isFetchingRef.current = false;
        });
      }
    }
  }, [dispatch, searchQuery, seletedCategory, skip]);

  // Attach scroll event listener
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return (
    <>
      {/* Header */}
      <Header />

      {/* Product List */}
      
         
          <div className="w-full flex flex-wrap align-middle gap-3 justify-center ">
        {products &&
          products.map((product) => (
            <div
              className="flex justify-center rounded-lg text-black p-10 "
              key={product.id}
            >
              <ProductCard productDetail={product} />
            </div>
          ))}
      </div>
        
    </>
  );
}
