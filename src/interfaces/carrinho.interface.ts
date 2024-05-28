import { ProdutoInterface } from './produtos.interface';

export interface ItemCarrinhoInterface {
  produto: ProdutoInterface;
  quantidade: number;
  tempoCarrinho: number;
  status?: number;
}

export interface CarrinhoInterface {
  itens: ItemCarrinhoInterface[];
}
