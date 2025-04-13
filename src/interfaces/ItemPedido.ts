import { Produto } from "./Produto";

export interface ItemPedido {
  id: number;
  quantidade: number;
  preco: number;
  produto: Produto;
}
