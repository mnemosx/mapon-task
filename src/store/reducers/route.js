import { createSlice } from '@reduxjs/toolkit'
import { apiCallBegan } from '../api'
import { parseISO, differenceInMinutes, formatDuration } from 'date-fns'

const slice = createSlice({
  name: 'route',
  initialState: {
    routeMarkers: [],
    routeStats: {},
    loading: false
  },

  reducers: {
    routesRequested: (routes, action) => {
      routes.loading = true
    },

    routesReceived: (state, action) => {
      const {
        data: {
          units: [{ routes }]
        }
      } = action.payload

      const validRoutes = routes.filter(route => route.type === 'route')
      state.routeMarkers = validRoutes.map(route => ({
        lat: route.start.lat,
        lng: route.start.lng,
        polyline: route.polyline
      }))
      const { distance, time } = validRoutes.reduce(
        (stats, { distance, end, start }) => {
          return {
            ...stats,
            distance: stats.distance + distance,
            time:
              stats.time +
              differenceInMinutes(parseISO(end.time), parseISO(start.time))
          }
        },
        { distance: 0, time: 0 }
      )
      state.routeStats = {
        distance: Math.round(distance / 1000),
        time: { hours: Math.floor(time / 60), minutes: time % 60 }
      }
      state.loading = false
    },

    routesRequestFailed: (routes, action) => {
      routes.loading = false
    }
  }
})

export default slice.reducer

const { routesRequested, routesReceived, routesRequestFailed } = slice.actions

export const loadRouteData =
  ({ unit_id, from, till }) =>
  dispatch => {
    const url = `/route/list.json?key=${process.env.REACT_APP_API_KEY}&unit_id=${unit_id}&from=${from}&till=${till}&include[]=polyline`
    return dispatch(
      apiCallBegan({
        url,
        onStart: routesRequested.type,
        onSuccess: routesReceived.type,
        onError: routesRequestFailed.type
      })
    )
  }
