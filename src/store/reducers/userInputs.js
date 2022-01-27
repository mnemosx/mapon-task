import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'userInputs',
  initialState: {
    vehicleNumber: '',
    dateFrom: '',
    dateTo: new Date()
  },

  reducers: {
    vehicleChanged: (state, action) => {
      state.vehicleNumber = action.payload
    },
    dateFromChanged: (state, action) => {
      state.dateFrom = action.payload
    },
    dateToChanged: (state, action) => {
      state.dateTo = action.payload
    }
  }
})

export default slice.reducer

export const { vehicleChanged, dateFromChanged, dateToChanged } = slice.actions
