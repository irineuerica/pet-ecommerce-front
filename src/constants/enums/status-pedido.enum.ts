export enum StatusPedidoEnum {
  EM_PROCESSAMENTO = 1,
  PAGAMENTO_REALIZADO,
  EM_TRANSPORTE,
  TROCA_SOLICITADA,
  TROCA_AUTORIZADA,
  TROCA_EFETUADA,
  TROCA_REJEITADA,
  DEVOLUÇÃO_SOLICITADA,
  DEVOLUÇÃO_REJEITADA,
  DEVOLUÇÃO_AUTORIZADA,
  DEVOLUÇÃO_EFETUADA,
  ENTREGA_REALIZADA,
}

export const StatusById = [
  {
    id: 1,
    nome: 'Em processamento',
  },
  {
    id: 2,
    nome: 'Pagamento realizado',
  },
  {
    id: 3,
    nome: 'Em transporte',
  },
  {
    id: 4,
    nome: 'Troca solicitada',
  },
  {
    id: 5,
    nome: 'Troca autorizada',
  },
  {
    id: 6,
    nome: 'Troca efetuada',
  },
  {
    id: 7,
    nome: 'Troca rejeitada',
  },
  {
    id: 8,
    nome: 'Devolução solicitada',
  },
  {
    id: 9,
    nome: 'Devolução autorizada',
  },
  {
    id: 10,
    nome: 'Devolução efetuada',
  },
  {
    id: 11,
    nome: 'Devolução rejeitada',
  },
  {
    id: 12,
    nome: 'Entrega realizada',
  },
];
