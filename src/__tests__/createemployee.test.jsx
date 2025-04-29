import { render, screen, fireEvent, waitFor, within } from "@testing-library/react"
import { Provider } from "react-redux"
import { configureStore } from "@reduxjs/toolkit"
import employeesReducer from "../features/employeesSlice"
import CreateEmployee from "../pages/CreateEmployee/CreateEmployee"
import React from "react"
import { vi } from "vitest"

describe("CreateEmployee integration test", () => {
  it("submits the form and shows the success modal", async () => {
    // Crée un faux store
    const store = configureStore({
      reducer: {
        employees: employeesReducer,
      },
    })

    render(
      <Provider store={store}>
        <CreateEmployee />
      </Provider>
    )

    // Remplir les champs obligatoires si nécessaire
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
    // Soumettre le formulaire
    fireEvent.click(screen.getByRole("button", { name: /Save/i }))
    // Attendre que le modal s'affiche avec le texte de confirmation
    await waitFor(() => {
        const modal = screen.getByRole("dialog") // ou un conteneur connu
        expect(within(modal).findAllByText((_, node) =>
          node.textContent.includes("Employee 'John Doe' has been created successfully")
        ))
      })
  })
})
