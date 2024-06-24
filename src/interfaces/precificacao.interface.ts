import { ProdutoInterface } from "./produtos.interface"

export interface PrecificacaoInterface {
    id: number
    nome: string
    porcentagem: number
    criado_em: Date
    atualizado_em: Date
    produtos: ProdutoInterface[];
}