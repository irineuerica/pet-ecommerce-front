import CardInformacoesBasicas from './components/cadastro-usuario-form/card-informacoes-basicas';
import { LoadingButton } from '@mui/lab';
import { useCadastroUsuario } from './hooks/useCadastroUsuario';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { CadastroUsuarioInterface } from './types/cadastro-usuario-types';
import { cadastroUsuarioSchema } from './validators/cadastro-usuario-schema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSnackbar } from 'notistack';


export default function CadastroUsuarioContent() {
  const { handleCadastrarUsuario, handleCadastrarUsuarioIsLoading } = useCadastroUsuario();
  const { enqueueSnackbar } = useSnackbar();
  const methods = useForm({
    resolver: yupResolver(cadastroUsuarioSchema),
  });

  const submitUsuario: SubmitHandler<CadastroUsuarioInterface> = async (usuario) => {
    try {
      handleCadastrarUsuario(usuario);
    } catch (err) {
        throw err;
    }
  };

  return (
    <FormProvider {...methods}>
      <CardInformacoesBasicas titulo="Informações pessoais" />
      <LoadingButton
        fullWidth
        variant="contained"
        loading={handleCadastrarUsuarioIsLoading}
        onClick={() =>
          // @ts-ignore
          methods.handleSubmit(submitUsuario, (e) => {
            enqueueSnackbar('Erro ao cadastrar usuário', {
              variant: 'error',
              style: { whiteSpace: 'pre-line' },
            });
          })()
        }
      >
        Cadastrar
      </LoadingButton>
    </FormProvider>
  );
}
