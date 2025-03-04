import { configureStore } from "@reduxjs/toolkit";
import FilterReducer from "./filter/filtersSlice";
import ProductReducer from "./product/productSlice";
import SizeReducer from "./sizes/SizesSlice";
import { apiSlice } from "./api";

export const store = () =>
  configureStore({
    reducer: {
      product: ProductReducer,
      filter: FilterReducer,
      sizes: SizeReducer,
      [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().prepend().concat(apiSlice.middleware),
  });

export type AppStore = ReturnType<typeof store>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
