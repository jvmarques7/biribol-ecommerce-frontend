import { create } from "zustand"

interface Produto {
  id: string
  nome: string
  preco: number
  imagem: string
}

interface CartItem extends Produto {
  quantidade: number
}

interface CartState {
  cart: CartItem[]
  addToCart: (produto: Produto) => void
  removeFromCart: (id: string) => void
  clearCart: () => void
}

export const useCart = create<CartState>((set) => ({
  cart: [],
  addToCart: (produto) =>
    set((state) => {
      const itemExiste = state.cart.find((item) => item.id === produto.id)
      if (itemExiste) {
        return {
          cart: state.cart.map((item) =>
            item.id === produto.id
              ? { ...item, quantidade: item.quantidade + 1 }
              : item
          ),
        }
      }
      return {
        cart: [...state.cart, { ...produto, quantidade: 1 }],
      }
    }),
  removeFromCart: (id) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== id),
    })),
  clearCart: () => set({ cart: [] }),
}))
