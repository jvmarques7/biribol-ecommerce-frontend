import { useCart } from "../store/useCart"
import api from "../services/api"

export default function Carrinho() {
  const { cart, removeFromCart, clearCart } = useCart()

  const total = cart.reduce(
    (acc, item) => acc + item.preco * item.quantidade,
    0
  )

  const handleFinalizarPedido = async () => {
    const token = localStorage.getItem("token")
    const itens = cart.map((item) => ({
      produtoId: item.id,
      quantidade: item.quantidade,
    }))
  
    try {
      await api.post("http://localhost:3000/pedidos", { itens }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
  
      clearCart()
      alert("Pedido realizado com sucesso!")
      navigate("/meus-pedidos")
    } catch (error) {
      alert("Erro ao finalizar pedido")
      console.error(error)
    }
  }

  if (cart.length === 0) {
    return (
      <div className="p-10 text-center text-gray-600">
        Seu carrinho está vazio 🛒
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-biribol-azul">Seu Carrinho</h1>

      <ul className="space-y-6">
        {cart.map((item) => (
          <li
            key={item.id}
            className="flex items-center justify-between bg-white p-4 rounded-xl shadow"
          >
            <div className="flex items-center gap-4">
              <img
                src={item.imagem}
                alt={item.nome}
                className="w-20 h-20 object-cover rounded"
              />
              <div>
                <h2 className="font-semibold text-lg">{item.nome}</h2>
                <p className="text-sm text-gray-500">
                  Quantidade: {item.quantidade}
                </p>
                <p className="text-sm text-gray-500">
                  Preço un.: R$ {item.preco.toFixed(2)}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-biribol-amarelo">
                R$ {(item.preco * item.quantidade).toFixed(2)}
              </p>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-600 text-sm hover:underline mt-2"
              >
                Remover
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-10 text-right">
        <div className="text-xl font-bold mb-4">
          Total: <span className="text-biribol-amarelo">R$ {total.toFixed(2)}</span>
        </div>
        <button
          onClick={clearCart}
          className="btn-secondary"
        >
          Limpar carrinho
        </button>
      </div>
    </div>
  )
}
