import { useMutation, useQuery } from 'react-query';
import { useSnackbar } from 'notistack';
import { HttpStatusCode } from 'axios';
import { AxiosCustomError } from 'src/@types/axios.types';
import { CartaoService } from '@modules/usuarios/services/cartao.service';
import { CartaoInterface } from 'src/interfaces/cartao.interface';
import { CartaoKeysEnum } from '@modules/usuarios/constants/cartao-keys.enums copy';

export function useCartaoQuery() {
  const { enqueueSnackbar } = useSnackbar();

  const { mutateAsync: handleSalvarCartao, isLoading: handleSalvarCartaoIsLoading } = useMutation(
    ({ cartao, id }: { cartao: CartaoInterface; id?: number }) =>
      CartaoService.getInstance().handleSalvarCartao({ cartao, id }),
    {
      onError(err: AxiosCustomError) {
        if (err.statusCode === HttpStatusCode.InternalServerError) {
          enqueueSnackbar('Tivemos problemas ao salvar seus dados. Tente novamente', {
            variant: 'error',
          });
        } else {
          enqueueSnackbar(err.response?.data.message, {
            variant: 'error',
          });
        }
      },
      onSuccess() {
        enqueueSnackbar('Dados salvos com sucesso!', {
          variant: 'success',
          style: { whiteSpace: 'pre-line' },
          autoHideDuration: 10000,
        });
      },
    },
  );

  const { mutateAsync: handleDeleteCartao, isLoading: handleDeleteCartaoIsLoading } = useMutation(
    (id: number) => CartaoService.getInstance().handleDeletarCartao(id),
    {
      onError(err: AxiosCustomError) {
        if (err.statusCode === HttpStatusCode.InternalServerError) {
          enqueueSnackbar('Tivemos problemas ao deletar seus dados. Tente novamente', {
            variant: 'error',
          });
        } else {
          enqueueSnackbar(err.response?.data.message, {
            variant: 'error',
          });
        }
      },
      onSuccess() {
        enqueueSnackbar('Dados salvos com sucesso!', {
          variant: 'success',
          style: { whiteSpace: 'pre-line' },
          autoHideDuration: 10000,
        });
      },
    },
  );

  const { data: cartoes, isLoading: cartoesIsLoading } = useQuery([CartaoKeysEnum.GET_CARTOES], () =>
    CartaoService.getInstance().getCartoes(),
  );

  return {
    cartoes,
    cartoesIsLoading,
    handleSalvarCartao,
    handleSalvarCartaoIsLoading,
    handleDeleteCartao,
    handleDeleteCartaoIsLoading,
  };
}
