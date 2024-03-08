import { CartaoInterface } from 'src/interfaces/cartao.interface';
import { EnderecoInterface } from 'src/interfaces/endereco.interface';

export type UsuarioInterface = {
  id?: number;
  nome: string;
  genero: string;
  dataNascimento: Date;
  cpf: string;
  ddd: string;
  telefone: string;
  email: string;
  senha: string;
  // enderecos: EnderecoInterface[];
  // formasPagamento: CartaoInterface[];
};
