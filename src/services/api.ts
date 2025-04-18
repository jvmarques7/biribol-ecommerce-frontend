import axios from "axios"
import { toast } from "sonner"

const api = axios.create({
  baseURL: "http://localhost:3000", // Altere se usar outro host/porta
})

// Interceptador: adiciona o token automaticamente
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token")
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const erroMensagem =
      error.response?.data?.erro || "Erro inesperado. Tente novamente."
    toast.error(erroMensagem)

    return Promise.reject(error) // ainda permite que você trate manualmente se quiser
  }
);

export default api
