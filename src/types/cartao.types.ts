import { StatusEnum } from 'src/constants/enums/status.enum';

export type CartaoInterface = {
  numero: number;
  nome: string;
  bandeira: string;
  cvv?: string;
  principal: boolean;
  status: StatusEnum;
  cliente_id?: number;
};
