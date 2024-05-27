export enum StatusPedidoEnum  {
  EM_PROCESSAMENTO = 1,
  PAGAMENTO_REALIZADO,
  PAGAMENTO_APROVADO,
  PAGAMENTO_RECUSADO,
  EM_TRANSPORTE,
  TROCA_SOLICITADA,
  TROCA_AUTORIZADA,
  TROCA_EFETUADA,
  TROCA_REJEITADA,
  CANCELAMENTO_REJEITADO,
  CANCELAMENTO_EFETUADO,
  CANCELAMENTO_AUTORIZADO,
  ENTREGA_REALIZADA,
};

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
    nome: 'Pagamento aprovado',
  },
  {
    id: 4,
    nome: 'Pagamento recusado',
  },
  {
    id: 5,
    nome: 'Em transporte',
  },
  {
    id: 6,
    nome: 'Troca solicitada',
  },
  {
    id: 7,
    nome: 'Troca autorizada',
  },
  {
    id: 8,
    nome: 'Troca efetuada',
  },
  {
    id: 9,
    nome: 'Troca rejeitada',
  },
  {
    id: 13,
    nome: 'Entrega realizada',
  },
]

