// src/hooks/useUsuarioLogado.ts
import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export type Usuario = {
  id: string;
  nome: string;
  email: string;
  perfis: string[];
};

export function useUsuarioLogado() {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [carregando, setCarregando] = useState(true);
  const paths = "/";
  const reload = paths.length == 1;
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setCarregando(false);
      return;
    }

    api
      .get("http://localhost:3000/usuario", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setUsuario(res.data)
        if(reload){
          
        }
      })
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
