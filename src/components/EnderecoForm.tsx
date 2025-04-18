import { useEffect, useState } from "react";
import { toast } from "sonner";
import { buscarEnderecoPorCep } from "../utils/buscarEnderecoPorCep";
import  api  from "../services/api";

interface EnderecoFormProps {
    onSuccess?: () => void;
    defaultValues?: {
        id?: string;
        nomeDestinatario: string;
        tipoEndereco: string;
        cep: string;
        rua: string;
        numero: string;
        complemento?: string;
        bairro: string;
        cidade: string;
        estado: string;
        info?: string;
    };
}

export function EnderecoForm({ onSuccess, defaultValues }: EnderecoFormProps) {
    const [nomeDestinatario, setNomeDestinatario] = useState(defaultValues?.nomeDestinatario || "");
    const [tipoEndereco, setTipoEndereco] = useState(defaultValues?.tipoEndereco || "Residencial");
    const [cep, setCep] = useState(defaultValues?.cep || "");
    const [rua, setRua] = useState(defaultValues?.rua || "");
    const [numero, setNumero] = useState(defaultValues?.numero || "");
    const [complemento, setComplemento] = useState(defaultValues?.complemento || "");
    const [bairro, setBairro] = useState(defaultValues?.bairro || "");
    const [cidade, setCidade] = useState(defaultValues?.cidade || "");
    const [estado, setEstado] = useState(defaultValues?.estado || "");
    const [info, setInfo] = useState(defaultValues?.info || "");
  const [carregandoCep, setCarregandoCep] = useState(false);
  
  const [loading, setLoading] = useState(true);
  const [usuario, setUsuario] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    api
      .get("http://localhost:3000/usuario", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setUsuario(res.data);
      })
      .catch(() => {
        toast.error("Erro ao carregar dados do usuário.");
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const buscar = async () => {
      const cepLimpo = cep.replace(/\D/g, "");
      if (cepLimpo.length === 8 && cepLimpo != defaultValues?.cep) {
        setCarregandoCep(true)
        const dados = await buscarEnderecoPorCep(cepLimpo)
        setCarregandoCep(false);
        if (dados) {
          setRua(dados.rua)
          setBairro(dados.bairro)
          setCidade(dados.cidade)
          setEstado(dados.estado)
          setNumero("")
        } else {
          toast.error("CEP não encontrado.")
        }
      }
    };
    buscar()
  }, [cep])

  const limpar = () => {
    setNomeDestinatario("");
    setTipoEndereco("Residencial");
    setCep("");
    setRua("");
    setNumero("");
    setComplemento("");
    setBairro("");
    setCidade("");
    setEstado("");
    setInfo("");
    defaultValues = undefined
    
    onSuccess?.();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!nomeDestinatario || !cep || !rua || !numero || !bairro || !cidade || !estado) {
      toast.error("Preencha todos os campos obrigatórios.");
      return;
    }

    const token = localStorage.getItem("token");

    const payload = {
        nomeDestinatario: nomeDestinatario,
        tipoEndereco: tipoEndereco,
        cep,
        rua,
        numero,
        complemento,
        bairro,
        cidade,
        estado,
        info,
        pessoaFisica: usuario.pessoaFisica
      };

      try {
        console.log(defaultValues?.id)
        if (defaultValues?.id) {
          await api.put(`/enderecos/${defaultValues.id}`, payload, {
            headers: { Authorization: `Bearer ${token}` },
          });
          toast.success("Endereço atualizado com sucesso!");
        } else {
          await api.post("/enderecos", payload, {
            headers: { Authorization: `Bearer ${token}` },
          });
          toast.success("Endereço cadastrado com sucesso!");
        }
    
        onSuccess?.();
      } catch {}
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        value={nomeDestinatario}
        onChange={(e) => setNomeDestinatario(e.target.value)}
        placeholder="Nome completo do destinatário"
        className="w-full border p-2 rounded"
        required
      />

      <div className="relative">
        <input
          value={cep}
          onChange={(e) => setCep(e.target.value)}
          placeholder="CEP"
          className="w-full border p-2 rounded pr-10"
        />
        {carregandoCep && (
          <div className="absolute top-1/2 right-3 transform -translate-y-1/2">
            <svg className="animate-spin h-5 w-5 text-blue-500" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              />
            </svg>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <input value={estado} disabled placeholder="Estado" className="border p-2 rounded w-full" />
        <input value={cidade} disabled placeholder="Cidade" className="border p-2 rounded w-full" />
      </div>

      <input
        value={bairro}
        onChange={(e) => setBairro(e.target.value)}
        placeholder="Bairro"
        className="w-full border p-2 rounded"
      />

      <div className="grid grid-cols-2 gap-3">
        <input
          value={rua}
          onChange={(e) => setRua(e.target.value)}
          placeholder="Rua/Avenida"
          className="border p-2 rounded w-full"
        />
        <div className="flex gap-2 items-center">
          <input
            value={numero}
            onChange={(e) => setNumero(e.target.value)}
            placeholder="Número"
            className="border p-2 rounded w-full"
          />
          <label className="text-sm flex items-center gap-1">
            <input
              type="checkbox"
              checked={numero === "SN"}
              onChange={(e) => setNumero(e.target.checked ? "SN" : "")}
            />
            <span>Sem número</span>
          </label>
        </div>
      </div>

      <input
        value={complemento}
        onChange={(e) => setComplemento(e.target.value)}
        placeholder="Complemento (opcional)"
        className="w-full border p-2 rounded"
      />

      <div className="space-y-1">
        <p className="text-sm text-gray-600">Este é o seu trabalho ou sua casa?</p>
        <div className="flex gap-4">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              value="Trabalho"
              checked={tipoEndereco === "Trabalho"}
              onChange={(e) => setTipoEndereco(e.target.value)}
            />
            Trabalho
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              value="Residencial"
              checked={tipoEndereco === "Residencial"}
              onChange={(e) => setTipoEndereco(e.target.value)}
            />
            Residencial
          </label>
        </div>
      </div>

      <div>
        <textarea
          value={info}
          onChange={(e) => setInfo(e.target.value)}
          maxLength={128}
          placeholder="Descrição da fachada, pontos de referência, informações de segurança etc."
          className="w-full border p-2 rounded resize-none"
          rows={3}
        />
        <p className="text-right text-sm text-gray-500">{info.length}/128</p>
      </div>

      <div className="flex justify-end">
        <button type="button" className="bg-gray-600 text-white px-4 py-2 rounded mr-2"
            onClick={limpar}>
          Cancelar
        </button>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Salvar Endereço
        </button>
      </div>
    </form>
  );
}
