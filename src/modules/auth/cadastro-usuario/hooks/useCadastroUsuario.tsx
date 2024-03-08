import { useRouter } from "next/router";
import { useMutation } from 'react-query';
import { useSnackbar } from 'notistack';

import { CadastroUsuarioInterface } from "../types/cadastro-usuario-types";
import { CadastroUsuarioService } from "../services/cadastro-usuario.service";
import { HttpStatusCode } from 'axios';
import { AxiosCustomError } from "src/@types/axios.types";

export function useCadastroUsuario() {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();


  const { mutateAsync: handleCadastrarUsuario, isLoading: handleCadastrarUsuarioIsLoading } =
    useMutation(
      (usuario : CadastroUsuarioInterface) =>
        CadastroUsuarioService.getInstance().handleCadastrarUsuario(usuario),
      {
        onError(err: AxiosCustomError) {
            
          if (err.statusCode === HttpStatusCode.InternalServerError) {
            enqueueSnackbar('Tivemos problemas ao finalizar seu cadastro. Tente novamente', {
              variant: 'error',
            });
          } else {
             enqueueSnackbar(err.response?.data.message, {
              variant: 'error',
            });
          }
        },
        onSuccess() {
          enqueueSnackbar('Cadastro realizado com sucesso!',
            {
              variant: 'success',
              style: { whiteSpace: 'pre-line' },
              autoHideDuration: 10000,
            }
          );
    
        },
      }
    );

  return {
    handleCadastrarUsuario,
    handleCadastrarUsuarioIsLoading,
  };
}
