import { CategoriaInterface } from "./categoria.interface"
import { EstoqueInterface } from "./estoque.interface";

export interface ProdutoInterface {
    id?: number,
    nome: string,
    descricao: string,
    valor: number,
    categoria: CategoriaInterface,
    imagem?: string,
    estoque: EstoqueInterface;
}