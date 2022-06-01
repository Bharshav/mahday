import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  logs: [],
}

const loggerSlice = createSlice({
  name: 'logger',
  initialState,
  reducers: {
    updateLog: (state, { payload }) => {
      console.log(payload)
      const log = state.logs.find((log) => log.id === payload.id)
      if (payload.description) {
        log.description = payload.description
      }
      if (payload.startdatetime) {
        log.startdatetime = payload.startdatetime
      }
      if (payload.enddatetime) {
        log.enddatetime = payload.enddatetime
      }
    },
    addLog: (state, { payload }) => {
      state.logs.push(payload)
    },
    deleteLog: (state, { payload }) => {
      state.logs = state.logs.filter((log) => log.id !== payload.id)
    },
  },
})

// console.log(taskSlice)
export default loggerSlice.reducer
export const { updateLog, addLog, deleteLog } = loggerSlice.actions
