import { api } from "src/config/api.config";
import { UsuarioInterface } from "../interfaces/usuario.type";

export class UsuarioService {
  static instance: UsuarioService;

  private constructor() {}

  static getInstance() {
    if (!this.instance) {
      this.instance = new UsuarioService();
    }

    return this.instance;
  }

  async handleSalvarUsuario({usuario, id} : {usuario: UsuarioInterface, id: number}) {
    try {
      const { data } = await api.put(`/user/${id}`, {usuario});

      return data;
    } catch (err) {
      throw err;
    }
  }

}
