import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

export const loadEmployees = createAsyncThunk(
  "employees/loadEmployees",
  async () => {
    const response = await fetch("/__mocks__/employees.json")
    if (!response.ok) throw new Error("Failed to load mock employees")
    return await response.json()
  }
)

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
