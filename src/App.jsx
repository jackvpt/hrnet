import { useEffect } from "react" // Import useEffect to handle side effects in React
import { useDispatch } from "react-redux" // Import useDispatch to dispatch Redux actions
import { loadEmployees } from "./features/employeesSlice" // Import the action to load employees
import Router from "./components/Router/Router" // Import the application's router component

/**
 * Main application component.
 *
 * - Dispatches the `loadEmployees` action when the component mounts.
 * - Renders the `Router` component to handle application routes.
 *
 * @component
 * @returns {JSX.Element} The rendered Router component
 */
const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    // Load employees data when the app is first rendered
    dispatch(loadEmployees())
  }, [dispatch])

  return <Router />
}

export default App
