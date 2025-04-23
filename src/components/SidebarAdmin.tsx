import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { LayoutDashboard, Menu, X } from "lucide-react";
import { useUsuarioLogado } from "../hooks/useUsuarioLogado";
import { FiLogOut } from "react-icons/fi";
import { Tooltip } from "../ui/Tooltip";

export default function SidebarAdmin() {
  const [aberta, setAberta] = useState(false);
  const { logout } = useUsuarioLogado();

  return (
    <>
      {/* Botão toggle (mobile) */}
      <div className="fixed bottom-5 left-5 z-50 transition">
        <button
          onClick={() => setAberta(true)}
          className="md:hidden bg-blue-600 hover:bg-blue-700 text-white rounded-full p-3 shadow-md"
          aria-label="Abrir menu"
        >
          <Menu size={28} />
        </button>
      </div>

      {/* Sidebar fixa (desktop) */}
      <aside className="hidden md:block w-64 bg-blue-700 text-white min-h-screen p-6 space-y-4">
        <h2 className="text-xl font-bold mb-6">Painel Admin</h2>
        <NavLinks onClickLink={() => {}} onLogout={logout} />
      </aside>

      {/* Sidebar flutuante (mobile) */}
      {aberta && (
        <div className="fixed inset-0 bg-black/50 z-50 flex">
          <aside className="w-64 bg-blue-700 text-white p-6 space-y-4 h-full shadow-lg z-50">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Menu</h2>
              <button onClick={() => setAberta(false)} aria-label="Fechar menu">
                <X size={24} />
              </button>
            </div>
            <NavLinks
              onClickLink={() => setAberta(false)}
              onLogout={() => {
                logout();
                setAberta(false);
              }}
            />
          </aside>

          {/* Clique fora fecha o menu */}
          <div className="flex-1" onClick={() => setAberta(false)} />
        </div>
      )}
    </>
  );
}

function NavLinks({
  onClickLink,
  onLogout,
}: {
  onClickLink?: () => void;
  onLogout: () => void;
}) {
  const { pathname } = useLocation();

  const links = [
    { to: "/dashboard", label: "Dashboard" },
    { to: "/perfil", label: "Perfil" },
  ];

  return (
    <ul className="space-y-2">
      {links.map((link) => (
        <li key={link.to}>
          <Link
            to={link.to}
            onClick={onClickLink}
            className={`block px-2 py-1 rounded transition ${
              pathname === link.to
                ? "bg-white text-blue-700 font-semibold"
                : "hover:underline"
            }`}
          >
            {link.label}
          </Link>
        </li>
      ))}

      {/* Botão de sair */}
      <li className="">
        <Tooltip content="Sair da conta">
          <button
            onClick={onLogout}
            className="w-full flex text-left justify-between px-2 py-1 text-white hover:bg-red-600 hover:text-white rounded transition"
          >
            <span>Sair</span>
            <FiLogOut className="h-5 w-5" />
          </button>
        </Tooltip>
      </li>
    </ul>
  );
}
