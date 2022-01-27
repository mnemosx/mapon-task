import { createSlice } from '@reduxjs/toolkit'
import { apiCallBegan } from '../api'

const slice = createSlice({
  name: 'vehicles',
  initialState: {
    list: [],
    loading: false
  },

  reducers: {
    vehiclesRequested: (vehicles, action) => {
      vehicles.loading = true
    },

    vehiclesReceived: (vehicles, action) => {
      vehicles.list = action.payload
      vehicles.loading = false
    },

    vehiclesRequestFailed: (vehicles, action) => {
      vehicles.loading = false
    }
  }
})

export default slice.reducer

const { vehiclesRequested, vehiclesReceived, vehiclesRequestFailed } =
  slice.actions

const url = `/unit.json?key=${process.env.REACT_APP_API_KEY}`

export const loadVehicles = () => dispatch => {
  return dispatch(
    apiCallBegan({
      url,
      onStart: vehiclesRequested.type,
      onSuccess: vehiclesReceived.type,
      onError: vehiclesRequestFailed.type
    })
  )
}
