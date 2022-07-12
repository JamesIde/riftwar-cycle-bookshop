import { configureStore } from "@reduxjs/toolkit"
import userReducer from "../features/User/userSlice"
import productReducer from "../features/Products/productSlice"
export const store = configureStore({
  reducer: {
    userReducer,
    productReducer,
  },
})
