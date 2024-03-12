import { api } from 'src/config/api.config';
import { UsuarioInterface } from '../interfaces/usuario.interface';
import { EnderecoInterface } from 'src/interfaces/endereco.interface';

export class UsuarioService {
  static instance: UsuarioService;

  private constructor() {}

  static getInstance() {
    if (!this.instance) {
      this.instance = new UsuarioService();
    }

    return this.instance;
  }

  async handleSalvarUsuario({ usuario, id }: { usuario: UsuarioInterface; id: number }) {
    try {
      const { data } = await api.put(`/user/${id}`, { usuario });

      return data;
    } catch (err) {
      throw err;
    }
  }

  async handleSalvarEndereco({ endereco, id }: { endereco: EnderecoInterface; id?: number }) {
    try {
      if (id) {
        const { data } = await api.put(`/endereco/${id}`, { endereco });
        return data;
      } else {
        const { data } = await api.post(`/endereco`, { endereco });
        return data;
      }
    } catch (err) {
      throw err;
    }
  }

  async listAll() {
    try {
      const { data } = await api.get(`/user/`);

      return data;
    } catch (err) {
      throw err;
    }
  }

  async handleAlterarStatus({ status, id }: { status: boolean; id: number }) {
    try {
      const { data } = await api.put(`/user/status/${id}`, { status });

      return data;
    } catch (err) {
      throw err;
    }
  }

  async handleSetAdmin(id: number) {
    try {
      const { data } = await api.put(`/user/admin/${id}`);

      return data;
    } catch (err) {
      throw err;
    }
  }


  async handleAlterarSenha(id: number, senha: string) {
    try {
      const { data } = await api.put(`/user/alterar-senha/${id}`, {senha});

      return data;
    } catch (err) {
      throw err;
    }
  }
}
