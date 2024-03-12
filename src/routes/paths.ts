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
    alterar_senha:  path(ROOT_CLIENTE, '/minha-conta/alterar-senha'),
  },
};
