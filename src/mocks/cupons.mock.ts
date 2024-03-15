import { CupomInterface } from 'src/interfaces/cupom.interface';

export const CUPOM: CupomInterface[] = [
  {
    codigo: '9227-aaa',
    tipo: 'Troca',
    pedido_origem_id: 1,
    cliente_id: 1,
    valor: 50.5,
  },
  {
    codigo: '9087-jqz',
    tipo: 'Troca',
    pedido_origem_id: 1,
    cliente_id: 13,
    valor: 10.99,
  },
  {
    codigo: '2104-kqn',
    tipo: 'Promocional',
    pedido_origem_id: 2,
    cliente_id: 88,
    valor: 15.00,
  },
  {
    codigo: '8224-hrg',
    tipo: 'Devolução',
    pedido_origem_id: 3,
    cliente_id: 31,
    valor: 100.45,
  },
  {
    codigo: '4352-mof',
    tipo: 'Troca',
    pedido_origem_id: 4,
    cliente_id: 7,
    valor: 10.99,
  },
  {
    codigo: '4578-tfl',
    tipo: 'Devolução',
    pedido_origem_id: 5,
    cliente_id: 21,
    valor: 44.98,
  },
];
