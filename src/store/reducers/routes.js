import { createSlice } from '@reduxjs/toolkit'
import { apiCallBegan } from '../api'

const slice = createSlice({
  name: 'routes',
  initialState: {
    list: [],
    loading: false
  },

  reducers: {
    routesRequested: (routes, action) => {
      routes.loading = true
    },

    routesReceived: (routes, action) => {
      routes.list = action.payload
      routes.loading = false
    },

    routesRequestFailed: (routes, action) => {
      routes.loading = false
    }
  }
})

export default slice.reducer

const { routesRequested, routesReceived, routesRequestFailed } = slice.actions

export const loadRoutes =
  ({ unit_id, from, till }) =>
  dispatch => {
    const url = `/route/list.json?key=${process.env.REACT_APP_API_KEY}&unit_id=${unit_id}&from=${from}&till=${till}`
    return dispatch(
      apiCallBegan({
        url,
        onStart: routesRequested.type,
        onSuccess: routesReceived.type,
        onError: routesRequestFailed.type
      })
    )
  }
