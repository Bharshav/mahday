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
      const newEndDateOfView = new Date(payload.newDateEnd?payload.newDateEnd:new Date())
      newEndDateOfView.setDate(newEndDateOfView.getDate()+1)
      state.currentViewDateStart = payload.newDateStart.toJSON()
      state.currentViewDateEnd = payload.newDateEnd? newEndDateOfView.toJSON():state.currentViewDateEnd
    },
    reset: (state) => {
      return initialState
    }
  },
})

// console.log(taskSlice)
export default calendarSlice.reducer
export const { modifyViewDate,reset } = calendarSlice.actions
