import "./CreateEmployee.scss"
import { useState } from "react"
import { useDispatch } from "react-redux"
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
} from "@mui/material"
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
import Modal from "../../components/Modal/Modal"
import states from "../../data/states"
import departments from "../../data/departments"
import { addEmployee } from "../../features/employeesSlice"

const CreateEmployee = () => {
  const [form, setForm] = useState({
    firstName: "Prénom",
    lastName: "Nom",
    birthDate: new Date("2000-12-25"),
    startDate: new Date("2023-10-01"),
    address: {
      street: "123 rue de Paris",
      city: "City",
      state: states[0].name,
      zipCode: "99999",
    },
    department: departments[0].name,
  })

  const dispatch = useDispatch()

  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    if (["street", "city", "state", "zipCode"].includes(name)) {
      setForm((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [name]: value,
        },
      }))
    } else {
      setForm((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const formElement = e.target
    if (!formElement.checkValidity()) {
      formElement.reportValidity()
      return
    }

    const newEmployee = {
      ...form,
    }

    dispatch(addEmployee(newEmployee))
    setIsModalOpen(true)
  }

  return (
    <section className="container-create-employee">
      <h1 className="container_create_employee__title">Create Employee</h1>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <form onSubmit={handleSubmit}>
          <TextField
            className="container-create-employee__textField"
            label="First name"
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            placeholder="Jean"
            required
            fullWidth
            variant="outlined"
            error={form.firstName.length < 2}
            helperText={
              form.firstName.length < 2
                ? "First name must be at least 2 characters"
                : ""
            }
          />
          <TextField
            className="container-create-employee__textField"
            label="Last name"
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            placeholder="Doe"
            required
            fullWidth
            variant="outlined"
            error={form.lastName.length < 2}
            helperText={
              form.lastName.length < 2
                ? "Last name must be at least 2 characters"
                : ""
            }
          />
          <DatePicker
            label="Date of Birth"
            value={form.birthDate}
            onChange={(newValue) =>
              setForm((prev) => ({ ...prev, birthDate: newValue }))
            }
            slotProps={{
              textField: {
                variant: "outlined",
                fullWidth: true,
              },
            }}
          />
          <DatePicker
            label="Start date"
            value={form.startDate}
            onChange={(newValue) =>
              setForm((prev) => ({ ...prev, startDate: newValue }))
            }
            slotProps={{
              textField: {
                variant: "outlined",
                fullWidth: true,
              },
            }}
          />

          <fieldset className="container-create-employee__fieldset" style={{}}>
            <legend>Address</legend>
            <TextField
              className="container-create-employee__textField"
              label="Street"
              name="street"
              value={form.address.street}
              onChange={handleChange}
              placeholder="123 rue de Paris"
              required
              fullWidth
              variant="outlined"
              error={form.address.street.length < 2}
              helperText={
                form.address.street.length < 2
                  ? "Street must be at least 2 characters"
                  : ""
              }
            />
            <TextField
              className="container-create-employee__textField"
              label="City"
              name="city"
              value={form.address.city}
              onChange={handleChange}
              placeholder="Gotham City"
              required
              fullWidth
              variant="outlined"
              error={form.address.city.length < 2}
              helperText={
                form.address.city.length < 2
                  ? "City must be at least 2 characters"
                  : ""
              }
            />
            <FormControl fullWidth variant="outlined" required>
              <InputLabel id="state-label">State</InputLabel>
              <Select
                className="container-create-employee__textField"
                labelId="state-label"
                id="state"
                name="stae"
                value={form.address.state}
                onChange={handleChange}
                label="State"
              >
                {states.map((state) => (
                  <MenuItem key={state.abbreviation} value={state.name}>
                    {state.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              className="container-create-employee__textField"
              label="Zip Code"
              name="zipCode"
              value={form.address.zipCode}
              onChange={handleChange}
              placeholder="75001"
              required
              fullWidth
              variant="outlined"
              inputProps={{
                inputMode: "numeric",
                pattern: "[0-9]{5}",
                maxLength: 5,
              }}
              error={!/^\d{5}$/.test(form.address.zipCode)}
              helperText={
                !/^\d{5}$/.test(form.address.zipCode)
                  ? "Enter a valid 5-digit zip code"
                  : ""
              }
            />
          </fieldset>

          <FormControl fullWidth variant="outlined" required>
            <InputLabel id="department-label">Department</InputLabel>
            <Select
              className="container-create-employee__textField"
              labelId="department-label"
              id="department"
              name="department"
              value={form.department}
              onChange={handleChange}
              label="Department"
            >
              {departments.map((department) => (
                <MenuItem key={department.name} value={department.name}>
                  {department.text}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button type="submit" variant="contained" color="primary">
            Save
          </Button>
        </form>
      </LocalizationProvider>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        modalElements={{
          title: "HRNET",
          subtitle: "New employee created",
          htmlElement: (
            <p>
              Employee '
              <span style={{ fontStyle: "italic", color: "blue" }}>
                {form.firstName} {form.lastName}
              </span>
              ' has been created successfully
            </p>
          ),
        }}
        modalOptions={{
          headerBackgroundColor: "lightgreen",
          headerTextColor: "black",
          backdropColor: "rgba(0, 0, 0, 0.8)",
          shadowed: true,
        }}
        fadeDuration={500}
      ></Modal>
    </section>
  )
}

export default CreateEmployee
