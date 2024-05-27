import { api } from 'src/config/api.config';
import { CreatePedido } from 'src/interfaces/pedidos.interface';

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
}
