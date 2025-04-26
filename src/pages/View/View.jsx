import "./View.scss"
import React, { useState } from "react"
import { useSelector } from "react-redux"
import {
  Table,
  TablePagination,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  TextField,
  Paper,
} from "@mui/material"
import { EmployeeModel } from "../../models/employeeModel"

/**
 * Safely gets a nested value from an object using a dot-separated path.
 * @param {Object} obj - The object to extract the value from.
 * @param {string} path - Dot-separated path (e.g., "address.city").
 * @returns {*} - The value at the given path or undefined if not found.
 */
function getValueByPath(obj, path) {
  return path.split(".").reduce((o, key) => (o ? o[key] : undefined), obj)
}

/**
 * Compares two values in descending order based on a property path.
 * @param {Object} a - First item to compare.
 * @param {Object} b - Second item to compare.
 * @param {string} orderBy - Property path used for comparison.
 * @returns {number} - Returns -1, 0, or 1.
 */
function descendingComparator(a, b, orderBy) {
  const aValue = getValueByPath(a, orderBy)
  const bValue = getValueByPath(b, orderBy)

  if (bValue < aValue) return -1
  if (bValue > aValue) return 1
  return 0
}

/**
 * Returns a comparator function based on the given order and property.
 * @param {"asc" | "desc"} order - Sort order.
 * @param {string} orderBy - Property path to sort by.
 * @returns {Function} - Comparator function.
 */
function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}

/**
 * Performs a stable sort on an array using the provided comparator.
 * Maintains original order for equal elements.
 * @param {Array} array - Array to sort.
 * @param {Function} comparator - Comparator function.
 * @returns {Array} - Sorted array.
 */
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index])
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0])
    if (order !== 0) return order
    return a[1] - b[1]
  })
  return stabilizedThis.map((el) => el[0])
}

/**
 * React component that displays a list of employees in a Material UI table.
 * It supports searching, sorting by column, and pagination.
 *
 * Data is pulled from the Redux store and transformed into `EmployeeModel` instances.
 *
 * @returns {JSX.Element} The rendered employee table view.
 */
