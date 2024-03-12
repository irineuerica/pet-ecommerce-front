import { useRouter } from 'next/router';
import { useMutation } from 'react-query';
import { useSnackbar } from 'notistack';
import { HttpStatusCode } from 'axios';
import { AxiosCustomError } from 'src/@types/axios.types';
import { handleLoginProps } from '../useAuth';
import { LoginService } from '../../services/login.service';

export function useAuthQuery() {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const { mutateAsync: handleLogin, isLoading: handleLoginIsLoading } = useMutation(
    ({ email, senha }: handleLoginProps) => LoginService.getInstance().handleLogin({ email, senha }),
    {
      onError(err: AxiosCustomError) {
        if (err.statusCode === HttpStatusCode.InternalServerError) {
          enqueueSnackbar('Tivemos problemas ao logar. Tente novamente', {
            variant: 'error',
          });
        } else {
          enqueueSnackbar(err.response?.data.message, {
            variant: 'error',
          });
        }
      },
      onSuccess() {
        enqueueSnackbar('Bem vindo(a)!', {
          variant: 'success',
        });
      },
    },
  );

  return {
    handleLogin,
    handleLoginIsLoading,
  };
}
