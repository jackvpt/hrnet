import { loadEmployees } from "../features/employeesSlice"
import { configureStore } from "@reduxjs/toolkit"
import employeesReducer from "../features/employeesSlice"

// Mock globalThis.fetch to simulate API calls in the tests
global.fetch = vi.fn()

// Sample mock data for employees to test the fetch functionality
const mockEmployees = [
  {
    id: "dae435ae-7b5a-41b8-88f5-fe4b522db562",
    firstName: "Lempi",
    lastName: "Lubowitz",
    birthDate: "1989-01-09",
    startDate: "2020-07-07",
    address: {
      street: "383 Elm Road",
      city: "Warren",
      state: "Kansas",
      zipCode: "51735",
    },
    department: "Human Resources",
  },
]

/**
 * Test suite for the `loadEmployees` thunk action.
 * This test suite covers the loading of employees, handling of fetch success/failure,
 * and checking the localStorage integration.
 */
describe("loadEmployees thunk", () => {
  let store

  /**
   * Setup function that runs before each test case.
   * Initializes a new Redux store and clears any previous mock data or localStorage.
   */
  beforeEach(() => {
    fetch.mockClear() // Clears any previous fetch mock calls
    localStorage.clear() // Clears localStorage before each test
    store = configureStore({
      reducer: {
        employees: employeesReducer, // Adds the employees reducer to the store
      },
    })
  })

  /**
   * Test case to check that the `loadEmployees` thunk correctly handles a successful API call.
   * It mocks a successful fetch request and checks if the store is updated and data is saved in localStorage.
   */
  it("should dispatch fulfilled when fetch succeeds", async () => {
    // Mock the fetch to return a successful response with mockEmployees data
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockEmployees,
    })

    // Dispatch the loadEmployees action
    await store.dispatch(loadEmployees())

    // Get the updated state from the store
    const state = store.getState().employees
    // Check that the status is updated to "succeeded" and the list of employees is correctly loaded
    expect(state.status).toBe("succeeded")
    expect(state.list).toEqual(mockEmployees)
    // Check that the data is saved to localStorage
    expect(localStorage.getItem("employees")).toEqual(
      JSON.stringify(mockEmployees)
    )
  })

  /**
   * Test case to check that the `loadEmployees` thunk correctly handles a failed fetch request.
   * It mocks a failed fetch response and checks if the status is updated to "failed" and the appropriate error message is set.
   */
  it("should dispatch rejected when fetch fails", async () => {
    // Mock the fetch to return a failed response (non-OK status)
    fetch.mockResolvedValueOnce({
      ok: false,
    })

    // Dispatch the loadEmployees action
    await store.dispatch(loadEmployees())

    // Get the updated state from the store
    const state = store.getState().employees
    // Check that the status is updated to "failed" and an error message is set
    expect(state.status).toBe("failed")
    expect(state.error).toBe("Failed to load mock employees")
  })

  /**
   * Test case to check that the `loadEmployees` thunk correctly loads data from localStorage if available.
   * It simulates having employees already stored in localStorage and ensures that the fetch API is not called.
   */
  it("should load from localStorage if available", async () => {
    // Manually set employees data in localStorage
    localStorage.setItem("employees", JSON.stringify(mockEmployees))

    // Dispatch the loadEmployees action
    await store.dispatch(loadEmployees())

    // Get the updated state from the store
    const state = store.getState().employees
    // Ensure that the fetch API was not called
    expect(fetch).not.toHaveBeenCalled()
    // Check that the list of employees is correctly loaded from localStorage
    expect(state.list).toEqual(mockEmployees)
  })
})
