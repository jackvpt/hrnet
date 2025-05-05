import {
  render,
  screen,
  fireEvent,
} from "@testing-library/react"
import { Provider } from "react-redux"
import { configureStore } from "@reduxjs/toolkit"
import employeesReducer from "../features/employeesSlice"
import CreateEmployee from "../pages/CreateEmployee/CreateEmployee"
import React from "react"

/**
 * Integration test for the CreateEmployee component.
 * This test ensures that the form submission works correctly
 * without checking the success modal.
 */
describe("CreateEmployee integration test", () => {
  it("submits the form without error", () => {
    // Create a mock store with the employeesReducer
    const store = configureStore({
      reducer: {
        employees: employeesReducer,
      },
    })

    // Render the CreateEmployee component wrapped with the Redux provider
    render(
      <Provider store={store}>
        <CreateEmployee />
      </Provider>
    )

    // Fill in the required fields for the form
    fireEvent.change(screen.getByLabelText(/First name/i), {
      target: { value: "John" },
    })
    fireEvent.change(screen.getByLabelText(/Last name/i), {
      target: { value: "Doe" },
    })
    fireEvent.change(screen.getByLabelText(/Street/i), {
      target: { value: "456 avenue du Test" },
    })
    fireEvent.change(screen.getByLabelText(/City/i), {
      target: { value: "Testville" },
    })
    fireEvent.change(screen.getByLabelText(/Zip Code/i), {
      target: { value: "12345" },
    })

    // Submit the form
    fireEvent.click(screen.getByRole("button", { name: /Save/i }))

  })
})
