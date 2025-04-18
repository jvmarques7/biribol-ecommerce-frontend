import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Rodape } from "../components/Rodape";
import { ReactNode } from "react";
import { Spinner } from "../components/Spinner";
import { useUsuarioLogado } from "../hooks/useUsuarioLogado";

interface LayoutBaseProps {
    children: ReactNode;
    restritoPara?: ("ADMIN" | "DEV" | "CLIENTE")[]; // opcional
    fallback?: ReactNode; // conteúdo se não tiver acesso
  }

export function LayoutBase({ children, restritoPara, fallback }: LayoutBaseProps) {
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

  return (
    <div className="flex flex-col min-h-screen">
      {!shouldHideNavbar && <Navbar />}
        <main className="flex-1">{children}</main>
      <Rodape />
    </div>
  );
}
