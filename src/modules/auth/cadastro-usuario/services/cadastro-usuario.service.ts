import { api } from "src/config/api.config";
import { CadastroUsuarioInterface } from "../types/cadastro-usuario-types";

export class CadastroUsuarioService {
  static instance: CadastroUsuarioService;

  private constructor() {}

  static getInstance() {
    if (!this.instance) {
      this.instance = new CadastroUsuarioService();
    }

    return this.instance;
  }

  async handleCadastrarUsuario(usuario: CadastroUsuarioInterface) {
    try {
      const { data } = await api.post(`/cadastro`, {usuario});

      return data;
    } catch (err) {
      throw err;
    }
  }

}
