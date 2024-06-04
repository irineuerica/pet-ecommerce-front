import { useQuery } from 'react-query';

import { ProdutoService } from '../service/produto.service';

export function useProduto() {
  const { data, isLoading } = useQuery('PRODUTOS@FIND_ALL', () => ProdutoService.getInstance().listAll());
  const { data: categorias, isLoading: categoriasIsLoading } = useQuery('CATEGORIAS@FIND_ALL', () =>
    ProdutoService.getInstance().listCategorias(),
  );

  return {
    produtos: data || [],
    isLoading,
    categorias: categorias || [],
    categoriasIsLoading,
  };
}
