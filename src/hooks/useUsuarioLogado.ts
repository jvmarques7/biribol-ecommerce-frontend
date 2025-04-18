// src/hooks/useUsuarioLogado.ts
import { useEffect, useState } from "react";
import api from "../services/api";

export type Usuario = {
  id: string;
  nome: string;
  email: string;
  perfis: string[];
};

export function useUsuarioLogado() {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setCarregando(false);
      return;
    }

    api
      .get("http://localhost:3000/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUsuario(res.data))
      .catch(() => {
        localStorage.removeItem("token");
        setUsuario(null);
      })
      .finally(() => setCarregando(false));
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setUsuario(null);
    window.location.href = "/login";
  };

  return { usuario, carregando, logout };
}
