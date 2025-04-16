import React, { useState } from "react"
import { Link } from "react-router-dom"
import "./CreateEmployee.scss"
import SmartInput from "../../components/SmartInput/SmartInput"
import states from "../../data/states"

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
          label="First name"
          name="firstName"
          placeholder="Jean"
          value={form.firstName}
          onChange={handleChange}
          required
          minLength={2}
          errorMessage="At least 2 characters"
        />
        <SmartInput
          label="Last name"
          name="lastName"
          placeholder="Dupont"
          value={form.lastName}
          onChange={handleChange}
          required
          minLength={2}
          errorMessage="At least 2 characters"
        />
        <SmartInput
          label="Date of birth"
          name="birthDate"
          type="date"
          value={form.birthDate}
          onChange={handleChange}
          required
          dateValidity={{
            futureAllowed: false,
            minimumAge: 16,
          }}
        />
        <SmartInput
          label="Start date"
          name="startDate"
          type="date"
          value={form.startDate}
          onChange={handleChange}
          required
          dateValidity={{
            futureAllowed: true,
          }}
        />
        <fieldset>
          <legend>Address</legend>

          <SmartInput
            label="Street"
            name="street"
            placeholder="123 rue de Paris"
            value={form.street}
            onChange={handleChange}
            required
            minLength={2}
            errorMessage="At least 2 characters"
          />
          <SmartInput
            label="City"
            name="city"
            placeholder="Paris"
            value={form.city}
            onChange={handleChange}
            required
            minLength={1}
            errorMessage="Enter a city name"
          />
          <label htmlFor="state">State</label>
          <select>
            {states.map((state) => (
              <option key={state.abbreviation} value={state.abbreviation}>
                {state.name}
              </option>
            ))}
          </select>

          <SmartInput
            label="Zip code"
            name="zipCode"
            placeholder="75000"
            value={form.postalCode}
            onChange={handleChange}
            required
            pattern="^\d{5}$"
            errorMessage="5 digits"
          />
        </fieldset>

        <button type="submit">Save</button>
      </form>
    </section>
  )
}

export default CreateEmployee
