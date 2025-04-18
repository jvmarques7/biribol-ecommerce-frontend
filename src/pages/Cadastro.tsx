import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Cadastro = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [cpf, setCpf] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [erro, setErro] = useState("");

  const navigate = useNavigate();

  const validarCPF = (cpf: string) => {
    cpf = cpf.replace(/[^\d]+/g, "");
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

    let soma = 0;
    for (let i = 0; i < 9; i++) soma += +cpf[i] * (10 - i);
    let dig1 = (soma * 10) % 11;
    if (dig1 === 10 || dig1 === 11) dig1 = 0;
    if (dig1 !== +cpf[9]) return false;

    soma = 0;
    for (let i = 0; i < 10; i++) soma += +cpf[i] * (11 - i);
    let dig2 = (soma * 10) % 11;
    if (dig2 === 10 || dig2 === 11) dig2 = 0;
    return dig2 === +cpf[10];
  };

  const handleCadastro = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro("");

    if (!validarCPF(cpf)) {
      setErro("CPF inválido.");
      return;
    }

    try {
      await axios.post("http://localhost:3000/auth/cadastro", {
        nome,
        email,
        senha,
        cpf,
        dataNascimento,
        perfis: ["CLIENTE"]
      });

      navigate("/login");
    } catch (err) {
      setErro("Erro ao cadastrar. Tente novamente.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Criar conta</h2>
        <form onSubmit={handleCadastro} className="space-y-4">
          <div>
            <label className="block text-gray-600 text-sm mb-1">Nome completo</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
          </div>
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
          <div>
            <label className="block text-gray-600 text-sm mb-1">CPF</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
              placeholder="Apenas números"
              required
            />
          </div>
          <div>
            <label className="block text-gray-600 text-sm mb-1">Data de Nascimento</label>
            <input
              type="date"
              className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={dataNascimento}
              onChange={(e) => setDataNascimento(e.target.value)}
              required
            />
          </div>
          {erro && <p className="text-red-500 text-sm">{erro}</p>}
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-xl transition"
          >
            Cadastrar
          </button>
        </form>
        <p className="text-sm text-center text-gray-600 mt-4">
          Já tem uma conta?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Entrar
          </a>
        </p>
        <p className="text-sm text-center text-gray-600 mt-4">
          <a href="/" className="text-blue-600 hover:underline">
            Voltar para tela inicial
          </a>
        </p>
      </div>
    </div>
  );
};

export default Cadastro;
