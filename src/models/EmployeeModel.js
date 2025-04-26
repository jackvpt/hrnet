/**
 * Class representing an Employee.
 * Provides utility methods to format dates and addresses.
 */
export class EmployeeModel {
  /**
   * Create an employee model instance.
   *
   * @param {Object} data - The raw employee data.
   * @param {string} data.id - Unique identifier.
   * @param {string} data.firstName - First name of the employee.
   * @param {string} data.lastName - Last name of the employee.
   * @param {string|Date} data.birthDate - Date of birth (ISO string or Date).
   * @param {string|Date} data.startDate - Start date of employment.
   * @param {string} data.department - Department name.
   * @param {Object} [data.address] - Address information.
   * @param {string} [data.address.street] - Street address.
   * @param {string} [data.address.city] - City.
   * @param {string} [data.address.state] - State.
   * @param {string} [data.address.zipCode] - ZIP code.
   */
  constructor(data) {
    this.id = data.id
    this.firstName = data.firstName
    this.lastName = data.lastName
    this.birthDate = new Date(data.birthDate)
    this.startDate = new Date(data.startDate)
    this.department = data.department

    this.address = {
      street: data.address?.street ?? "",
      city: data.address?.city ?? "",
      state: data.address?.state ?? "",
      zipCode: data.address?.zipCode ?? "",
    }
  }

  /**
   * Format a given date into a localized string.
   *
   * @param {Date} [date=new Date()] - The date to format.
   * @param {string} [locale="fr-FR"] - Locale for formatting.
   * @returns {string} Formatted date string.
   */
  getFormattedDate(date = new Date(), locale = "fr-FR") {
    return date.toLocaleDateString(locale)
  }

  /**
   * Get the formatted birth date string.
   *
   * @param {string} [locale="fr-FR"] - Locale for formatting.
   * @returns {string} Formatted birth date.
   */
  getFormattedBirthDate(locale = "fr-FR") {
    return this.getFormattedDate(this.birthDate, locale)
  }

  /**
   * Get the formatted start date string.
   *
   * @param {string} [locale="fr-FR"] - Locale for formatting.
   * @returns {string} Formatted start date.
   */
  getFormattedStartDate(locale = "fr-FR") {
    return this.getFormattedDate(this.startDate, locale)
  }
}
