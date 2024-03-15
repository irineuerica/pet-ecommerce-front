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