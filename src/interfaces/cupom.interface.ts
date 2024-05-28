import { StatusCupom } from 'src/constants/enums/status-cupom';
import { TiposCupom } from 'src/constants/enums/tipos-cupom';

export interface CupomInterface {
  codigo?: string;
  valor: number;
  tipo: TiposCupom;
  pedido_origem_id?: number;
  cliente_id?: number;
  status?: StatusCupom;
}
