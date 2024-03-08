export interface EnderecoInterface {
  id?: number;
  tpResidencia: string;
  tpLogradouro: string;
  logradouro: string;
  numero: string;
  nome: string;
  bairro: string;
  cep: string;
  cidade: string;
  estado: string;
  observacao: string;
  cobranca: boolean;
  entrega: boolean;
}
