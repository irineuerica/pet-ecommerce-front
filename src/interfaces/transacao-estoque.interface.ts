export interface TransacaoEstoqueInterface {
    id?: number
    quantidadeAtual: number
    quantidadeVendida: number
    motivo: string
    custo: number
    dataEntrada?: Date
    produto_id: number
    criado_em?: Date
    atualizado_em?: Date
    dataSaida?: Date
}