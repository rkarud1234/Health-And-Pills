import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { client } from '../../api/index.js'

export const eventCountNum = createAsyncThunk(
  'user/eventCountNum',
  async () => {
    return client.post(`/users/event`)
      .then(res => {
        if (res.status === 200) {
          alert('테스트 참여 완료! 결과 페이지로 이동합니다.')
          return res.data
        } else {
          return false
        }
      })
      .catch(error => {
        return false
      })
  }
)

const testSlice = createSlice({
  name: 'testSlice',
  initialState: {
    sum: 0,
    conuntNum: '',
  },
  reducers: {
    plus: (state, action) => {
      state.sum = state.sum + action.payload
    },
    reset: (state, action) => {
      state.sum = 0
    }
  },
  extraReducers: (builder) => {
    builder.addCase(eventCountNum.fulfilled, (state, { payload }) => {
      state.status = 'succeeded';
      state.conuntNum = payload;
    })
  }
})

export default testSlice;
export const { plus, reset } = testSlice.actions;