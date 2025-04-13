import { createContext, useContext, useState, ReactNode } from "react"
import api from "../services/api"

type Role = "cliente" | "admin" | "dev"

interface AuthContextProps {
  user: { name: string; role: Role } | null
  login: (role: Role) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps)

const login = async (email: string, senha: string) => {
  const res = await api.post("/auth/login", { email, senha })
  const { token, usuario } = res.data

  localStorage.setItem("token", token)
  setUser(usuario)
}


export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<{ name: string; role: Role } | null>(null)

  const login = (role: Role) => setUser({ name: "Usuário", role })
  const logout = () => setUser(null)

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
