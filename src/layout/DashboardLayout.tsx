import { ReactNode } from "react";
import { useUsuarioLogado } from "../hooks/useUsuarioLogado";
import { Spinner } from "../components/Spinner";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import SidebarAdmin from "../components/SidebarAdmin";

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { usuario, carregando } = useUsuarioLogado();
  const location = useLocation();

  if (carregando) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <Spinner />
      </div>
    );
  }

  console.log(usuario)
  const permitido = usuario?.perfis?.includes("ADMIN") || usuario?.perfis?.includes("DEV");

  if (!permitido) {
    return <p className="text-center mt-20 text-red-600">Acesso restrito.</p>;
  }

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <SidebarAdmin />

      {/* Conteúdo com animação */}
      <motion.main
        key={location.pathname}
        className="flex-1"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.main>
    </div>
  );
}
