import { ItemPedido } from "./ItemPedido";

export interface Pedido {
    id: number;
    criadoEm: string;
    total: number;
    itens: ItemPedido[];
}