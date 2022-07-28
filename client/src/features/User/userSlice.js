import userService from "./userService"

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit")

const localStorageUser = localStorage.getItem("user")

const initialState = {
  user: localStorageUser ? JSON.parse(localStorageUser) : null,
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
}

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (userData, thunkAPI) => {
    try {
      const response = await userService.login(userData)

      localStorage.setItem("user", JSON.stringify(response.data))

      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message)
    }
  }
)

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (formData, thunkAPI) => {
    try {
      const response = await userService.register(formData)
      localStorage.setItem("user", JSON.stringify(response.data))

      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message)
    }
  }
)

export const logoutUser = createAsyncThunk("auth/logout", () => {
  localStorage.removeItem("user")
  localStorage.removeItem("cart")
  // Get product cart
})

export const updateUserDetails = createAsyncThunk(
  "user/updateUserDetails",
  async (userData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().userReducer.user.token

      const response = await userService.update(token, userData)
      localStorage.setItem("user", JSON.stringify(response.data))

      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message)
    }
  }
)

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
    builder.addCase(registerUser.pending, state => {
      state.isLoading = true
      state.isError = false
      state.isSuccess = false
      state.message = ""
    })
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.user = action.payload
      state.isLoading = false
      state.isError = false
      state.isSuccess = true
      state.message = "Login successful"
    })
    builder.addCase(registerUser.rejected, (state, action) => {
      state.isLoading = false
      state.isError = true
      state.isSuccess = false
      state.message = action.payload
    })
    builder.addCase(updateUserDetails.pending, state => {
      state.isLoading = true
      state.isError = false
      state.isSuccess = false
      state.message = ""
    })
    builder.addCase(updateUserDetails.fulfilled, (state, action) => {
      state.isLoading = false
      state.isError = false
      state.isSuccess = true
      state.message = "User details updated. Thank you"
    })
    builder.addCase(updateUserDetails.rejected, (state, action) => {
      state.isLoading = false
      state.isError = true
      state.isSuccess = false
      state.message = action.payload
    })
    builder.addCase(logoutUser.fulfilled, state => {
      state.user = null
      state.isLoading = false
      state.isError = false
      state.isSuccess = true
      state.message = "Logout successful"
    })
  },
})

export default userSlice.reducer
