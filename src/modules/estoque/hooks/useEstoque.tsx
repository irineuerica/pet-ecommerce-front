import { useMutation, useQuery } from 'react-query';
import { AxiosCustomError } from 'src/@types/axios.types';
import { HttpStatusCode } from 'axios';
import { enqueueSnackbar } from 'notistack';
import { EstoqueService } from '../services/estoque.service';
import { EstoqueInterface } from 'src/interfaces/estoque.interface';

export function useEstoque() {
  const { data, isLoading } = useQuery('ESTOQUE@FIND', () => EstoqueService.getInstance().list());
  const { data: gruposPrecificacao, isLoading: gruposPrecificacaoIsLoading } = useQuery('ESTOQUE@FIND_GRUPO_PRECIFICACAO', () => EstoqueService.getInstance().listGruposPrecificacao());

  const { mutateAsync: handleCriarEstoque, isLoading: handleCriarEstoqueIsLoading } = useMutation(
    (estoque : EstoqueInterface) =>
      EstoqueService.getInstance().create(estoque),
    {
      onError(err: AxiosCustomError) {
        if (err.statusCode === HttpStatusCode.InternalServerError) {
          enqueueSnackbar('Tivemos problemas salvar o estoque. Tente novamente', {
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

  const { mutateAsync: handleAlterarEstoque, isLoading: handleAlterarEstoqueIsLoading } = useMutation(
    (estoque : EstoqueInterface) =>
      EstoqueService.getInstance().update(estoque),
    {
      onError(err: AxiosCustomError) {
        if (err.statusCode === HttpStatusCode.InternalServerError) {
          enqueueSnackbar('Tivemos problemas salvar o estoque. Tente novamente', {
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

  const { mutateAsync: handleShowEstoque, isLoading: handleShowEstoqueIsLoading } = useMutation(
    (id : number) =>
      EstoqueService.getInstance().show(id),
    {
      onError(err: AxiosCustomError) {
        if (err.statusCode === HttpStatusCode.InternalServerError) {
          enqueueSnackbar('Tivemos problemas buscar o estoque. Tente novamente', {
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
    estoques: data || [],
    isLoading,
    gruposPrecificacao: gruposPrecificacao || [],
    gruposPrecificacaoIsLoading,
    handleCriarEstoque,
    handleCriarEstoqueIsLoading,
    handleAlterarEstoque,
    handleAlterarEstoqueIsLoading,
    handleShowEstoque,
    handleShowEstoqueIsLoading
  };
}
