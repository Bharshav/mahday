import { createSlice } from '@reduxjs/toolkit'
import moment from 'moment'
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
    },
    deleteTask: (state, { payload }) => {
      state.tasks = state.tasks.filter((task) => task.id !== payload.id)
    },
    moveTo: (state, { payload }) => {
      const task = state.tasks.find((task) => task.id === payload.id)
      let nextDay = moment(task.taskDate)
      nextDay = nextDay.add(1, 'days')
      const newDate = payload.taskDate ? payload.taskDate : nextDay
      task.taskDate = newDate.toDate().toJSON()
    },
  },
})

// console.log(taskSlice)
export default taskSlice.reducer
export const { addTask, setEditable, markAsCompleted, deleteTask, moveTo } =
  taskSlice.actions
