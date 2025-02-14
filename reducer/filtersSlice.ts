import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Filters {
  categories: Array<number>,
  name?: string,
  price?: {
    floor: number,
    cieling: number
  },
  discount: boolean
}

interface InitialState {
  selectedFilters: Partial<Filters>,
  expandedFilter?: number,
}

const initialState: InitialState = {
  selectedFilters: {
    categories: [],
  },
  expandedFilter: undefined
}

export default createSlice({
  name: 'filters',
  initialState: initialState,
  reducers: {
    toggleCategory: (state, action: PayloadAction<Array<number>>) => {
      state.selectedFilters.categories = action.payload
    }
  }
})
