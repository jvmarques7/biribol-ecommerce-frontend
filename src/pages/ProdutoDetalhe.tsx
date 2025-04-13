import { useParams } from "react-router-dom"
import { useCart } from "../store/useCart"

const produtosMock = [
  {
    id: "1",
    nome: "Bola Oficial de Biribol",
    descricao:
      "Bola de biribol homologada, ideal para jogos profissionais e recreativos.",
    preco: 120,
    imagem: "https://via.placeholder.com/600x400.png?text=Bola+Biribol",
  },
  {
    id: "2",
    nome: "Rede Profissional",
    descricao: "Rede de nylon resistente com medidas oficiais.",
    preco: 350,
    imagem: "https://via.placeholder.com/600x400.png?text=Rede",
  },
]

export default function ProdutoDetalhe() {
  const { id } = useParams()
  const produto = produtosMock.find((p) => p.id === id)
  const { addToCart } = useCart()

  if (!produto) {
    return <p className="p-10 text-center text-red-600">Produto não encontrado.</p>
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <img
          src={produto.imagem}
          alt={produto.nome}
          className="w-full h-auto rounded-xl shadow-lg object-cover"
        />
        <div>
          <h1 className="text-3xl font-bold text-biribol-azul mb-4">
            {produto.nome}
          </h1>
          <p className="text-gray-700 mb-6">{produto.descricao}</p>
          <p className="text-2xl font-bold text-biribol-amarelo mb-6">
            R$ {produto.preco.toFixed(2)}
          </p>
          <button className="btn-primary w-full" onClick={() => addToCart(produto)}>Adicionar ao carrinho</button>
        </div>
      </div>
    </div>
  )
}
