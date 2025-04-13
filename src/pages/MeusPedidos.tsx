import { useEffect, useState } from "react"
import axios from "axios"
import { Pedido } from "../interfaces";

export default function MeusPedidos() {
  const [pedidos, setPedidos] = useState([])

  useEffect(() => {
    const token = localStorage.getItem("token")

    axios
      .get("http://localhost:3000/pedidos/meus", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setPedidos(res.data))
      .catch((err) => console.error(err))
  }, [])

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Meus Pedidos</h1>

      {pedidos.map((pedido: Pedido) => (
        <div
          key={pedido.id}
          className="bg-white shadow p-4 mb-4 rounded-lg border"
        >
          <p className="text-sm text-gray-500 mb-2">
            Realizado em: {new Date(pedido.criadoEm).toLocaleString()}
          </p>
          <ul className="text-sm">
            {pedido.itens.map((item) => (
              <li key={item.id}>
                {item.quantidade}x {item.produto.nome} — R${" "}
                {(item.preco * item.quantidade).toFixed(2)}
              </li>
            ))}
          </ul>
          <p className="text-right font-bold mt-2">
            Total: R$ {pedido.total.toFixed(2)}
          </p>
        </div>
      ))}
    </div>
  )
}
