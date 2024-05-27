import { useMutation } from 'react-query';
import { useSnackbar } from 'notistack';
import { HttpStatusCode } from 'axios';
import { AxiosCustomError } from 'src/@types/axios.types';
import { CreatePedido } from 'src/interfaces/pedidos.interface';
import { PedidoService } from '../services/pedido.service';

export function useSalvarPedido() {
  const { enqueueSnackbar } = useSnackbar();

  const { mutateAsync: handleSalvarPedido, isLoading: handleSalvarPedidoIsLoading } = useMutation(
    ({ pedido }: {pedido: CreatePedido}) =>
      PedidoService.getInstance().handleSalvarPedido(pedido),
    {
      onError(err: AxiosCustomError) {
        if (err.statusCode === HttpStatusCode.InternalServerError) {
          enqueueSnackbar('Tivemos problemas ao criar seu pedido. Tente novamente', {
            variant: 'error',
          });
        } else {
          enqueueSnackbar(err.response?.data.message, {
            variant: 'error',
          });
        }
      },
      onSuccess() {
        enqueueSnackbar('Pedido criado com sucesso!', {
          variant: 'success',
          style: { whiteSpace: 'pre-line' },
          autoHideDuration: 10000,
        });
      },
    },
  );

 
  

  return {
    handleSalvarPedido,
    handleSalvarPedidoIsLoading,

  };
}
