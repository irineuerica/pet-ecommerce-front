import { CartaoInterface } from 'src/interfaces/cartao.interface';
import { EnderecoInterface } from 'src/interfaces/endereco.interface';

export interface UsuarioInterface {
  id?: number;
  nome: string;
  genero: string;
  dataNascimento: Date;
  cpf: string;
  ddd: string;
  telefone: string;
  email: string;
  senha: string;
  isAdmin: boolean;
  status: boolean;
  // enderecos: EnderecoInterface[];
  // formasPagamento: CartaoInterface[];
}
