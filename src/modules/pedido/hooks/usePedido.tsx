import { useMutation, useQuery } from 'react-query';
import { useSnackbar } from 'notistack';
import { HttpStatusCode } from 'axios';
import { AxiosCustomError } from 'src/@types/axios.types';
import { PedidoService } from '../services/pedido.service';
import { CupomKeysEnum } from '@modules/cupons/constants/usuario-keys.enums';
import { Status } from 'src/interfaces/pedidos.interface';

export function usePedido() {
  const { enqueueSnackbar } = useSnackbar();

  const { mutateAsync: handleShowPedido, isLoading: handleShowPedidoIsLoading } = useMutation(
    ({ id }: { id: number }) => PedidoService.getInstance().show(id),
    {
      onError(err: AxiosCustomError) {
        if (err.statusCode === HttpStatusCode.InternalServerError) {
          enqueueSnackbar('Tivemos problemas ao buscar seu pedido. Tente novamente', {
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

  const { mutateAsync: handleAlterarStatusItem, isLoading: handleAlterarStatusItemIsLoading } = useMutation(
    ({ status, id }: { status: Status; id: number }) =>
      PedidoService.getInstance().handleAlterarStatusItem({ status, id }),
    {
      onError(err: AxiosCustomError) {
        if (err.statusCode === HttpStatusCode.InternalServerError) {
          enqueueSnackbar('Tivemos problemas ao atualizar seu pedido. Tente novamente', {
            variant: 'error',
          });
        } else {
          enqueueSnackbar('', {
            variant: 'error',
          });
        }
      },
    },
  );

  const { mutateAsync: handleGetAll, isLoading: handleGetAllIsLoading } = useMutation(
    () => PedidoService.getInstance().getAll(),
    {
      onError(err: AxiosCustomError) {
        if (err.statusCode === HttpStatusCode.InternalServerError) {
          enqueueSnackbar('Tivemos problemas ao buscar os pedidos. Tente novamente', {
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

  const { mutateAsync: handleAlterarStatusPedido, isLoading: handleAlterarStatusPedidoIsLoading } = useMutation(
    ({ status, id }: { status: Status; id: number }) =>
      PedidoService.getInstance().handleAlterarStatusPedido({ status, id }),
    {
      onError(err: AxiosCustomError) {
        if (err.statusCode === HttpStatusCode.InternalServerError) {
          enqueueSnackbar('Tivemos problemas ao atualizar s pedido. Tente novamente', {
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

  const { mutateAsync: handleTrocaDevolucao, isLoading: handleTrocaDevolucaoIsLoading } = useMutation(
    ({ status, id }: { status: Status; id: number }) =>
      PedidoService.getInstance().handleTrocaDevolucao({ status, id }),
    {
      onError(err: AxiosCustomError) {
        if (err.statusCode === HttpStatusCode.InternalServerError) {
          enqueueSnackbar('Tivemos problemas ao atualizar o pedido. Tente novamente', {
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

  const { data: pedidos, isLoading: pedidosIsLoading } = useQuery([CupomKeysEnum.GET_BY_USER], () =>
    PedidoService.getInstance().getByUser(),
  );

  return {
    handleShowPedido,
    handleShowPedidoIsLoading,
    pedidos,
    pedidosIsLoading,
    handleAlterarStatusItem,
    handleAlterarStatusItemIsLoading,
    handleGetAll,
    handleGetAllIsLoading,
    handleAlterarStatusPedido,
    handleAlterarStatusPedidoIsLoading,
    handleTrocaDevolucao,
    handleTrocaDevolucaoIsLoading,
  };
}
