import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  tasks: [],
  isLoading: true,
  total: 0,
}

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, { payload }) => {
      // console.log(payload)
      state.tasks.push({
        id: state.tasks.length + 1,
        description: payload.description,
        isCompleted: false,
        type: payload.type,
        typeprops: payload.typeprops,
        isEditable: false,
        taskDate: payload.taskDate
      })
    },
    setEditable: (state, { payload }) => {
      const task = state.tasks.find((task) => task.id === payload.id)
      task.isEditable = payload.editstatus
      if (payload.editstatus === false) {
        task.description = payload.description
      }
    },
    markAsCompleted: (state, { payload }) => {
      const task = state.tasks.find((task) => task.id === payload.id)
      task.isCompleted = payload.completeStatus
    }
  },
})

// console.log(taskSlice)
export default taskSlice.reducer
export const { addTask, setEditable, markAsCompleted } = taskSlice.actions
