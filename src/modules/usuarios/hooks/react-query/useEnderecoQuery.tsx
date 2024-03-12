import { useMutation, useQuery } from 'react-query';
import { useSnackbar } from 'notistack';
import { HttpStatusCode } from 'axios';
import { AxiosCustomError } from 'src/@types/axios.types';
import { EnderecoInterface } from 'src/interfaces/endereco.interface';
import { EnderecoKeysEnum } from '@modules/usuarios/constants/endereco-keys.enums';
import { EnderecoService } from '@modules/usuarios/services/endereco.service';

export function useEnderecoQuery() {
  const { enqueueSnackbar } = useSnackbar();

  const { mutateAsync: handleSalvarEndereco, isLoading: handleSalvarEnderecoIsLoading } = useMutation(
    ({ endereco, id }: { endereco: EnderecoInterface; id?: number }) =>
      EnderecoService.getInstance().handleSalvarEndereco({ endereco, id }),
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

  const { mutateAsync: handleDeleteEndereco, isLoading: handleDeleteEnderecoIsLoading } = useMutation(
    (id: number) => EnderecoService.getInstance().handleDeletarEndereco(id),
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

  const { data: enderecos, isLoading: enderecosIsLoading } = useQuery([EnderecoKeysEnum.GET_ENDERECOS], () =>
    EnderecoService.getInstance().getEnderecos(),
  );

  return {
    enderecos,
    enderecosIsLoading,
    handleSalvarEndereco,
    handleSalvarEnderecoIsLoading,
    handleDeleteEndereco,
    handleDeleteEnderecoIsLoading,
  };
}
