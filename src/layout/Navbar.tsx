import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { useCart } from "../store/useCart"

export default function Navbar() {
  const { user, login, logout } = useAuth()
  const { cart } = useCart()

  return (
    <nav className="flex justify-between items-center bg-blue-600 p-4 text-white">
      <div className="space-x-4">
        <Link to="/">Home</Link>
        <Link to="/produtos">Produtos</Link>
        <Link to="/admin">Admin</Link>
      </div>
      <div className="space-x-2">
        {user ? (
          <>
            <span>{user.name} ({user.role})</span>
            <button onClick={logout} className="bg-red-500 px-3 py-1 rounded">Logout</button>
          </>
        ) : (
          <>
            <Link to="/carrinho">Carrinho ({cart.length})</Link>
            <button onClick={() => login("cliente")} className="bg-green-500 px-3 py-1 rounded">Login Cliente</button>
            <button onClick={() => login("admin")} className="bg-yellow-500 px-3 py-1 rounded">Login Admin</button>
          </>
        )}
      </div>
    </nav>
  )
}
