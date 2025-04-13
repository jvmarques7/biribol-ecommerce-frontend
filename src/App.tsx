import { AuthProvider } from "./context/AuthContext"
import Navbar from "./layout/Navbar"
import AppRoutes from "./routes"
import { BrowserRouter } from "react-router-dom"

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar />
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
