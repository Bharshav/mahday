import { configureStore } from '@reduxjs/toolkit'
import tasksReducer from '../features/tasks/taskSlice'
import calendarReducer from '../features/calendar/calendarSlice'
import searchReducer from '../features/search/searchSlice'

import storage from 'redux-persist/lib/storage'
import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import thunk from 'redux-thunk'

const reducers = combineReducers({
  tasks: tasksReducer,
  calendar: calendarReducer,
  search: searchReducer,
})

// export const store = configureStore({
//   reducer: {
//     tasks: tasksReducer,
//     calendar: calendarReducer,
//     search: searchReducer,
//   },
// })

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, reducers)

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk],
})

export default store