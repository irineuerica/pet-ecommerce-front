import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import { Box, Link, Stack, Typography } from '@mui/material';
import * as yup from 'yup';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormInputText } from 'src/components/FormInputText ';

import { LoadingButton } from '@mui/lab';
import { useSnackbar } from 'notistack';
import { handleLoginProps } from '@modules/auth/login/hooks/useAuth';
import useAuth from '@modules/auth/login/hooks/useAuth';

export default function LoginSection() {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const { handleUserLogin, loading } = useAuth();
  const methods = useForm({
    resolver: yupResolver(
      yup.object().shape({
        email: yup.string().required('Informe o e-mail'),
        senha: yup.string().required('Informe a senha'),
      }),
    ),
  });

  const handleSubmitLogin: SubmitHandler<handleLoginProps> = async (data) => {
    try {
      handleUserLogin({ email: data.email, senha: data.senha });
    } catch (err) {
      throw err;
    }
  };

  return (
    <FormProvider {...methods}>
      <Head>
        <title>Login</title>
      </Head>
      <Box
        sx={{
          backgroundColor: 'background.paper',
          flex: '1 1 auto',
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            maxWidth: 550,
            px: 3,
            py: '100px',
            width: '100%',
          }}
        >
          <Stack sx={{ mb: 3 }}>
            <Typography variant="h4">Login</Typography>
            <Typography color="text.secondary" variant="body2">
              Não possui uma conta? &nbsp;
              <Link component={NextLink} href="/auth/cadastrar" underline="hover" variant="subtitle2">
                Cadastrar
              </Link>
            </Typography>
          </Stack>
          <Stack spacing={3} py={3}>
            <FormInputText name="email" label="E-mail" />
            <FormInputText name="senha" label="Senha" type="password" />
          </Stack>
          <LoadingButton
            fullWidth
            size="large"
            sx={{ mt: 3 }}
            variant="contained"
            onClick={() => {
              // @ts-ignore
              methods.handleSubmit(handleSubmitLogin, (e) => {
                enqueueSnackbar('Erro ao logar usuário', {
                  variant: 'error',
                  style: { whiteSpace: 'pre-line' },
                });
              })();
            }}
          >
            Continuar
          </LoadingButton>
        </Box>
      </Box>
    </FormProvider>
  );
}
