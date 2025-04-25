export class EmployeeModel {
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
  
    getFormattedDate(date = new Date(), locale = "fr-FR") {
      return date.toLocaleDateString(locale)
    }
  
    getFormattedBirthDate(locale = "fr-FR") {
      return this.getFormattedDate(this.birthDate, locale)
    }
  
    getFormattedStartDate(locale = "fr-FR") {
      return this.getFormattedDate(this.startDate, locale)
    }
  
    getFullAddress() {
      const { street, city, state, zipCode } = this.address
      return `${street}, ${zipCode} ${city}, ${state}`
    }
  }
  