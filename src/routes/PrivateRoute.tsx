import { Navigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { JSX } from "react"

interface PrivateRouteProps {
  children: JSX.Element
  allowedRoles: string[]
}

export default function PrivateRoute({
  children,
  allowedRoles,
}: PrivateRouteProps) {
  const { user } = useAuth()

  if (!user) return <Navigate to="/login" />
  if (!allowedRoles.includes(user.role)) return <Navigate to="/" />

  return children
}
