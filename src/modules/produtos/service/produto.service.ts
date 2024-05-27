import { api } from 'src/config/api.config';
import { ProdutoInterface } from 'src/interfaces/produtos.interface';

export class ProdutoService {
  static instance: ProdutoService;

  private constructor() {}

  static getInstance() {
    if (!this.instance) {
      this.instance = new ProdutoService();
    }

    return this.instance;
  }

  async listAll(): Promise<ProdutoInterface[]> {
    try {
      const { data } = await api.get<ProdutoInterface[]>(`/produto`);

      return data;
    } catch (err) {
      throw err;
    }
  }
}
