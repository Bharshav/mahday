import { createSlice } from '@reduxjs/toolkit'

const tomorrow = new Date()
tomorrow.setDate(tomorrow.getDate() + 1)

const initialState = {
  currentViewDateStart: (new Date()).toJSON(),
  currentViewDateEnd: tomorrow.toJSON(),
}

const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    modifyViewDate: (state, { payload }) => {
      // console.log(payload)
      state.currentViewDateStart = payload.newDateStart.toJSON()
      state.currentViewDateEnd = payload.newDateEnd.toJSON()
    },
  },
})

// console.log(taskSlice)
export default calendarSlice.reducer
export const { modifyViewDate } = calendarSlice.actions
