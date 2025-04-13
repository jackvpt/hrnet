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
}) => {
  const [error, setError] = useState("")

  const handleBlur = (e) => {
    const { validity, validationMessage } = e.target
    if (!validity.valid) {
      setError(validationMessage)
    } else {
      setError("")
    }
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
