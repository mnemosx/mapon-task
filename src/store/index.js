import { configureStore } from '@reduxjs/toolkit'
import api from './middleware/api'

import { combineReducers } from 'redux'

import vehicles from './reducers/vehicles'
import routes from './reducers/routes'
import userInputs from './reducers/userInputs'

const rootReducer = combineReducers({
  vehicles,
  routes,
  userInputs
})

export default configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(api)
})
