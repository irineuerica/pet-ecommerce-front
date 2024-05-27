import { StatusPedidoEnum } from "src/constants/enums/status-pedido.enum"
import { ItemCarrinhoInterface } from "./carrinho.interface"
import { EnderecoInterface } from "./endereco.interface"
import { PagamentoInterface } from "./cartao.interface"

export interface PedidoInterface {
    id?: number
    usuario_id: number,
    data: string
    valor: number,
    status_pedido_id: number
    frete_id: number
    enderecos_id: number
    cupom_codigo?: number
}
export interface CreatePedido {
    items: ItemCarrinhoInterface[];
    data: Date;
    valor: number;
    status: StatusPedidoEnum;
    frete: number,
    endereco:  EnderecoInterface,
    pagamento: PagamentoInterface,
}