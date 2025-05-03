/**
 * Redux store configuration for the application.
 * Sets up the root reducer and any middleware required for the store.
 *
 * @module store
 */

import { configureStore } from "@reduxjs/toolkit"
import employeesReducer from "../features/employeesSlice"

/**
 * The Redux store, configured with the employees reducer.
 *
 * @type {Object} Redux store instance
 */
const store = configureStore({
  reducer: {
    employees: employeesReducer,
  },
})

export default store
