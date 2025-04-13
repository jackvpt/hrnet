import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Header from "../Header/Header"
import Error from "../../pages/Error/Error"
import CreateEmployee from "../../pages/CreateEmployee/CreateEmployee"

/**
 * Manages the routing of the application using React Router.
 *
 * This component defines the structure of the app, including:
 * - A fixed header (`Header`)
 * - A sidebar (`Sidebar`)
 * - Dynamic routes for pages (`Home`, `Profile`, and `Error`)
 *
 * @category Router
 * @component
 * @returns {JSX.Element} The Router component handling application navigation.
 */
export default function Router() {
  return (
    <BrowserRouter>
    <Header />
      <main className="container">
        <section className="section__main">
          <Routes>
            {/* Catch-CreateEmployee route */}
            <Route path="/create_employee" element={<CreateEmployee />} />
            {/* Catch-all route for 404 errors */}
            <Route path="*" element={<Error />} />
          </Routes>
        </section>
      </main>
    </BrowserRouter>
  )
}
