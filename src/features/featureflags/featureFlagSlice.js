import { createSlice } from '@reduxjs/toolkit'


const initialState = {
  playSounds: true,
  
}

export const FeatureFlags = {
PLAYSOUND : 'playSounds'
}
Object.freeze(FeatureFlags)
const featureFlagSlice = createSlice({
  name: 'featureflag',
  initialState,
  reducers: {
    enableFeatureFlag: (state, { payload }) => {
      state[payload.featureFlag] = true
    },
    disableFeatureFlag: (state, { payload }) => {
      state[payload.featureFlag] = false
    },
  },
})

// console.log(taskSlice)
export default featureFlagSlice.reducer
export const { enableFeatureFlag,disableFeatureFlag } = featureFlagSlice.actions
