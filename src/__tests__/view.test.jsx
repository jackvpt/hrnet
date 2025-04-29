import { loadEmployees } from "../features/employeesSlice"
import { configureStore } from "@reduxjs/toolkit"
import employeesReducer from "../features/employeesSlice"

// Mock globalThis.fetch
global.fetch = vi.fn()

const mockEmployees = [
  {
    id: "1",
    firstName: "Alice",
    lastName: "Dupont",
    birthDate: "1990-01-01",
    startDate: "2020-01-01",
    department: "Engineering",
    address: {
      street: "1 rue de Paris",
      city: "Paris",
      state: "IDF",
      zipCode: "75001",
    },
  },
]

describe("loadEmployees thunk", () => {
  let store

  beforeEach(() => {
    fetch.mockClear()
    localStorage.clear()
    store = configureStore({
      reducer: {
        employees: employeesReducer,
      },
    })
  })

  it("should dispatch fulfilled when fetch succeeds", async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockEmployees,
    })

    await store.dispatch(loadEmployees())

    const state = store.getState().employees
    expect(state.status).toBe("succeeded")
    expect(state.list).toEqual(mockEmployees)
    expect(localStorage.getItem("employees")).toEqual(
      JSON.stringify(mockEmployees)
    )
  })

  it("should dispatch rejected when fetch fails", async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
    })

    await store.dispatch(loadEmployees())

    const state = store.getState().employees
    expect(state.status).toBe("failed")
    expect(state.error).toBe("Failed to load mock employees")
  })

  it("should load from localStorage if available", async () => {
    localStorage.setItem("employees", JSON.stringify(mockEmployees))

    await store.dispatch(loadEmployees())

    const state = store.getState().employees
    expect(fetch).not.toHaveBeenCalled()
    expect(state.list).toEqual(mockEmployees)
  })
})
