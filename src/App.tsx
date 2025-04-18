import { AuthProvider } from "./context/AuthContext"
import AppRoutes, { AppRoutesAdmin } from "./routes"
import { BrowserRouter } from "react-router-dom"
import { LayoutBase } from "./layout/LayoutBase";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <LayoutBase restritoPara={["ADMIN", "DEV"]}>
          <AppRoutesAdmin />
        </LayoutBase>
        <LayoutBase restritoPara={["CLIENTE"]}>
          <AppRoutes />
        </LayoutBase>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App
