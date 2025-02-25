import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "..";
import { Product } from "@/interfaces/product";
import { PaginatedResponse } from "@/interfaces/paginatedResponse";

interface ProductSliceInterface {
  products: Array<Product> | undefined;
  loading: boolean;
}

export const fetchProducts = createAsyncThunk.withTypes<{
  state: RootState;
  dispatch: AppDispatch;
}>()("products/fetch", async () => {
  return await fetch("https://dummyjson.com/products").then((e) =>
    e.json().then((response: PaginatedResponse<Product>) => response),
  );
});

const initialState: ProductSliceInterface = {
  products: undefined,
  loading: false,
};

const productSlice = createSlice({
  name: "product",
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(
      fetchProducts.fulfilled,
      (state, action: PayloadAction<PaginatedResponse<Product>>) => {
        state.products = action.payload.products;
        state.loading = false;
        console.log(action.payload);
      },
    );
    builder.addCase(fetchProducts.pending, (state) => {
      state.loading = true;
    });
  },
});

export default productSlice.reducer;
