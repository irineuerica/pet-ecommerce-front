import { api } from 'src/config/api.config';
import { CartaoInterface } from 'src/interfaces/cartao.interface';

export class CartaoService {
  static instance: CartaoService;

  private constructor() {}

  static getInstance() {
    if (!this.instance) {
      this.instance = new CartaoService();
    }

    return this.instance;
  }

  async handleSalvarCartao({ cartao, id }: { cartao: CartaoInterface; id?: number }) {
    try {
      if (id) {
        const { data } = await api.put(`/cartao/${id}`, { cartao });
        return data;
      } else {
        const { data } = await api.post(`/cartao`, { cartao });
        return data;
      }
    } catch (err) {
      throw err;
    }
  }

  async handleDeletarCartao(id: number) {
    try {
      const { data } = await api.delete(`/cartao/${id}`);
      return data;
    } catch (err) {
      throw err;
    }
  }

  async getCartoes() {
    try {
      const { data } = await api.get<CartaoInterface[]>(`/cartao`);
      return data;
    } catch (err) {
      throw err;
    }
  }
}