const View = () => {
  const [order, setOrder] = useState("asc")
  const [orderBy, setOrderBy] = useState("lastName")
  const [searchQuery, setSearchQuery] = useState("")
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleSearch = (event) => {
    setSearchQuery(event.target.value)
  }

  const {
    list: employeesRaw,
    status,
    error,
  } = useSelector((state) => state.employees)

  const employees = employeesRaw.map((e) => new EmployeeModel(e))

  if (status === "loading") return <p>Loading...</p>
  if (status === "failed") return <p>Error while loading data: {error}</p>

  const filteredData = employees.filter((entry) => {
    const query = searchQuery.toLowerCase()

    return (
      entry.firstName.toLowerCase().includes(query) ||
      entry.lastName.toLowerCase().includes(query) ||
      entry.department.toLowerCase().includes(query) ||
      entry.startDate.toLowerCase().includes(query) ||
      entry.birthDate.toLowerCase().includes(query) ||
      entry.address.street.toLowerCase().includes(query) ||
      entry.address.city.toLowerCase().includes(query) ||
      entry.address.state.toLowerCase().includes(query) ||
      entry.address.zipCode.toLowerCase().includes(query)
    )
  })

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc"
    setOrder(isAsc ? "desc" : "asc")
    setOrderBy(property)
  }

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <div className="search-filter-bar">
        {filteredData.length > 0 && (
          <TablePagination
            rowsPerPageOptions={[10, 25, 50, 100]}
            component="div"
            count={filteredData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage="Show"
            labelDisplayedRows={() => `entries`}
          />
        )}
        <TextField
          label="Search"
          variant="outlined"
          onChange={handleSearch}
          sx={{ margin: "10px", marginLeft: "auto" }}
        />
      </div>
      <TableContainer>
        <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
          <TableHead>
            <TableRow>
              {/* First name */}
              <TableCell sx={{ textAlign: "center", width: 200 }}>
                <TableSortLabel
                  active={orderBy === "firstName"}
                  direction={orderBy === "firstName" ? order : "asc"}
                  onClick={() => handleRequestSort("firstName")}
                >
                  First Name
                </TableSortLabel>
              </TableCell>

              {/* Last name */}
              <TableCell sx={{ textAlign: "center", width: 200 }}>
                <TableSortLabel
                  active={orderBy === "lastName"}
                  direction={orderBy === "lastName" ? order : "asc"}
                  onClick={() => handleRequestSort("lastName")}
                >
                  Last Name
                </TableSortLabel>
              </TableCell>

              {/* Start date */}
              <TableCell sx={{ textAlign: "center", width: 150 }}>
                <TableSortLabel
                  active={orderBy === "startDate"}
                  direction={orderBy === "startDate" ? order : "asc"}
                  onClick={() => handleRequestSort("startDate")}
                >
                  Start Date
                </TableSortLabel>
              </TableCell>

              {/* Department */}
              <TableCell sx={{ textAlign: "center", width: 180 }}>
                <TableSortLabel
                  active={orderBy === "department"}
                  direction={orderBy === "department" ? order : "asc"}
                  onClick={() => handleRequestSort("department")}
                >
                  Department
                </TableSortLabel>
              </TableCell>

              {/* Date of birth */}
              <TableCell sx={{ textAlign: "center", width: 150 }}>
                <TableSortLabel
                  active={orderBy === "birthDate"}
                  direction={orderBy === "birthDate" ? order : "asc"}
                  onClick={() => handleRequestSort("birthDate")}
                >
                  Date of Birth
                </TableSortLabel>
              </TableCell>

              {/* Street */}
              <TableCell sx={{ textAlign: "center", width: 200 }}>
                <TableSortLabel
                  active={orderBy === "address.street"}
                  direction={orderBy === "address.street" ? order : "asc"}
                  onClick={() => handleRequestSort("address.street")}
                >
                  Street
                </TableSortLabel>
              </TableCell>

              {/* City */}
              <TableCell sx={{ textAlign: "center", width: 200 }}>
                <TableSortLabel
                  active={orderBy === "address.city"}
                  direction={orderBy === "address.city" ? order : "asc"}
                  onClick={() => handleRequestSort("address.city")}
                >
                  City
                </TableSortLabel>
              </TableCell>

              {/* State */}
              <TableCell sx={{ textAlign: "center" }}>
                <TableSortLabel
                  active={orderBy === "address.state"}
                  direction={orderBy === "address.state" ? order : "asc"}
                  onClick={() => handleRequestSort("address.state")}
                >
                  State
                </TableSortLabel>
              </TableCell>

              {/* Zipcode */}
              <TableCell sx={{ textAlign: "center", width: 150 }}>
                <TableSortLabel
                  active={orderBy === "address.zipCode"}
                  direction={orderBy === "address.zipCode" ? order : "asc"}
                  onClick={() => handleRequestSort("address.zipCode")}
                >
                  Zip Code
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No data available in table
                </TableCell>
              </TableRow>
            ) : (
              stableSort(filteredData, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow hover key={row.id}>
                    <TableCell sx={{ textAlign: "center" }}>
                      {row.firstName}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      {row.lastName}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      {row.getFormattedStartDate()}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      {row.department}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      {row.getFormattedBirthDate()}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      {row.address.street}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      {row.address.city}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      {row.address.state}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      {row.address.zipCode}
                    </TableCell>
                  </TableRow>
                ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {filteredData.length > 0 && (
        <>
          <div style={{ padding: "10px" }}>
            <span>
              Showing {filteredData.length === 0 ? 0 : page * rowsPerPage + 1}{" "}
              to {Math.min((page + 1) * rowsPerPage, filteredData.length)} of{" "}
              {filteredData.length} entries
            </span>
          </div>
        </>
      )}
    </Paper>
  )
}

export default View
