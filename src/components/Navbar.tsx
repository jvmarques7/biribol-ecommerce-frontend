import { Link } from "react-router-dom";
import { useCart } from "../store/useCart";
import { useUsuarioLogado } from "../hooks/useUsuarioLogado";
import { useState, useRef, useEffect } from "react";
import { FiUser } from "react-icons/fi";

export default function Navbar() {
  const { cart } = useCart();
  const { usuario, logout } = useUsuarioLogado();
  const [menuAberto, setMenuAberto] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const toggleMenu = () => setMenuAberto((prev) => !prev);

  useEffect(() => {
    const handleClickFora = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuAberto(false);
      }
    };
    document.addEventListener("mousedown", handleClickFora);
    return () => document.removeEventListener("mousedown", handleClickFora);
  }, []);

  return (
    <nav className="bg-blue-600 text-white px-4 py-3 flex justify-between items-center relative">
      <div></div> {/* ignorado conforme sua instrução */}

      <div className="flex items-center space-x-4">
        {/* Carrinho */}
        <Link to="/carrinho" className="relative hover:underline">
          Carrinho
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs px-2 py-0.5 rounded-full">
              {cart.length}
            </span>
          )}
        </Link>

        {/* Usuário logado */}
        {usuario ? (
          <div className="relative" ref={menuRef}>
            <button
              onClick={toggleMenu}
              className="flex items-center gap-2 bg-white text-blue-600 px-3 py-1 rounded-full hover:bg-gray-100 transition"
            >
              <FiUser size={18} />
              <span className="hidden sm:block">{usuario.nome || "Usuário"}</span>
            </button>

            {menuAberto && (
              <div className="absolute right-0 mt-2 w-44 bg-white text-gray-800 rounded-xl shadow-lg py-2 z-50">
                <Link
                  to="/perfil"
                  className="block px-4 py-2 hover:bg-gray-100 transition"
                  onClick={() => setMenuAberto(false)}
                >
                  Perfil
                </Link>
                <Link
                  to="/compras"
                  className="block px-4 py-2 hover:bg-gray-100 transition"
                  onClick={() => setMenuAberto(false)}
                >
                  Minhas Compras
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setMenuAberto(false);
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 transition text-red-600"
                >
                  Sair
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link
              to="/login"
              className="bg-white text-blue-600 px-3 py-1 rounded hover:bg-gray-100 transition"
            >
              Login
            </Link>
            <Link
              to="/cadastro"
              className="bg-white text-blue-600 px-3 py-1 rounded hover:bg-gray-100 transition"
            >
              Cadastro
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
