import { useRouter } from "next/router";
import { useMutation } from 'react-query';
import { useSnackbar } from 'notistack';
import { HttpStatusCode } from 'axios';
import { AxiosCustomError } from "src/@types/axios.types";
import { UsuarioInterface } from "@modules/usuarios/interfaces/usuario.type";
import { UsuarioService } from "@modules/usuarios/services/usuario.service";

export function useUsuarioQuery() {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();


  const { mutateAsync: handleSalvarUsuario, isLoading: handleSalvarUsuarioIsLoading } =
    useMutation(
      ({usuario, id} : {usuario : UsuarioInterface, id: number}) =>
        UsuarioService.getInstance().handleSalvarUsuario({usuario, id}),
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
          enqueueSnackbar('Dados salvos com sucesso!',
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
    handleSalvarUsuario,
    handleSalvarUsuarioIsLoading,
  };
}
