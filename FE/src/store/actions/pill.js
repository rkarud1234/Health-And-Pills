import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { client } from '../../api/index.js'

const initialState = {
  status: '',
  pillDetail: [],

  //영양제 리뷰 정보
  reviewInfo: [],
  reviewStatus: '',

  // 영양제 리뷰 작성
  ceateReviewStatus: ''
}

//영양제 상세정보
export const PillDetailFetch = createAsyncThunk(
  'Pills/PillDetailFetch',
  async (pillID) => {
    return client.get(`pills/${pillID}`)
      .then(res => {
        if (res.status === 200) {
          return res.data
        } else {
          alert('영양제 상세정보를 불러올 수 없습니다.')
          window.history.go(-1)
        }
      })
  }
)

//영양제 리뷰
export const PillReviewFetch = createAsyncThunk(
  'Pills/PillReviewFetch',
  async (pillID) => {
    return client.get(`pills/${pillID}/review`)
      .then(res => {
        if (res.status === 200) {
          return res.data
        } else {
          alert('영양제 상세정보를 불러올 수 없습니다.')
          window.history.go(-1)
        }
      })
  }
)

// 영양제 리뷰 작성
export const createReviewFetch = createAsyncThunk(
  'pill/createReviewFetch',
  async (review) => {
    return client.post(`pills/${review.pillID}/review`, review)
      .then(res => {
        console.log(res)
        if (res.status === 200) {
          alert('후기가 정상적으로 작성되었습니다.')
          return true
        } else {
          alert('후기가 작성되지 않았습니다.')
          return false
        }
      })
      .catch(error => {
        alert('후기가 작성되지 않았습니다.')
        return false
      })
  }
)
// 영양제 리뷰 수정
export const updateReviewFetch = createAsyncThunk(
  'pill/updateReviewFetch',
  async (review) => {
    return client.put(`pills/review/${review.reviewId}`, review)
      .then(res => {
        if (res.status === 200) {
          alert('후기가 정상적으로 수정되었습니다.')
          return true
        } else {
          alert('후기가 수정되지 않았습니다.')
          return false
        }
      })
      .catch(error => {
        console.log(error)
        alert('후기가 수정되지 않았습니다.')
        return false
      })
  }
)

// 영양제 리뷰 삭제

export const DeleteReview = createAsyncThunk(
  'pill/deleteReview',
  async (reviewId) => {
    return client.delete(`pills/review/${reviewId}`)
      .then(res => {
        if (res.status === 200) {
          alert('후기가 정상적으로 삭제되었습니다.')
          return true
        } else {
          alert('후기가 삭제되지 않았습니다.')
          return false
        }
      })
      .catch(error => {
        console.log(error)
        alert('후기가 삭제되지 않았습니다.')
        return false
      })
  }
)

const pillSlice = createSlice({
  name: 'consultantList',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(PillDetailFetch.pending, (state, action) => {
      state.status = '';
    })
    builder.addCase(PillDetailFetch.fulfilled, (state, { payload }) => {
      state.status = 'succeeded';
      state.pillDetail = payload;
    })
    builder.addCase(PillDetailFetch.rejected, (state, action) => {
      state.status = 'failed';
    })
    builder.addCase(PillReviewFetch.pending, (state, action) => {
      state.reviewStatus = '';
    })
    builder.addCase(PillReviewFetch.fulfilled, (state, { payload }) => {
      state.reviewStatus = 'succeeded';
      state.reviewInfo = payload;
    })
    builder.addCase(PillReviewFetch.rejected, (state, action) => {
      state.reviewStatus = 'failed';
    })
  }
})

export default pillSlice