import { configureStore } from "@reduxjs/toolkit";
import FilterReducer from "./filter/filtersSlice";
import { apiSlice } from "./api";

export const store = () =>
  configureStore({
    reducer: {
      //product: productReducer,
      filter: FilterReducer,
      [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().prepend().concat(apiSlice.middleware),
  });

export type AppStore = ReturnType<typeof store>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
