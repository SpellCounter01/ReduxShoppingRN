import { configureStore } from '@reduxjs/toolkit'

export default configureStore({
  reducer: {
    product: productReducer,
    filter: filterReducer
  }
})
