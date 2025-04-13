import React, { useState } from "react"
import { Link } from "react-router-dom"
import "./CreateEmployee.scss"
import SmartInput from "../../components/SmartInput/SmartInput"

/**
 * Error page component displayed for non-existing routes (404 error).
 *
 * @category Components
 * @component
 * @returns {JSX.Element} The Error page component with a 404 message and a link to the home page.
 */


const CreateEmployee = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    birthDate: "",
    address: "",
    postalCode: "",
    city: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <section className="container_create_employee">
      <h1 className="container_create_employee__title">Create Employee</h1>

      <form>
        <SmartInput
          label="Prénom"
          name="firstName"
          placeholder="Jean"
          value={form.firstName}
          onChange={handleChange}
          required
          minLength={2}
        />
        <SmartInput
          label="Nom"
          name="lastName"
          placeholder="Dupont"
          value={form.lastName}
          onChange={handleChange}
          required
          minLength={2}
        />
        <SmartInput
          label="Date de naissance"
          name="birthDate"
          type="date"
          value={form.birthDate}
          onChange={handleChange}
          required
        />
        <SmartInput
          label="Adresse"
          name="address"
          placeholder="123 rue de Paris"
          value={form.address}
          onChange={handleChange}
          required
        />
        <SmartInput
          label="Code postal"
          name="postalCode"
          placeholder="75000"
          value={form.postalCode}
          onChange={handleChange}
          required
          pattern="^\d{5}$"
        />
        <SmartInput
          label="Ville"
          name="city"
          placeholder="Paris"
          value={form.city}
          onChange={handleChange}
          required
        />
        <button type="submit">Save</button>
      </form>
    </section>
  )
}

export default CreateEmployee
