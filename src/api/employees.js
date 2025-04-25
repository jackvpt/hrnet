export const fetchEmployees = async () => {
    try {
      const response = await fetch("/__mocks__/employees.json")
      if (!response.ok) throw new Error("Mock data request failed")
      const employees = await response.json()  

      if (!employees) throw new Error(`No employee found in mock data.`)
  
      return employees
    } catch (error) {
      console.error(
        `Error fetching employees from mock data: ${error.message}`
      )
      throw error
    }
  }

  export const createEmployee = async (employeeData) => {
    console.log('Mock employee created:', employeeData);
    return employeeData;
  };