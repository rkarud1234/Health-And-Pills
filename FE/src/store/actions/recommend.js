import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { client } from '../../api/index.js'

const initialState = {
  status: '',
  bestPills: null,
  bstatus: null,
  customPills: null,
  cstatus: null,
  userPills: null,
  ustatus: null,
  similarPills: null,
}
//베스트 영양제 추천
export const BestPillsFetch = createAsyncThunk(
  'Pills/BestPillsFetch',
  async () => {
    return client.get(`recommend/pills/best`)
      .then(res => {
        if (res.status === 200) {
          return res.data
        } else {
          alert('추천 영양제를 불러올 수 없습니다.')
          window.history.go(-1)
        }
      })
  }
)

// 사용자 맞춤 영양제 추천
export const CustomPillsFetch = createAsyncThunk(
  'Pills/CustomPillsFetch',
  async () => {
    return client.get(`recommend/pills/custom`)
      .then(res => {
        if (res.status === 200) {
          return res.data
        } else {
          alert('추천 영양제 를 불러올 수 없습니다.')
          window.history.go(-1)
        }
      })
  }
)

// 유사한 사용자 영양제 추천
export const UserPillsFetch = createAsyncThunk(
  'Pills/UserPillsFetch',
  async () => {
    return client.get(`recommend/pills/user`)
      .then(res => {
        if (res.status === 200) {
          return res.data
        } else {
          alert('추천 영양제를 불러올 수 없습니다.')
          window.history.go(-1)
        }
      })
  }
)

export const SimilarPillsFetch = createAsyncThunk(
  'Pills/SimilarPillsFetch',
  async (id) => {
    return client.get(`recommend/pills/item/${id}`)
      .then(res => {
        if (res.status === 200) {
          return res.data
        } else {
          alert('추천 영양제 를 불러올 수 없습니다.')
          window.history.go(-1)
        }
      })
  }
)


const recommendSlice = createSlice({
  name: 'recommendSlice',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(BestPillsFetch.pending, (state, action) => {
      state.bstatus = '';
    })
    builder.addCase(BestPillsFetch.fulfilled, (state, { payload }) => {
      state.bstatus = 'succeeded';
      state.bestPills = payload;
    })
    builder.addCase(CustomPillsFetch.pending, (state, action) => {
      state.cstatus = '';
    })
    builder.addCase(CustomPillsFetch.fulfilled, (state, { payload }) => {
      state.cstatus = 'succeeded';
      state.customPills = payload;
    })
    builder.addCase(UserPillsFetch.pending, (state, action) => {
      state.ustatus = '';
    })
    builder.addCase(UserPillsFetch.fulfilled, (state, { payload }) => {
      state.ustatus = 'succeeded';
      state.userPills = payload;
    })
    builder.addCase(SimilarPillsFetch.fulfilled, (state, { payload }) => {
      state.status = 'succeeded';
      state.similarPills = payload;
    })
  }
})

export default recommendSlice