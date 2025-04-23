import api from "../services/api";
import { useEffect, useState } from "react";
import { useMaskedInput } from "../hooks/useMaskInput";
import { maskCPF } from "../utils/masks";
import { toast } from 'sonner';
import { Modal } from "../components/Modal";
import { EnderecoCard } from "../components/EnderecoCard";
import { EnderecoForm } from "../components/EnderecoForm";
import { Tabs } from "../ui/Tabs";

export default function Perfil() {
  const [abaAtiva, setAbaAtiva] = useState<"dados" | "contato" | "enderecos">("dados");
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");
  const [usuario, setUsuario] = useState<any>(null);

  const cpfInput = useMaskedInput("", maskCPF);

  //Dados Pessoais
  const [nome, setNome] = useState("");

  //Contato
  const [email, setEmail] = useState("");

  //Endereço
  const [enderecoEditando, setEnderecoEditando] = useState<any | null>(null);
  const [modalEnderecoAberto, setModalEnderecoAberto] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    api
      .get("http://localhost:3000/usuario", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setUsuario(res.data);
        setEmail(res.data.email);
        if (res.data.pessoa?.cpf) {
          setNome(res.data.pessoa.nome);
          cpfInput.setValueRaw(res.data.pessoa.cpf); // Aplica máscara no valor vindo da API
        }
      })
      .catch(() => {
        toast.error("Erro ao carregar dados do perfil.");
      })
      .finally(() => setLoading(false));
  }, []);

  const handleAtualizarDadosPessoais = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await api.put("http://localhost:3000/usuario", { nome }, {
        headers: { Authorization: `Bearer ${token}` },
      }).then((res)=>{
        toast.success(res.data.mensagem)
      });
    } catch (err: any){
      // O toast de erro já é tratado globalmente no axios
    }
  };

  const handleAtualizarEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro("");

    try {
      const token = localStorage.getItem("token");
      await api.put("http://localhost:3000/usuario/email", { email }, {
        headers: { Authorization: `Bearer ${token}` },
      }).then((res)=>{
        toast.success(res.data.mensagem)
      })
    } catch (err: any){
      // O toast de erro já é tratado globalmente no axios
    }
  };

  const handleAtualizarUsuario = async () =>{
    try {
      const token = localStorage.getItem("token");
      await api.get("http://localhost:3000/usuario", {
        headers: { Authorization: `Bearer ${token}` },
      }).then((res)=>{
        setUsuario(res.data)
      })
    } catch (err: any){
      // O toast de erro já é tratado globalmente no axios
    }
  }

  if (loading) return <p className="text-center mt-10">Carregando...</p>;

  return (
    <div className="mx-auto pb-15 space-y-8 px-4">
      {/* Modal */}
      <Modal
        aberto={modalEnderecoAberto}
        titulo="Editar Endereço"
      >
        <EnderecoForm
          defaultValues={enderecoEditando}
          onSuccess={() => {
            setModalEnderecoAberto(false);
            handleAtualizarUsuario();
          }}
        />
      </Modal>
      <div className="max-w-2xl mx-auto mt-10 space-y-8 px-4">
        <h1 className="text-2xl font-bold text-slate-600">Meu Perfil</h1>

        {erro && <p className="text-red-500">{erro}</p>}

        <Tabs defaultKey="dados"
          tabs={[
            {
              key: "dados",
              label: "Dados Pessoais",
              content: (
                <form onSubmit={handleAtualizarDadosPessoais} className="space-y-4 bg-white p-6 rounded-xl shadow-xl">
                  <h2 className="text-xl font-semibold">Dados Pessoais</h2>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Nome Completo</label>
                    <input
                      type="text"
                      value={nome}
                      onChange={(e) => setNome(e.target.value)}
                      className="w-full border border-gray-300 rounded-xl px-4 py-2"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">CPF</label>
                    <input
                      type="text"
                      value={cpfInput.value}
                      onChange={cpfInput.onChange}
                      disabled
                      className="w-full bg-gray-100 border border-gray-300 rounded-xl px-4 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Data de Nascimento</label>
                    <input
                      type="date"
                      value={usuario?.pessoaFisica?.dataNascimento?.slice(0, 10) || ""}
                      disabled
                      className="w-full bg-gray-100 border border-gray-300 rounded-xl px-4 py-2"
                    />
                  </div>
                  <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-xl">
                    Atualizar Dados
                  </button>
                </form>
              ),
            },
            {
              key: "contato",
              label: "Contato",
              content: (
                <form onSubmit={handleAtualizarEmail} className="space-y-4 bg-white p-6 rounded-xl shadow-xl">
                  <h2 className="text-xl font-semibold">Contato</h2>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">E-mail</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full border border-gray-300 rounded-xl px-4 py-2"
                      required
                    />
                  </div>
                  <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded-xl">
                    Atualizar E-mail
                  </button>
                </form>
              ),
            },
            {
              key: "enderecos",
              label: "Endereços",
              content: (
                <div className="space-y-4 bg-white p-6 rounded-xl shadow-xl">
                  <h2 className="text-xl font-semibold">Endereços</h2>
                  <button
                    className="bg-blue-600 text-white px-4 py-2 rounded-xl"
                    onClick={() => {
                      setModalEnderecoAberto(true);
                      setEnderecoEditando(null);
                    }}
                  >
                    + Adicionar novo endereço
                  </button>
                  {usuario?.pessoaFisica?.enderecos?.length > 0 ? (
                    usuario.pessoaFisica.enderecos.map((endereco: any) => (
                      <EnderecoCard
                        key={endereco.id}
                        endereco={endereco}
                        onEditar={() => {
                          setEnderecoEditando(endereco);
                          setModalEnderecoAberto(true);
                        }}
                        onExcluir={async () => {
                          const token = localStorage.getItem("token");
                          await api.delete(`/enderecos/${endereco.id}`, {
                            headers: { Authorization: `Bearer ${token}` },
                          });
                          toast.success("Endereço removido com sucesso!");
                          handleAtualizarUsuario();
                        }}
                        onDefinirPrincipal={async () => {
                          const token = localStorage.getItem("token");
                          await api.patch(`/enderecos/${endereco.id}/padrao`, {
                            headers: { Authorization: `Bearer ${token}` },
                          });
                          toast.success("Endereço definido como principal!");
                          handleAtualizarUsuario();
                        }}
                      />
                    ))
                  ) : (
                    <p className="text-gray-500 text-sm">Nenhum endereço cadastrado ainda.</p>
                  )}
                </div>
              ),
            },
          ]}
        />
      </div>
    </div>
    
  );
}
