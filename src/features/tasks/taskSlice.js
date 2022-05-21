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
        completed: false,
        type: payload.type,
        typeprops: payload.typeprops,
        isEditable: false,
      })
    },
    setEditable: (state, { payload }) => {
      const task = state.tasks.find((task) => task.id === payload.id)
      task.isEditable = payload.editstatus
    }
  },
})

// console.log(taskSlice)
export default taskSlice.reducer
export const { addTask, setEditable } = taskSlice.actions
