import { useState, useRef, useEffect } from "react";
import { Home } from "lucide-react";

interface EnderecoProps {
  endereco: {
    id: string;
    cep: string;
    rua: string;
    numero: string;
    complemento?: string;
    bairro: string;
    cidade: string;
    estado: string;
    padrao: boolean;
    rotulo?: string;
    telefone?: string;
    nomeContato?: string;
  };
  onEditar?: () => void;
  onExcluir?: () => void;
  onDefinirPrincipal?: () => void;
}

export function EnderecoCard({ endereco, onEditar, onExcluir, onDefinirPrincipal }: EnderecoProps) {
  const [menuAberto, setMenuAberto] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Fecha o menu ao clicar fora
  useEffect(() => {
    function handleClickFora(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuAberto(false);
      }
    }
    document.addEventListener("mousedown", handleClickFora);
    return () => document.removeEventListener("mousedown", handleClickFora);
  }, []);

  return (
    <div className="flex items-start gap-4 relative bg-white p-4 rounded-xl shadow-lg">
      <Home className="text-gray-600 mt-1" />
      <div className="flex-1">
        <p className="font-medium">
          {endereco.rua}, {endereco.numero}
          {endereco.complemento ? ` - ${endereco.complemento}` : ""}
        </p>
        <p className="text-sm text-gray-500">
          CEP {endereco.cep} – {endereco.estado} - {endereco.cidade}
        </p>
        {endereco.nomeContato && (
          <p className="text-sm text-gray-500">
            {endereco.nomeContato} – {endereco.telefone}
          </p>
        )}
        {endereco.padrao && (
          <div className="flex flex-wrap gap-2 mt-2">
            <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
              Endereço padrão
            </span>
          </div>
        )}
      </div>

      {/* Botão de menu */}
      <div ref={menuRef} className="relative">
        <button
          className="text-gray-400 hover:text-gray-600 text-xl px-2"
          onClick={() => setMenuAberto((prev) => !prev)}
        >
          ⋮
        </button>

        {menuAberto && (
          <div className="absolute right-0 mt-2 w-36 bg-white border border-gray-200 shadow-md rounded-md z-50 text-sm">
            <button
              onClick={() => {
                setMenuAberto(false);
                onEditar?.();
              }}
              className="w-full text-left px-4 py-2 hover:bg-gray-100"
            >
              ✏️ Editar
            </button>
            <button
              onClick={() => {
                setMenuAberto(false);
                if (confirm("Deseja realmente excluir este endereço?")) {
                  onExcluir?.();
                }
              }}
              className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
            >
              🗑️ Excluir
            </button>
            {!endereco.padrao && (
              <button
                onClick={() => {
                  setMenuAberto(false);
                  onDefinirPrincipal?.();
                }}
                className="w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                ⭐ Definir como principal
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
