const { createAsyncThunk, createSlice } = require("@reduxjs/toolkit")
const axios = require("axios")

export const fetchProductReviews = createAsyncThunk(
  "item/getProductReviews",
  async (slug, thunkAPI) => {
    try {
      const response = await axios.get("/api/reviews/", { params: { slug } })
      return response.data
    } catch (error) {
      thunkAPI.rejectWithValue(error.message)
    }
  }
)

export const fetchAverageRating = createAsyncThunk(
  "item/getAverageRating",
  async (slug, thunkAPI) => {
    try {
      const response = await axios.get("/api/reviews/rating", {
        params: { slug },
      })
      return response.data
    } catch (error) {
      thunkAPI.rejectWithValue(error.message)
    }
  }
)

const initialState = {
  reviews: [],
  averageRating: {},
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
}

const reviewSlice = createSlice({
  name: "slice",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchProductReviews.pending, state => {
      state.isLoading = true
      state.isError = false
      state.isSuccess = false
      state.message = ""
    })
    builder.addCase(fetchProductReviews.fulfilled, (state, action) => {
      state.reviews = action.payload.reviews
      state.isLoading = false
      state.isError = false
      state.isSuccess = true
      state.message = "Reviews fetched successfully"
    })
    builder.addCase(fetchProductReviews.rejected, (state, action) => {
      state.isLoading = false
      state.isError = true
      state.isSuccess = false
      state.message = action.payload
    })
    builder.addCase(fetchAverageRating.pending, state => {
      state.isLoading = true
      state.isError = false
      state.isSuccess = false
      state.message = ""
    })
    builder.addCase(fetchAverageRating.fulfilled, (state, action) => {
      state.averageRating = action.payload
      state.isLoading = false
      state.isError = false
      state.isSuccess = true
      state.message = "Reviews fetched successfully"
    })
    builder.addCase(fetchAverageRating.rejected, (state, action) => {
      state.isLoading = false
      state.isError = true
      state.isSuccess = false
      state.message = action.payload
    })
  },
})

export default reviewSlice.reducer
