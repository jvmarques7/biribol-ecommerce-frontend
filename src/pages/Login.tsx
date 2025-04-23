import { useEffect, useState } from "react"
import { Link, Navigate, useNavigate } from "react-router-dom"
import api from "../services/api"

const Login = () => {
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [erro, setErro] = useState("")
  const [usuario, setUsuario] = useState("")
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if(token){
      navigate("/")
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro("");

    try {
      api.post("http://localhost:3000/auth/login", {
        email,
        senha,
      }).then((response)=>{
        localStorage.setItem("token", response.data.token);
        setUsuario(response.data.usuario)
        navigate("/"); // redireciona para página inicial
      });

    } catch (err) {
      setErro("E-mail ou senha inválidos.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-gray-600 text-sm mb-1">E-mail</label>
            <input
              type="email"
              className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-gray-600 text-sm mb-1">Senha</label>
            <input
              type="password"
              className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </div>
          {erro && <p className="text-red-500 text-sm">{erro}</p>}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl transition"
          >
            Entrar
          </button>
          <p className="text-sm text-center text-gray-600 mt-4">
            É novo por aqui?{" "}
            <a href="/cadastro" className="text-blue-600 hover:underline">
              Cadastre-se
            </a>
          </p>
          <p className="text-sm text-center text-gray-600 mt-4">
            <a href="/" className="text-blue-600 hover:underline">
              Voltar para tela inicial
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
