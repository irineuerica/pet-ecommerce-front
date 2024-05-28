import { api } from 'src/config/api.config';
import { CupomInterface } from 'src/interfaces/cupom.interface';
import { EnderecoInterface } from 'src/interfaces/endereco.interface';

export class CupomService {
  static instance: CupomService;

  private constructor() {}

  static getInstance() {
    if (!this.instance) {
      this.instance = new CupomService();
    }

    return this.instance;
  }

  async getCupons() {
    try {
      const { data } = await api.get<CupomInterface[]>(`/cupom/user`);
      return data;
    } catch (err) {
      throw err;
    }
  }

  async getAllCupons() {
    try {
      const { data } = await api.get<CupomInterface[]>(`/cupom`);
      return data;
    } catch (err) {
      throw err;
    }
  }

  async validate(codigo: string) {
    try {
      const { data } = await api.get<boolean>(`/validate/${codigo}`);
      return data;
    } catch (err) {
      throw err;
    }
  }

  async handleSalvarCupom({ cupom, id }: { cupom: CupomInterface; id?: number }) {
    try {
      if (id) {
        const { data } = await api.put(`/cupom/${id}`, { cupom });
        return data;
      } else {
        const { data } = await api.post(`/cupom`, { cupom });
        return data;
      }
    } catch (err) {
      throw err;
    }
  }
}
