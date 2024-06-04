function path(root: string, sublink: string) {
  return `${root}${sublink}`;
}

export const ROOT_ADMIN = '/admin';
export const ROOT_CLIENTE = '/cliente';
export const ROOT_AUTH = '/auth';

export const PATH_AUTH = {
  login: path(ROOT_AUTH, '/login'),
  cadastro: path(ROOT_AUTH, '/cadastrar'),
};

export const PATH_CLIENTE = {
  root: ROOT_CLIENTE,
  minha_conta: {
    root: path(ROOT_CLIENTE, '/minha-conta'),
    novo_endereco: path(ROOT_CLIENTE, '/minha-conta/novo-endereco'),
    novo_cartao: path(ROOT_CLIENTE, '/minha-conta/novo-cartao'),
    alterar_senha: path(ROOT_CLIENTE, '/minha-conta/alterar-senha'),
  },
  carrinho: path(ROOT_CLIENTE, '/carrinho'),
  pedido_criado: path(ROOT_CLIENTE, '/pedido-criado'),
  dados_pedido: path(ROOT_CLIENTE, '/form-dados-pedido'),
  meus_pedidos: path(ROOT_CLIENTE, '/meus-pedidos'),
  detalhe_pedido: path(ROOT_CLIENTE, '/meus-pedidos/detalhe-pedido'),
  meus_cupons: path(ROOT_CLIENTE, '/meus-cupons'),
};

export const PATH_ADMIN = {
  root: ROOT_ADMIN,
  pedidos: path(ROOT_ADMIN, '/pedidos'),
  detalhe_pedido: path(ROOT_ADMIN, '/pedidos/detalhe-pedido'),
  usuarios: path(ROOT_ADMIN, '/usuarios'),
  dashboard: path(ROOT_ADMIN, '/dashboard'),
  produtos: path(ROOT_ADMIN, '/produtos'),
  novo_produto: path(ROOT_ADMIN, '/produtos/form-produto'),
  estoque: path(ROOT_ADMIN, '/estoque'),
  cupons: path(ROOT_ADMIN, '/cupons'),
};
