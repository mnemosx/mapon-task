import { configureStore } from '@reduxjs/toolkit'
import api from './middleware/api'

import { combineReducers } from 'redux'

import vehicles from './reducers/vehicles'
import userInputs from './reducers/userInputs'

const rootReducer = combineReducers({
  vehicles,
  userInputs
})

export default configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(api)
})
