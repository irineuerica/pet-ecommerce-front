import { UsuarioService } from '@modules/usuarios/services/usuario.service';

export type CartaoInterface = {
  id?: number;
  numero: string;
  nome: string;
  bandeira: string;
  vencimentoMes: number;
  vencimentoAno: number;
  cvv?: string;
  principal: boolean;
  usuario: UsuarioService;
};
