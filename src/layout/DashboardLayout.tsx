import { ReactNode } from "react";
import { useUsuarioLogado } from "../hooks/useUsuarioLogado";
import { Spinner } from "../components/Spinner";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import SidebarAdmin from "../components/SidebarAdmin";
import { Breadcrumb } from "../components/Breadcrumb";

interface DashboardLayoutProps {
  children: ReactNode
  restritoPara?: ("ADMIN" | "DEV" | "CLIENTE")[] // opcional
}

export function DashboardLayout({ children, restritoPara }: DashboardLayoutProps) {
  const location = useLocation();
  const hideNavbarRoutes = ["/login", "/cadastro", "/recuperar-senha"];
  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  const { usuario, carregando } = useUsuarioLogado(); // hook com loading e user
  // ⏳ Mostra loading enquanto carrega usuário
  if (carregando) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <Spinner /> {/* ou "Carregando..." */}
      </div>
    );
  }

  // 🔒 Verifica acesso por perfil (se configurado)
  if (restritoPara && usuario) {
    const perfisPermitidos = ["ADMIN", "DEV", "CLIENTE"] as const;
    type Perfil = typeof perfisPermitidos[number];

    function isPerfilValido(p: string): p is Perfil {
        return perfisPermitidos.includes(p as Perfil);
    }

    const temPermissao = usuario.perfis?.some(
        (perfil) => isPerfilValido(perfil) && restritoPara.includes(perfil)
    );
    if (!temPermissao) return null;
  }

  console.log(usuario)
  const permitido = usuario?.perfis?.includes("ADMIN") || usuario?.perfis?.includes("DEV");

  if (!permitido) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100">
      {/* SidebarAdmin */}
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
