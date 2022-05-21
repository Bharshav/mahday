import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentViewDate: new Date()
}

const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    modifyViewDate: (state, { payload }) => {
      // console.log(payload)
      state.currentViewDate = payload.newDate
    }
    
  },
})

// console.log(taskSlice)
export default calendarSlice.reducer
export const { modifyViewDate } = calendarSlice.actions
