import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "..";
import { Product } from "@/interfaces/product";
import { PaginatedResponse } from "@/interfaces/paginatedResponse";

interface ProductSliceInterface {
  products: Array<Product | Partial<Product>> | undefined;
  loading: boolean;
  currentPage: number;
  hasNext: boolean;
}

const pageSize = 10;

export const fetchProducts = createAsyncThunk.withTypes<{
  state: RootState;
  dispatch: AppDispatch;
}>()(
  "products/fetch",
  async (page: number) =>
    await fetch(
      `https://dummyjson.com/products?limit=${pageSize}&skip=${page * pageSize}&sortBy=id&order=asc`,
    ).then((e) =>
      e.json().then((response: PaginatedResponse<Product>) => response),
    ),
);

const initialState: ProductSliceInterface = {
  products: undefined,
  loading: false,
  currentPage: 1,
  hasNext: true,
};

const productSlice = createSlice({
  name: "product",
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(
      fetchProducts.fulfilled,
      (state, action: PayloadAction<PaginatedResponse<Product>>) => {
        let productLength = 0;
        let missingNumber = 0;

        if (state.products?.length) {
          productLength = state.products.filter(
            (product) => product.hidden,
          ).length;
          missingNumber = productLength % 4;

          for (let index = 0; index < missingNumber; index++) {
            state.products.pop();
          }

          state.products = state.products.concat(action.payload.products);
          state.currentPage++;
        } else {
          state.products = action.payload.products;
        }

        productLength = state.products.length;
        missingNumber = productLength % 4;

        if (missingNumber)
          for (let index = 0; index < missingNumber; index++) {
            state.products.push({
              id: (state.products[productLength - 1].id ?? 1) + 1,
              hidden: true,
            });
          }

        state.loading = false;
        state.hasNext = action.payload.total > action.payload.skip + pageSize;
      },
    );
    builder.addCase(fetchProducts.pending, (state) => {
      state.loading = true;
    });
  },
});

export default productSlice.reducer;
