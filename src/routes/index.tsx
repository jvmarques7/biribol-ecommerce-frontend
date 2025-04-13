import { Routes, Route } from "react-router-dom"
import Home from "../pages/Home"
import Login from "../pages/Login"
import Admin from "../pages/Admin"
import Produtos from "../pages/Produtos"
import PrivateRoute from "./PrivateRoute"
import ProdutoDetalhe from "../pages/ProdutoDetalhe"
import Carrinho from "../pages/Carrinho"
import MeusPedidos from "../pages/MeusPedidos"

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/produtos" element={<Produtos />} />
      <Route path="/produtos/:id" element={<ProdutoDetalhe />} />
      <Route path="/carrinho" element={<Carrinho />} />
      <Route path="/meus-pedidos" element={<MeusPedidos />} />
      <Route
        path="/admin"
        element={
          <PrivateRoute allowedRoles={["admin", "dev"]}>
            <Admin />
          </PrivateRoute>
        }
      />
    </Routes>
  )
}
