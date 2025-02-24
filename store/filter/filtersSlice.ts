import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "..";

export interface Category {
  slug: string;
  name: string;
  url: string;
}

interface Filters {
  categories: Array<number>;
  name?: string;
  price?: {
    floor: number;
    cieling: number;
  };
  discount: boolean;
}

export interface FilterStateInterface {
  selectedFilters: Partial<Filters>;
  expandedFilterIndex?: number;
  categoriesInfo: {
    loading: boolean;
    data: Array<Category>;
  };
}

const initialState: FilterStateInterface = {
  selectedFilters: {
    categories: [],
  },
  expandedFilterIndex: undefined,
  categoriesInfo: {
    loading: false,
    data: [],
  },
};

export const fetchCategories = createAsyncThunk.withTypes<{
  state: RootState;
  dispatch: AppDispatch;
}>()("fetchProduct/categories", async () => {
  return await fetch("https://dummyjson.com/products/categories").then((e) =>
    e.json().then((response: Array<Category>) => response),
  );
});

export const filterSlice = createSlice({
  name: "filters",
  initialState: initialState,
  reducers: {
    toggleCategory: (state, action: PayloadAction<Array<number>>) => {
      state.selectedFilters.categories = action.payload;
    },
    setExpandedFilterIndex: (
      state,
      action: PayloadAction<number | undefined>,
    ) => {
      state.expandedFilterIndex = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchCategories.pending, (state) => {
      state.categoriesInfo.loading = true;
    });
    builder.addCase(
      fetchCategories.fulfilled,
      (state, action: PayloadAction<Array<Category>>) => {
        state.categoriesInfo.loading = false;
        state.categoriesInfo.data = action.payload;
      },
    );
  },
});

export const { toggleCategory, setExpandedFilterIndex } = filterSlice.actions;
export default filterSlice.reducer;
