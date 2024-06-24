import { PrecificacaoInterface } from "./precificacao.interface";
import { ProdutoInterface } from "./produtos.interface";

export interface EstoqueInterface {
  id: number;
  quantidadeAtual: number;
  quantidadeVendida: number;
  fornecedor: string;
  dataEntrada?: Date;
  dataSaida?: Date;
  produto: ProdutoInterface;
}


export interface EstoqueFormInterface {
  id: number;
  quantidade: number;
  data: Date;
  fornecedor: string;
  produto: number;
  precificacao: number;
  custo: number;
  operacao?: 'ENTRADA' | 'SAIDA'
}
