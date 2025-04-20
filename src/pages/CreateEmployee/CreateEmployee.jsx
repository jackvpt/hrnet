import React, { useState } from "react"
import { Link } from "react-router-dom"
import "./CreateEmployee.scss"
import SmartInput from "../../components/SmartInput/SmartInput"
import states from "../../data/states"
import Modal from "../../components/Modal/Modal"

/**
 * Error page component displayed for non-existing routes (404 error).
 *
 * @category Components
 * @component
 * @returns {JSX.Element} The Error page component with a 404 message and a link to the home page.
 */

const CreateEmployee = () => {
  const [form, setForm] = useState({
    firstName: "Prénom",
    lastName: "Nom",
    birthDate: "2000-01-01",
    startDate: "2020-12-25",
    street: "123 rue de Paris",
    address: "Adresse",
    postalCode: "99999",
    city: "City",
  })

  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const formElement = e.target
    if (!formElement.checkValidity()) {
      formElement.reportValidity()
      return
    }
    setIsModalOpen(true)
  }

  return (
    <section className="container_create_employee">
      <h1 className="container_create_employee__title">Create Employee</h1>

      <form onSubmit={handleSubmit} noValidate>
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
            name="postalCode"
            placeholder="75000"
            value={form.postalCode}
            onChange={handleChange}
            required
            pattern="\d{5}"
            errorMessage="5 digits"
          />
        </fieldset>

        <button type="submit">Save</button>
      </form>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        modalElements={{
          title: "HRNET",
          subtitle: "New employee created",
          text: `Employee '${form.firstName} ${form.lastName}' has been created successfully`,
          htmlElement:`<p>Employee '${form.firstName} ${form.lastName}' has been created successfully</p>`,
        }}
        modalOptions={{
          headerBackgroundColor: "lightgreen",
          headerTextColor: "black",
        }}
      ></Modal>
    </section>
  )
}

export default CreateEmployee
