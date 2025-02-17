import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface Filters {
    categories: Array<number>
    name?: string
    price?: {
        floor: number
        cieling: number
    }
    discount: boolean
}

export interface FilterStateInterface {
    selectedFilters: Partial<Filters>
    expandedFilterIndex?: number
}

const initialState: FilterStateInterface = {
    selectedFilters: {
        categories: [],
    },
    expandedFilterIndex: undefined,
}

export const filterSlice = createSlice({
    name: "filters",
    initialState: initialState,
    reducers: {
        toggleCategory: (state, action: PayloadAction<Array<number>>) => {
            state.selectedFilters.categories = action.payload
        },
        setExpandedFilterIndex: (
            state,
            action: PayloadAction<number | undefined>
        ) => {
            state.expandedFilterIndex = action.payload
        },
    },
})

export const { toggleCategory, setExpandedFilterIndex } = filterSlice.actions
export default filterSlice.reducer
