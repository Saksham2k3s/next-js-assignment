import { ProductSlice } from "@/types/ApiResponse";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState: ProductSlice = {
  state: "idle",
  error: null,
  products: [],
  isLoadingCategories: false,
  categories: [],
  seletedCategory: "",
  skip: 0,
  searchQuery: "",
};

export const fetchProductCategories = createAsyncThunk(
  "product/categories",
  async () => {
    const response = await axios.get("https://dummyjson.com/products/categories");
    return response.data;
  }
);

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async ({
    category = "",
    query = "",
    skip = 0,
    limit = 5,
  }: {
    category: string;
    query: string;
    skip: number;
    limit: number;
  }) => {
    let baseUrl = `https://dummyjson.com/products?skip=${skip}&limit=${limit}`;

    // Add category to the URL if provided
    if (category) {
      let decodeCategory = category.replace(/\s+/g, ''); 
      decodeCategory = decodeCategory.toLowerCase()
      console.log(decodeCategory);
      baseUrl = `https://dummyjson.com/products/category/${encodeURIComponent(decodeCategory)}?skip=${skip}&limit=${limit}`;
    }

    if (query) {
      baseUrl = `https://dummyjson.com/products/search?q=${encodeURIComponent(query)}&skip=${skip}&limit=${limit}`;
    }

    console.log("Fetching from URL:", baseUrl);

    const response = await axios.get(baseUrl);
    return response.data.products;
  }
);

const productSlice = createSlice({
  name: "product",
  initialState: initialState,
  reducers: {
    updateCategory: (state, action) => {
      state.seletedCategory = action.payload;
      state.skip = 0; 
      state.products = []; 
    },
    updateSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
      state.skip = 0; 
      state.products = []; 
    },
    updateSkip: (state) => {
      state.skip += 5; 
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductCategories.pending, (state) => {
        state.isLoadingCategories = true;
      })
      .addCase(fetchProductCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
        state.isLoadingCategories = false;
      })
      .addCase(fetchProducts.pending, (state) => {
        state.state = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = [...state.products, ...action.payload]; // Append new products
        state.state = "success";
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.state = "error";
      });
  },
});

export const { updateCategory, updateSearchQuery, updateSkip } = productSlice.actions;
export default productSlice.reducer;
