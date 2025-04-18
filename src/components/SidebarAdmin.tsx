import { Link } from "react-router-dom";

export default function SidebarAdmin() {
  return (
    <aside className="w-64 bg-blue-700 text-white min-h-screen p-6 space-y-4 hidden md:block">
      <h2 className="text-xl font-bold mb-6">Painel Admin</h2>
      <ul className="space-y-2">
        <li><Link to="/perfil" className="hover:underline">Perfil</Link></li>
        {/*<li><Link to="/admin/produtos" className="hover:underline">Produtos</Link></li>
        <li><Link to="/admin/usuarios" className="hover:underline">Usuários</Link></li>
        <li><Link to="/admin/pedidos" className="hover:underline">Pedidos</Link></li>*/}
      </ul>
    </aside>
  );
}

