import { CategoriaInterface } from './categoria.interface';
import { EstoqueInterface } from './estoque.interface';
import { PrecificacaoInterface } from './precificacao.interface';

export interface ProdutoInterface {
  id?: number;
  nome: string;
  descricao: string;
  valor: number;
  categoria: CategoriaInterface;
  imagem?: string;
  estoque: EstoqueInterface;
  precificacao: PrecificacaoInterface;
  motivoAtivacao: string;
  motivoInativacao: string;
  status: boolean;
}
