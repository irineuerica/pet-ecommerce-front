import { useMutation, useQuery } from 'react-query';
import { ProdutoService } from '../service/produto.service';
import { AxiosCustomError } from 'src/@types/axios.types';
import { ProdutoInterface } from 'src/interfaces/produtos.interface';
import { HttpStatusCode } from 'axios';
import { enqueueSnackbar } from 'notistack';

export function useProduto() {
  const { data, isLoading } = useQuery('PRODUTOS@FIND_ACTIVES', () => ProdutoService.getInstance().listActive());
  const { data: todosProdutos, isLoading: todosProdutosIsLoading } = useQuery('PRODUTOS@FIND_ALL', () => ProdutoService.getInstance().listAll());
  const { data: categorias, isLoading: categoriasIsLoading } = useQuery('CATEGORIAS@FIND_ALL', () =>
    ProdutoService.getInstance().listCategorias(),
  );

  const { mutateAsync: handleCriarProduto, isLoading: handleCriarProdutoIsLoading } = useMutation(
    (produto : ProdutoInterface) =>
      ProdutoService.getInstance().create(produto),
    {
      onError(err: AxiosCustomError) {
        if (err.statusCode === HttpStatusCode.InternalServerError) {
          enqueueSnackbar('Tivemos problemas salvar o produto. Tente novamente', {
            variant: 'error',
          });
        } else {
          enqueueSnackbar(err.response?.data.message, {
            variant: 'error',
          });
        }
      },
    },
  );

  const { mutateAsync: handleAlterarProduto, isLoading: handleAlterarProdutoIsLoading } = useMutation(
    (produto : ProdutoInterface) =>
      ProdutoService.getInstance().update(produto),
    {
      onError(err: AxiosCustomError) {
        if (err.statusCode === HttpStatusCode.InternalServerError) {
          enqueueSnackbar('Tivemos problemas salvar o produto. Tente novamente', {
            variant: 'error',
          });
        } else {
          enqueueSnackbar(err.response?.data.message, {
            variant: 'error',
          });
        }
      },
    },
  );

  const { mutateAsync: handleShowProduto, isLoading: handleShowProdutoIsLoading } = useMutation(
    (id : number) =>
      ProdutoService.getInstance().show(id),
    {
      onError(err: AxiosCustomError) {
        if (err.statusCode === HttpStatusCode.InternalServerError) {
          enqueueSnackbar('Tivemos problemas buscar o produto. Tente novamente', {
            variant: 'error',
          });
        } else {
          enqueueSnackbar(err.response?.data.message, {
            variant: 'error',
          });
        }
      },
    },
  );


  return {
    produtos: data || [],
    isLoading,
    categorias: categorias || [],
    categoriasIsLoading,
    handleCriarProduto,
    handleCriarProdutoIsLoading,
    handleAlterarProduto,
    handleAlterarProdutoIsLoading,
    handleShowProduto,
    handleShowProdutoIsLoading,
    todosProdutos,
    todosProdutosIsLoading
  };
}
