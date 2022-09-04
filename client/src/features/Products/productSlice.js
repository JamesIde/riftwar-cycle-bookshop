import { API } from "../../helper/API"
const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit")

const cartFromLocalStorage = JSON.parse(localStorage.getItem("cart"))

const initialState = {
  cart: cartFromLocalStorage ? cartFromLocalStorage : [],
  products: [],
  product: {},
  selectedItem: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
}

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    addtoCart: (state, action) => {
      let quantity = 1
      // Check if item is already in cart
      const isInCart = state.cart.find(item => item._id === action.payload)
      const product = state.products.find(item => item._id === action.payload)

      //Increment quantity if item is already in cart
      if (isInCart) {
        // Find the item in the array and increment the quantity
        const itemIndex = state.cart.findIndex(
          item => item._id === action.payload
        )
        state.cart[itemIndex].quantity++
      } else {
        // Spread across and add
        state.cart = [...state.cart, { ...product, quantity }]
      }
      // Add to local storage
      localStorage.setItem("cart", JSON.stringify(state.cart))
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter(item => item._id !== action.payload)
      localStorage.setItem("cart", JSON.stringify(state.cart))
    },
    decrementQuantity: (state, action) => {
      // Find the item in the array and decrement the quantity
      const itemIndex = state.cart.findIndex(
        item => item._id === action.payload
      )
      if (state.cart[itemIndex].quantity > 1) {
        state.cart[itemIndex].quantity--
      } else {
        state.cart.splice(itemIndex, 1)
      }
      localStorage.setItem("cart", JSON.stringify(state.cart))
    },
    incrementQuantity: (state, action) => {
      // Find the item in the array and increment the quantity
      const itemIndex = state.cart.findIndex(
        item => item._id === action.payload
      )
      state.cart[itemIndex].quantity++
      localStorage.setItem("cart", JSON.stringify(state.cart))
    },
    clearCart: (state, action) => {
      state.cart = []
      localStorage.removeItem("cart")
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchProducts.pending, state => {
      state.isLoading = true
      state.isError = false
      state.isSuccess = false
      state.message = ""
    })
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.products = action.payload.products
      state.isLoading = false
      state.isError = false
      state.isSuccess = true
      state.message = "Products fetched!"
    })
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.isLoading = false
      state.isError = true
      state.isSuccess = false
      state.message = action.payload
    })
    builder.addCase(fetchProduct.pending, state => {
      state.isLoading = true
      state.isError = false
      state.isSuccess = false
      state.message = ""
    })
    builder.addCase(fetchProduct.fulfilled, (state, action) => {
      state.product = action.payload.product
      state.isLoading = false
      state.isError = false
      state.isSuccess = true
      state.message = "Product fetched!"
    })
    builder.addCase(fetchProduct.rejected, (state, action) => {
      state.isLoading = false
      state.isError = true
      state.isSuccess = false
      state.message = action.payload
    })
    builder.addCase(getCart.pending, state => {
      state.isLoading = true
      state.isError = false
      state.isSuccess = false
      state.message = ""
    })
    builder.addCase(getCart.fulfilled, (state, action) => {
      state.cart = action.payload
      state.isLoading = false
      state.isError = false
      state.isSuccess = true
      state.message = "Cart fetched!"
    })
    builder.addCase(getCart.rejected, (state, action) => {
      state.isLoading = false
      state.isError = true
      state.isSuccess = false
      state.message = action.payload
    })
  },
})

export const getCart = createAsyncThunk("product/getCart", async () => {
  const cart = JSON.parse(localStorage.getItem("cart"))
  return cart
})

export const fetchProducts = createAsyncThunk(
  "item/getProducts",
  async thunkAPI => {
    try {
      const response = await API.get("/api/products")

      return response.data
    } catch (error) {
      thunkAPI.rejectWithValue(error.message)
    }
  }
)

export const fetchProduct = createAsyncThunk(
  "item/getProduct",
  async (slug, thunkAPI) => {
    try {
      const response = await API.get(`/api/products/${slug}`)
      return response.data
    } catch (error) {
      thunkAPI.rejectWithValue(error.message)
    }
  }
)

export const {
  addtoCart,
  removeFromCart,
  decrementQuantity,
  incrementQuantity,
  clearCart,
} = productSlice.actions
export default productSlice.reducer
