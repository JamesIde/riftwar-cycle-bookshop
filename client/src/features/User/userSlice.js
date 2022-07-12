const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit")

const axios = require("axios")

const API_URL = "/api/user"

const localStorageUser = localStorage.getItem("user")

const initialState = {
  user: localStorageUser ? JSON.parse(localStorageUser) : null,
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(loginUser.pending, state => {
      state.isLoading = true
      state.isError = false
      state.isSuccess = false
      state.message = ""
    })
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.user = action.payload
      state.isLoading = false
      state.isError = false
      state.isSuccess = true
      state.message = "Login successful"
    })
    builder.addCase(loginUser.rejected, (state, action) => {
      state.isLoading = false
      state.isError = true
      state.isSuccess = false
      state.message = action.payload
    })
  },
})

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post(API_URL + "/login", userData)

      localStorage.setItem("user", JSON.stringify(response.data))
      return response.data
    } catch (error) {
      thunkAPI.rejectWithValue(error.message)
    }
  }
)

export default userSlice.reducer
