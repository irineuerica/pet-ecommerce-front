import { StatusPedidoEnum } from 'src/constants/enums/status-pedido.enum';
import { ItemCarrinhoInterface } from './carrinho.interface';
import { EnderecoInterface } from './endereco.interface';
import { CartaoInterface, PagamentoInterface } from './cartao.interface';
import { ProdutoInterface } from './produtos.interface';
import { CupomInterface } from './cupom.interface';
import { UsuarioInterface } from '@modules/usuarios/interfaces/usuario.interface';

export interface PedidoInterface {
  id?: number;
  usuario_id: number;
  data: string;
  valor: number;
  status_pedido_id: number;
  frete_id: number;
  enderecos_id: number;
  cupom_codigo?: number;
}
export interface CreatePedido {
  items: ItemCarrinhoInterface[];
  data: Date;
  valor: number;
  subtotal: number;
  status: StatusPedidoEnum;
  frete: number;
  endereco: EnderecoInterface;
  pagamento: PagamentoInterface;
}

export interface Status {
  id: number;
  nome: string;
}

export interface ItemPedido {
  id: number;
  produto: ProdutoInterface;
  status: Status;
}
export interface ListPedidoInterface {
  id: number;
  data: string;
  valor: number;
  frete: number;
  status: Status;
  endereco: EnderecoInterface;
  cupons: CupomInterface[];
  itensPedido: ItemPedido[];
  cartoes: CartaoInterface[];
  usuario: UsuarioInterface;
}
