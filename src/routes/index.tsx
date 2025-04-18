import { Routes, Route } from "react-router-dom"
import Home from "../pages/Home"
import Login from "../pages/Login"
import Admin from "../pages/Admin"
import Produtos from "../pages/Produtos"
import PrivateRoute from "./PrivateRoute"
import ProdutoDetalhe from "../pages/ProdutoDetalhe"
import Carrinho from "../pages/Carrinho"
import MeusPedidos from "../pages/MeusPedidos"
import Cadastro from "../pages/Cadastro"
import Perfil from "../pages/Perfil"
import { DashboardLayout } from "../layout/DashboardLayout"

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<Cadastro />} />
      <Route path="/perfil" element={<Perfil />} />
      <Route path="/produtos" element={<Produtos />} />
      <Route path="/produtos/:id" element={<ProdutoDetalhe />} />
      <Route path="/carrinho" element={<Carrinho />} />
      <Route path="/meus-pedidos" element={<MeusPedidos />} />
      <Route
        path="/admin/perfil"
        element={
          <DashboardLayout>
            <Perfil />
          </DashboardLayout>
        }
      />
      <Route
        path="/admin"
        element={
          <PrivateRoute allowedRoles={["ADMIN", "DEV"]}>
            <Admin />
          </PrivateRoute>
        }
      />
    </Routes>
  )
}

export function AppRoutesAdmin() {
  return (
    <Routes>
      <Route path="/" element={
        <DashboardLayout>
          <Home />
        </DashboardLayout>
      }/>
      <Route path="/login" element={
        <DashboardLayout>
          <Login />
        </DashboardLayout>
      }/>
      <Route path="/cadastro" element={
        <DashboardLayout>
          <Cadastro />
        </DashboardLayout>
      }/>
      <Route path="/perfil" element={
        <DashboardLayout>
          <Perfil />
        </DashboardLayout>
      }/>
      <Route path="/produtos" element={
        <DashboardLayout>
          <Produtos />
        </DashboardLayout>
      }/>
      <Route path="/produtos/:id" element={
        <DashboardLayout>
          <ProdutoDetalhe />
        </DashboardLayout>
      }/>
      <Route path="/carrinho" element={
        <DashboardLayout>
          <Carrinho />
        </DashboardLayout>
      }/>
      <Route path="/meus-pedidos" element={
        <DashboardLayout>
          <MeusPedidos />
        </DashboardLayout>
      }/>
    </Routes>
  )
}
