import { configureStore } from "@reduxjs/toolkit"
import userReducer from "../features/User/userSlice"
import productReducer from "../features/Products/productSlice"
import orderReducer from "../features/Orders/orderSlice"
import reviewReducer from "../features/Reviews/reviewSlice"
export const store = configureStore({
  reducer: {
    userReducer,
    productReducer,
    orderReducer,
    reviewReducer,
  },
})
