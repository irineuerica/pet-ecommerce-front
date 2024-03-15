export interface ProdutosInterface {
    id?: number,
    nome: string,
    descricao: string,
    valor: number,
    categoria_id: number,
    criado_em?: Date
    atualizado_em?: Date
}