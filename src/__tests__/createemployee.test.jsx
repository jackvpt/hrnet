import {
  render,
  screen,
  fireEvent,
  waitFor,
  within,
} from "@testing-library/react"
import { Provider } from "react-redux"
import { configureStore } from "@reduxjs/toolkit"
import employeesReducer from "../features/employeesSlice"
import CreateEmployee from "../pages/CreateEmployee/CreateEmployee"
import React from "react"
import { vi } from "vitest"

/**
 * Integration test for the CreateEmployee component.
 * This test ensures that the form submission triggers the creation of an employee
 * and displays a success modal with the correct confirmation message.
 */
describe("CreateEmployee integration test", () => {
  it("submits the form and shows the success modal", async () => {
    // Create a mock store with the employeesReducer
    const store = configureStore({
      reducer: {
        employees: employeesReducer, // Add the employees slice reducer to the store
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
      target: { value: "John" }, // Set the first name to "John"
    })
    fireEvent.change(screen.getByLabelText(/Last name/i), {
      target: { value: "Doe" }, // Set the last name to "Doe"
    })
    fireEvent.change(screen.getByLabelText(/Street/i), {
      target: { value: "456 avenue du Test" }, // Set the street address
    })
    fireEvent.change(screen.getByLabelText(/City/i), {
      target: { value: "Testville" }, // Set the city name
    })
    fireEvent.change(screen.getByLabelText(/Zip Code/i), {
      target: { value: "12345" }, // Set the zip code
    })

    // Submit the form by clicking the "Save" button
    fireEvent.click(screen.getByRole("button", { name: /Save/i }))

    // Wait for the success modal to appear with the expected confirmation message
    await waitFor(() => {
      // Find the modal dialog element
      const modal = screen.getByRole("dialog")

      // Check if the modal contains the success message with the employee's name
      expect(
        within(modal).findAllByText((_, node) =>
          node.textContent.includes(
            "Employee 'John Doe' has been created successfully"
          )
        )
      )
    })
  })
})
