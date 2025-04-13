import { useState } from "react"
import { Link } from "react-router-dom"

interface Produto {
  id: number
  nome: string
  descricao: string
  preco: number
  imagem: string
}

const produtosMock: Produto[] = [
  {
    id: 1,
    nome: "Bola Oficial de Biribol",
    descricao: "Bola profissional homologada pela liga oficial.",
    preco: 120,
    imagem: "https://via.placeholder.com/400x300.png?text=Bola+de+Biribol",
  },
  {
    id: 2,
    nome: "Rede Profissional",
    descricao: "Rede de nylon com medidas oficiais para piscina.",
    preco: 350,
    imagem: "https://via.placeholder.com/400x300.png?text=Rede+de+Biribol",
  },
]

export default function Produtos() {
  const [produtos] = useState<Produto[]>(produtosMock)

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold mb-10 text-center text-blue-700">Produtos</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {produtos.map((produto) => (
          <div
            key={produto.id}
            className="bg-white rounded-2xl shadow-md hover:shadow-lg transition duration-300 overflow-hidden flex flex-col"
          >
            <img
              src={produto.imagem}
              alt={produto.nome}
              className="w-full h-48 object-cover"
            />
            <div className="p-5 flex flex-col justify-between flex-1">
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {produto.nome}
                </h2>
                <p className="text-gray-600 text-sm mb-3">{produto.descricao}</p>
              </div>
              <div>
                <p className="text-lg font-bold text-blue-600 mb-3">
                  R$ {produto.preco.toFixed(2)}
                </p>
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition">
                  Adicionar ao carrinho
                </button>
                <Link to={`/produtos/${produto.id}`} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition block text-center mt-3">
                  Ver detalhes
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
