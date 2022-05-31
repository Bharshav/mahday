import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  logs: [],
}

const loggerSlice = createSlice({
  name: 'logger',
  initialState,
  reducers: {
    updateLog: (state, { payload }) => {
      const log = state.logs.filter(log => log.id === payload.id)
      log.description = payload.description
      log.datetime = payload.datetime 

    },
    addLog: (state, { payload }) => {
      state.logs.push(payload)
    },
    deleteLog: (state, { payload }) => {
      state.logs = state.logs.filter(log => log.id !== payload.id)
    }
  },
})

// console.log(taskSlice)
export default loggerSlice.reducer
export const { updateLog, addLog, deleteLog } = loggerSlice.actions
