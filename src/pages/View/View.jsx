import "./View.scss"
import React, { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  TextField,
  Paper,
} from "@mui/material"
import { visuallyHidden } from "@mui/utils"
import { fetchEmployees } from "../../api/employees"

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index])
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0])
    if (order !== 0) return order
    return a[1] - b[1]
  })
  return stabilizedThis.map((el) => el[0])
}

const View = () => {
  const [order, setOrder] = useState("asc")
  const [orderBy, setOrderBy] = useState("firstName")
  const [searchQuery, setSearchQuery] = useState("")

  const {
    data: employees,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["employees"],
    queryFn: () => fetchEmployees(),
  })

  const handleSearch = (event) => {
    setSearchQuery(event.target.value)
  }

  if (isLoading) return <p>Chargement...</p>
  if (error) return <p>Erreur lors du chargement des données</p>

  const filteredData = employees.filter(
    (entry) =>
      entry.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.department.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc"
    setOrder(isAsc ? "desc" : "asc")
    setOrderBy(property)
  }

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TextField
        label="Search"
        variant="outlined"
        onChange={handleSearch}
        sx={{ margin: "10px" }}
      />
      <TableContainer>
        <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
          <TableHead>
            <TableRow>
              {/* First name */}
              <TableCell>
                <TableSortLabel
                  active={orderBy === "firstName"}
                  direction={orderBy === "firstName" ? order : "asc"}
                  onClick={() => handleRequestSort("firstName")}
                  >
                  First Name
                </TableSortLabel>
              </TableCell>

              {/* Last name */}
              <TableCell>
                <TableSortLabel
                  active={orderBy === "lastName"}
                  direction={orderBy === "lastName" ? order : "asc"}
                  onClick={() => handleRequestSort("lastName")}
                  >
                  Last Name
                </TableSortLabel>
              </TableCell>

              {/* Start date */}
              <TableCell>
                <TableSortLabel
                  active={orderBy === "startDate"}
                  direction={orderBy === "startDate" ? order : "asc"}
                  onClick={() => handleRequestSort("startDate")}
                  >
                  Start Date
                </TableSortLabel>
              </TableCell>

              {/* Department */}
              <TableCell>
                <TableSortLabel
                  active={orderBy === "department"}
                  direction={orderBy === "department" ? order : "asc"}
                  onClick={() => handleRequestSort("department")}
                  >
                  Department
                </TableSortLabel>
              </TableCell>

              {/* Date of birth */}
              <TableCell>
                <TableSortLabel
                  active={orderBy === "birthDate"}
                  direction={orderBy === "birthDate" ? order : "asc"}
                  onClick={() => handleRequestSort("birthDate")}
                  >
                  Date of Birth
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No matching records found.
                </TableCell>
              </TableRow>
            ) : (
              stableSort(filteredData, getComparator(order, orderBy)).map(
                (row) => (
                  <TableRow hover key={row.id}>
                    <TableCell>{row.firstName}</TableCell>
                    <TableCell>{row.lastName}</TableCell>
                    <TableCell>{row.startDate}</TableCell>
                    <TableCell>{row.department}</TableCell>
                    <TableCell>{row.birthDate}</TableCell>
                  </TableRow>
                )
              )
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <div style={{ padding: "10px" }}>
        <span>Showing 0 to 0 of {filteredData.length} entries</span>
      </div>
    </Paper>
  )
}

export default View
