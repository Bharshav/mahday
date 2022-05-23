import { configureStore } from '@reduxjs/toolkit'
import tasksReducer from '../features/tasks/taskSlice'
import calendarReducer from '../features/calendar/calendarSlice'
import searchReducer from '../features/search/searchSlice'
export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    calendar: calendarReducer,
    search: searchReducer,
  },
})
