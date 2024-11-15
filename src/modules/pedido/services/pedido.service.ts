import { api } from 'src/config/api.config';
import { CreatePedido, ListPedidoInterface, Status } from 'src/interfaces/pedidos.interface';

interface AlterarStatusProps {
  status: Status;
  id: number;
}

interface TrocaDevolucaoProps {
  status: Status;
  id: number;
  devolverEstoque: boolean;
}

export interface AnalysisProps {
  produtosId: number[];
  dataInicio: Date;
  dataFim: Date;
}
export class PedidoService {
  static instance: PedidoService;

  private constructor() {}

  static getInstance() {
    if (!this.instance) {
      this.instance = new PedidoService();
    }

    return this.instance;
  }

  async handleSalvarPedido(pedido: CreatePedido) {
    try {
      const { data } = await api.post(`/pedido`, { pedido });
      return data;
    } catch (err) {
      throw err;
    }
  }

  async getByUser() {
    try {
      const { data } = await api.get(`/pedido`);
      return data;
    } catch (err) {
      throw err;
    }
  }

  async getAll() {
    try {
      const { data } = await api.get<ListPedidoInterface[]>(`/pedido/all`);
      return data;
    } catch (err) {
      throw err;
    }
  }

  async show(id: number) {
    try {
      const { data } = await api.get(`/pedido/show/${id}`);
      return data;
    } catch (err) {
      throw err;
    }
  }

  async handleAlterarStatusItem({ status, id }: AlterarStatusProps) {
    try {
      const { data } = await api.post(`/pedido/status/item`, { status, id });
      return data;
    } catch (err) {
      throw err;
    }
  }

  async handleAlterarStatusPedido({ status, id }: AlterarStatusProps) {
    try {
      const { data } = await api.post(`/pedido/status`, { status, id });
      return data;
    } catch (err) {
      throw err;
    }
  }

  async handleTrocaDevolucao({ status, id, devolverEstoque }: TrocaDevolucaoProps) {
    try {
      const { data } = await api.post(`/pedido/troca-devolucao`, { status, id, devolverEstoque });
      return data;
    } catch (err) {
      throw err;
    }
  }

  async analysis({ produtosId, dataFim, dataInicio }: AnalysisProps) {
    try {
      const { data } = await api.post(`/pedido/analise`, { produtosId, dataFim, dataInicio });
      return data;
    } catch (err) {
      throw err;
    }
  }
}
