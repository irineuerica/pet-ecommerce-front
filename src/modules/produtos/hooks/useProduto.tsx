import { useQuery } from 'react-query';

import { ProdutoService } from '../service/produto.service';

export function useProduto() {
  const { data, isLoading } = useQuery('PRODUTOS@FIND_ALL', () => ProdutoService.getInstance().listAll());
  return {
    produtos: data || [],
    isLoading,
  };
}
