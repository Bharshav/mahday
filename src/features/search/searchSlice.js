import { createSlice } from '@reduxjs/toolkit'


const initialState = {
  searchTerm : ''
}

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    modifySearchTerm: (state, { payload }) => {
      // console.log(payload)
      state.searchTerm = payload.searchTerm
      
    },
    
  },
})

// console.log(taskSlice)
export default searchSlice.reducer
export const { modifySearchTerm } = searchSlice.actions
