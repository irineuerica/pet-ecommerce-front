import { useRouter } from 'next/router';
import { useMutation, useQuery } from 'react-query';
import { useSnackbar } from 'notistack';
import { HttpStatusCode } from 'axios';
import { AxiosCustomError } from 'src/@types/axios.types';
import { UsuarioInterface } from '@modules/usuarios/interfaces/usuario.type';
import { UsuarioService } from '@modules/usuarios/services/usuario.service';
import { UsuarioKeysEnum } from '@modules/usuarios/constants/usuario-keys.enums';

export function useUsuarioQuery() {
  const { enqueueSnackbar } = useSnackbar();

  const { mutateAsync: handleSalvarUsuario, isLoading: handleSalvarUsuarioIsLoading } = useMutation(
    ({ usuario, id }: { usuario: UsuarioInterface; id: number }) =>
      UsuarioService.getInstance().handleSalvarUsuario({ usuario, id }),
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

  const { mutateAsync: handleChangeStatus, isLoading: handleChangeStatusIsLoading } = useMutation(
    ({ status, id }: { status: boolean; id: number }) =>
      UsuarioService.getInstance().handleAlterarStatus({ status, id }),
    {
      onError(err: AxiosCustomError) {
        if (err.statusCode === HttpStatusCode.InternalServerError) {
          enqueueSnackbar('Tivemos problemas ao salvar os dados. Tente novamente', {
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

  const { mutateAsync: handleSetAdmin, isLoading: handleSetAdminIsLoading } = useMutation(
    ({ id }: { id: number }) => UsuarioService.getInstance().handleSetAdmin(id),
    {
      onError(err: AxiosCustomError) {
        if (err.statusCode === HttpStatusCode.InternalServerError) {
          enqueueSnackbar('Tivemos problemas ao salvar os dados. Tente novamente', {
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

  const { data: usuarios, isLoading: usuariosIsLoading } = useQuery([UsuarioKeysEnum.GET_ALL], () =>
    UsuarioService.getInstance().listAll(),
  );

  return {
    handleSalvarUsuario,
    handleSalvarUsuarioIsLoading,
    handleChangeStatus,
    handleChangeStatusIsLoading,
    usuarios,
    usuariosIsLoading,
    handleSetAdmin,
    handleSetAdminIsLoading,
  };
}
