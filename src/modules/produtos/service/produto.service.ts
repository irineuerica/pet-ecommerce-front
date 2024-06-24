import { api } from 'src/config/api.config';
import { CategoriaInterface } from 'src/interfaces/categoria.interface';
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

  async listActive(): Promise<ProdutoInterface[]> {
    try {
      const { data } = await api.get<ProdutoInterface[]>(`/produto/`);

      return data;
    } catch (err) {
      throw err;
    }
  }

  async listAll(): Promise<ProdutoInterface[]> {
    try {
      const { data } = await api.get<ProdutoInterface[]>(`/produto/listAll`);

      return data;
    } catch (err) {
      throw err;
    }
  }

  async listCategorias(): Promise<CategoriaInterface[]> {
    try {
      const { data } = await api.get<CategoriaInterface[]>(`/produto/categoria`);

      return data;
    } catch (err) {
      throw err;
    }
  }

  async create(produto: ProdutoInterface): Promise<ProdutoInterface> {
    try {
      const { data } = await api.post<ProdutoInterface>(`/produto/`, {produto});

      return data;
    } catch (err) {
      throw err;
    }
  }

  async update(produto: ProdutoInterface): Promise<ProdutoInterface> {
    try {
      const { data } = await api.put<ProdutoInterface>(`/produto/`, {produto});

      return data;
    } catch (err) {
      throw err;
    }
  }

  async show(id: number): Promise<ProdutoInterface> {
    try {
      const { data } = await api.get<ProdutoInterface>(`/produto/${id}`);

      return data;
    } catch (err) {
      throw err;
    }
  }

}
