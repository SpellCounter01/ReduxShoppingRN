import { configureStore } from '@reduxjs/toolkit'
import FilterReducer from './filter/filtersSlice'


export const store = () => configureStore({
  reducer: {
    //product: productReducer,
    filter: FilterReducer
  }
})


export type AppStore = ReturnType<typeof store>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
