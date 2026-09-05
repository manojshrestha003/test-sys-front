import type { ComponentType } from "react"
import AppRouter from "./app/routes/AppRouter"

const App = () => {
  const Router = AppRouter as unknown as ComponentType<any>

  return <Router />
}

export default App