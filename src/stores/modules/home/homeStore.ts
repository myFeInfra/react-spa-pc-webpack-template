import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'

interface HomeStateType {
  count: number
}

export const changeCount = createAsyncThunk(
  'home/changeCount',
  async (params: { count: number }) => {
    return params.count
  }
)

const homeStore = createSlice({
  name: 'home',
  initialState: {
    count: 0,
  } as HomeStateType,
  reducers: {
    setCount(state, action: PayloadAction<number>) {
      state.count = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(changeCount.fulfilled, (state, action) => {
        state.count += action.payload
      })
      .addCase(changeCount.rejected, (state, action) => {
        state.count = 0
      })
      .addCase(changeCount.pending, (state, action) => {
        state.count = 0
      })
  },
})

export const { setCount } = homeStore.actions
export default homeStore.reducer
