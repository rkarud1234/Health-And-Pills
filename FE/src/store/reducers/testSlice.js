import { createSlice } from '@reduxjs/toolkit'

const testSlice = createSlice({
  name: 'testSlice',
  initialState: { sum: 0 },
  reducers: {
    plus: (state, action) => {
      state.sum = state.sum + action.payload
    },
    reset: (state, action) => {
      state.sum = 0
    }

  }
})

export default testSlice;
export const { plus, reset } = testSlice.actions;