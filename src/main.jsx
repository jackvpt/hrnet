import "./styles/main.scss" // Import the main SCSS styles
import { StrictMode } from "react" // Import React's StrictMode for highlighting potential problems
import { createRoot } from "react-dom/client" // Import createRoot for React 18+ rendering
import { Provider } from "react-redux" // Import Provider to connect Redux to the React app
import App from "./App.jsx" // Import the main App component
import store from "./store/store.js" // Import the Redux store

/**
 * Main entry point of the React application.
 *
 * - `StrictMode` enables additional checks and warnings during development.
 * - `Provider` makes the Redux `store` available to all React components.
 * - `App` is the root component of the application.
 */
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
)
