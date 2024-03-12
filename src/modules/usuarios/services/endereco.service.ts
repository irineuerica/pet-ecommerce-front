import { api } from 'src/config/api.config';
import { UsuarioInterface } from '../interfaces/usuario.type';
import { EnderecoInterface } from 'src/interfaces/endereco.interface';

export class EnderecoService {
  static instance: EnderecoService;

  private constructor() {}

  static getInstance() {
    if (!this.instance) {
      this.instance = new EnderecoService();
    }

    return this.instance;
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

  async handleDeletarEndereco(id: number) {
    try {
      const { data } = await api.delete(`/endereco/${id}`);
      return data;
    } catch (err) {
      throw err;
    }
  }

  async getEnderecos() {
    try {
      const { data } = await api.get<EnderecoInterface[]>(`/endereco`);
      return data;
    } catch (err) {
      throw err;
    }
  }
}
