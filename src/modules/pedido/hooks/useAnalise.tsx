import { useMutation } from 'react-query';
import { useSnackbar } from 'notistack';
import { HttpStatusCode } from 'axios';
import { AxiosCustomError } from 'src/@types/axios.types';
import { AnalysisProps, PedidoService } from '../services/pedido.service';

export function useAnalise() {
  const { enqueueSnackbar } = useSnackbar();

  const { mutateAsync: handleAnalysis, isLoading: handleAnalysisIsLoading } = useMutation(
    ({ produtosId, dataFim, dataInicio }: AnalysisProps) => PedidoService.getInstance().analysis({produtosId, dataFim, dataInicio}),
    {
      onError(err: AxiosCustomError) {
        if (err.statusCode === HttpStatusCode.InternalServerError) {
          enqueueSnackbar('Tivemos problemas ao buscar os dados. Tente novamente', {
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
    handleAnalysis,
    handleAnalysisIsLoading,
  };
}
