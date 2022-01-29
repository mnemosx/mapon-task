import { configureStore } from '@reduxjs/toolkit'
import api from './middleware/api'

import { combineReducers } from 'redux'

import vehicles from './reducers/vehicles'
import route from './reducers/route'
import userInputs from './reducers/userInputs'

const rootReducer = combineReducers({
  vehicles,
  route,
  userInputs
})

export default configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(api)
})
