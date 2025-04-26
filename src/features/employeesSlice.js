import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

/**
 * Async thunk to load mock employees from a local JSON file.
 *
 * Dispatches:
 * - `loadEmployees.pending`: When the request starts.
 * - `loadEmployees.fulfilled`: On successful fetch, returns the employee array.
 * - `loadEmployees.rejected`: If the fetch fails.
 *
 * @async
 * @function
 * @returns {Promise<Object[]>} The list of mock employees.
 * @throws {Error} If the fetch fails.
 */
export const loadEmployees = createAsyncThunk(
  "employees/loadEmployees",
  async () => {
    const response = await fetch("/__mocks__/employees.json")
    if (!response.ok) throw new Error("Failed to load mock employees")
    return await response.json()
  }
)

/**
 * Redux slice for managing the employee list, loading status, and errors.
 *
 * State structure:
 * {
 *   list: Array<Object>,       // Array of employee objects
 *   status: "idle" | "loading" | "succeeded" | "failed",  // Async load status
 *   error: string | null       // Error message if load fails
 * }
 */
const employeesSlice = createSlice({
  name: "employees",
  initialState: {
    list: [],
    status: "idle",
    error: null,
  },
  reducers: {
    addEmployee: (state, action) => {
      state.list.push({
        ...action.payload,
        id: crypto.randomUUID(),
        birthDate: action.payload.birthDate.toISOString(),
        startDate: action.payload.startDate.toISOString()
      })
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadEmployees.pending, (state) => {
        state.status = "loading"
      })
      .addCase(loadEmployees.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.list = action.payload
      })
      .addCase(loadEmployees.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error.message
      })
  },
})

export const { addEmployee } = employeesSlice.actions
export default employeesSlice.reducer
