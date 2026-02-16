import logo from "./logo.svg"
import "./App.css"
import { RouterProvider } from "react-router-dom"
import routes  from "./router/index.js"

function App() {
  return (
    <div className="App">
      <RouterProvider router={routes} />
    </div>
  )
}

export default App
