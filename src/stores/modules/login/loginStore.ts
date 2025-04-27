import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface LoginStateType {
  count: number
}

const loginStore = createSlice({
  name: 'login',
  initialState: {
    count: 0,
  } as LoginStateType,
  reducers: {
    setCount(state, action: PayloadAction<number>) {
      state.count = action.payload
    },
  },
})

export const { setCount } = loginStore.actions
export default loginStore.reducer
