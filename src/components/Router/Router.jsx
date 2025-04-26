import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Header from "../Header/Header"
import Error from "../../pages/Error/Error"
import CreateEmployee from "../../pages/CreateEmployee/CreateEmployee"
import View from "../../pages/View/View"

/**
 * Application router component using React Router v6.
 *
 * Defines the layout and navigation structure of the application:
 * - Displays a persistent `<Header />`
 * - Renders main content inside a container
 * - Handles routing to:
 *   - `/create_employee`: form to create a new employee
 *   - `/view`: list or detail view of employees
 *   - fallback route (`*`) rendering the `Error` page
 *
 * @category Router
 * @component
 * @returns {JSX.Element} The main Router component for the application.
 */
export default function Router() {
  return (
    <BrowserRouter>
      <Header />
      <main className="container">
        <section className="section__main">
          <Routes>
            <Route path="/create_employee" element={<CreateEmployee />} />
            <Route path="/view" element={<View />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </section>
      </main>
    </BrowserRouter>
  )
}
