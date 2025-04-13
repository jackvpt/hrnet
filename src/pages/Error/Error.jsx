import React from "react"
import { Link } from "react-router-dom"
import "./Error.scss"

/**
 * Error page component displayed for non-existing routes (404 error).
 *
 * @category Components
 * @component
 * @returns {JSX.Element} The Error page component with a 404 message and a link to the home page.
 */
const Error = () => {
  return (
    <section className="error">
      <h1>404</h1>
      <h2>Oops! The page you're requesting doesn't exist.</h2>
      <Link className="error__link" to="/" aria-label="Back to home page">
        Back to home page
      </Link>
    </section>
  )
}

export default Error
