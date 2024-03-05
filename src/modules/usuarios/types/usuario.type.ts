import { CartaoInterface } from 'src/types/cartao.types';
import { EnderecoInterface } from 'src/types/endereco.types';

export type UsuarioInterface = {
  id?: number;
  nome: string;
  genero: string;
  dataNascimento: Date;
  cpf: string;
  dddTelefone: string;
  telefone: string;
  email: string;
  senha: string;
  enderecos: EnderecoInterface[];
  formasPagamento: CartaoInterface[];
};
