import { api } from 'src/config/api.config';
import { EstoqueInterface } from 'src/interfaces/estoque.interface';
import { PrecificacaoInterface } from 'src/interfaces/precificacao.interface';

export class EstoqueService {
  static instance: EstoqueService;

  private constructor() {}

  static getInstance() {
    if (!this.instance) {
      this.instance = new EstoqueService();
    }

    return this.instance;
  }

  async list(): Promise<EstoqueInterface[]> {
    try {
      const { data } = await api.get<EstoqueInterface[]>(`/estoque/`);

      return data;
    } catch (err) {
      throw err;
    }
  }

  async listGruposPrecificacao(): Promise<PrecificacaoInterface[]> {
    try {
      const { data } = await api.get<PrecificacaoInterface[]>(`/estoque/gruposPrecificacao`);

      return data;
    } catch (err) {
      throw err;
    }
  }

  async create(estoque: EstoqueInterface): Promise<EstoqueInterface> {
    try {
      const { data } = await api.post<EstoqueInterface>(`/estoque`,{estoque});

      return data;
    } catch (err) {
      throw err;
    }
  }

  async update(estoque: EstoqueInterface): Promise<EstoqueInterface> {
    try {
      const { data } = await api.put<EstoqueInterface>(`/estoque`,{estoque});

      return data;
    } catch (err) {
      throw err;
    }
  }

  async show(id: number): Promise<EstoqueInterface> {
    try {
      const { data } = await api.get<EstoqueInterface>(`/estoque/${id}`);

      return data;
    } catch (err) {
      throw err;
    }
  }

}
