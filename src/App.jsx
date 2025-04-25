import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { loadEmployees } from "./features/employeesSlice"
import Router from "./components/Router/Router"

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadEmployees())
  }, [dispatch])
  return <Router />
}

export default App
