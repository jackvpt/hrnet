import React from "react"
import "./Header.scss"
import { Link, NavLink } from "react-router-dom"
import logo from "../../assets/images/logo_hrnet.webp"

/**
 * Renders the main navigation header of the application.
 *
 * This component displays the application's logo and a navigation menu with links to the "View" and "Create" pages.
 *
 * @category Components
 * @component
 * @returns {React.Component} A React component displaying the header with navigation links.
 */
const Header = () => {
  return (
    <header>
      {/* Logo of the application */}
      <Link to="/" className="logo">
        <img
          className="logo__image"
          src={logo}
          alt="Logo SportSee"
          width="60"
          height="60"
        ></img>
        <h1 className="logo__title">HRnet</h1>
      </Link>

      {/* Navigation menu */}
      <nav className="navbar">
        <NavLink
          className={({ isActive }) =>
            isActive ? "navbar__link--active" : "navbar__link"
          }
          to="/view" // Links to View page
        >
          View
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? "navbar__link--active" : "navbar__link"
          }
          to="/create_employee" // Links to Profile page
        >
          Create
        </NavLink>
      </nav>
    </header>
  )
}

export default Header
