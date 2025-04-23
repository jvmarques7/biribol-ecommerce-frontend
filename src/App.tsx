import { AuthProvider } from "./context/AuthContext"
import AppRoutes, { AppRoutesAdmin } from "./routes"
import { BrowserRouter } from "react-router-dom"
import { LayoutBase } from "./layout/LayoutBase";
import { DashboardLayout } from "./layout/DashboardLayout";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
      <DashboardLayout restritoPara={["ADMIN", "DEV"]}>
        <LayoutBase>
            <AppRoutesAdmin />
        </LayoutBase>
      </DashboardLayout>
      <LayoutBase restritoPara={["CLIENTE"]}>
        <AppRoutes />
      </LayoutBase>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App
