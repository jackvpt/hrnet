import React, { useState } from "react"
import "./SmartInput.scss"

const SmartInput = ({
  label,
  name,
  type = "text",
  placeholder = "",
  value,
  onChange,
  required = false,
  pattern,
  maxLength,
  minLength,
  autoComplete = "on",
  errorMessage = "",
  dateValidity = null,
}) => {
  const [error, setError] = useState("")

  const handleBlur = (e) => {
    const { validity, validationMessage, value } = e.target
    const inputDate = new Date(value)
    const today = new Date()

    if (!validity.valid) {
      setError(errorMessage || validationMessage)
      return
    }

    if (dateValidity) {
      if (!dateValidity.futureAllowed && inputDate > today) {
        setError("Date can't be in the future.")
        return
      }

      if (dateValidity.minimumAge) {
        const ageDiff = today - inputDate
        const ageDate = new Date(ageDiff)
        const age = Math.abs(ageDate.getUTCFullYear() - 1970)

        if (age < dateValidity.minimumAge) {
          setError(
            `Minimum age is ${dateValidity.minimumAge} ans.`
          )
          return
        }
      }
    }

    setError("")
  }

  return (
    <div className="smart-input">
      {label && <label htmlFor={name}>{label}</label>}
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={handleBlur}
        required={required}
        pattern={pattern}
        maxLength={maxLength}
        minLength={minLength}
        autoComplete={autoComplete}
        aria-invalid={!!error}
      />
      {error && <span className="error-message">{error}</span>}
    </div>
  )
}

export default SmartInput
