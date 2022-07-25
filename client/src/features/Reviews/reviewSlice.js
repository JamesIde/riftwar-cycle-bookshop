const { createAsyncThunk, createSlice } = require("@reduxjs/toolkit")
const axios = require("axios")

const initialState = {
  reviews: [],
  averageRating: {},
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
}

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

export const createReview = createAsyncThunk(
  "item/createReview",
  async (reviewData, thunkAPI) => {
    const { slug } = reviewData
    const { reviewDesc, reviewTitle, rating } = reviewData

    try {
      const token = thunkAPI.getState().userReducer.user.token
      const response = await axios.post(
        "/api/reviews/",
        {
          reviewDesc,
          reviewTitle,
          rating,
        },
        {
          params: { slug },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      return response.data
    } catch (error) {
      thunkAPI.rejectWithValue(error.message)
    }
  }
)

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
    builder.addCase(createReview.pending, state => {
      state.isLoading = true
      state.isError = false
      state.isSuccess = false
      state.message = ""
    })
    builder.addCase(createReview.fulfilled, (state, action) => {
      // Spread across and add new review
      state.reviews = [...state.reviews, action.payload.review]
      state.isLoading = false
      state.isError = false
      state.isSuccess = true
      state.message = "Review Created Successfully!"
    })
    builder.addCase(createReview.rejected, (state, action) => {
      state.isLoading = false
      state.isError = true
      state.isSuccess = false
      state.message = action.payload
    })
  },
})

export default reviewSlice.reducer
