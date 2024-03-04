import { StatusEnum } from "src/constants/enums/status.enum";

export interface EnderecoInterface {
    id?: number;
    tpResidencia: '',
    tpLogradouro: '',
    logradouro: string;
    numero: string;
    nome: string;
    bairro: string;
    cep: number;
    cidade: number;
    estado: number;
    observacao: string;
    cobranca: boolean,
    entrega: boolean,
    status: StatusEnum
}