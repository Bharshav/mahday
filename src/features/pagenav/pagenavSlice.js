import { createSlice } from '@reduxjs/toolkit'
import { pages } from '../../store/constants'
const tomorrow = new Date()
tomorrow.setDate(tomorrow.getDate() + 1)

const initialState = {
  currentPage: pages[0],
}

const pagenavSlice = createSlice({
  name: 'pagenav',
  initialState,
  reducers: {
    setPage: (state, { payload }) => {
      console.log(payload)
      state.currentPage = payload.page
    },
  },
})

// console.log(taskSlice)
export default pagenavSlice.reducer
export const { setPage } = pagenavSlice.actions
