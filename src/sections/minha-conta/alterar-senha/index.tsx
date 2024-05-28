import { yupResolver } from '@hookform/resolvers/yup';
import AlterarSenha from '@modules/usuarios/components/alterar-senha';
import { useUsuarioQuery } from '@modules/usuarios/hooks/react-query/useUsuarioQuery';
import { AlterarSenhaInterface } from '@modules/usuarios/interfaces/alterar-senha.interface';
import { alteracaoSenhaUsuarioSchema } from '@modules/usuarios/validators/usuario-schema';
import { LoadingButton } from '@mui/lab';
import { Button, Card, CardContent, Stack, Typography, useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { PATH_CLIENTE } from 'src/routes/paths';

export const AlterarSenhaSection = () => {
  const router = useRouter();
  const theme = useTheme();
  const { handleAlterarSenha, handleAlterarSenhaIsLoading } = useUsuarioQuery();

  const {
    query: { id },
  } = router;

  const methods = useForm({
    resolver: yupResolver(alteracaoSenhaUsuarioSchema),
  });

  useEffect(() => {
    methods.setValue('id', Number(id));
  }, [id]);

  const submitAlterarSenha: SubmitHandler<AlterarSenhaInterface> = async (userData) => {
    try {
      await handleAlterarSenha({ senha: userData.senha, id: userData.id });
      router.push(PATH_CLIENTE.minha_conta.root);
    } catch (err) {
      throw err;
    }
  };

  return (
    <FormProvider {...methods}>
      <Typography fontWeight="bold" color={theme.palette.secondary.main} fontSize={20}>
        Alterar senha
      </Typography>
      <Card>
        <CardContent>
          <AlterarSenha />
        </CardContent>
      </Card>
      <Stack flexDirection="row">
        <Button
          color="error"
          fullWidth
          variant="contained"
          onClick={() =>
            // @ts-ignore
            router.push(PATH_CLIENTE.minha_conta.root)
          }
          sx={{ mr: 1 }}
        >
          Voltar
        </Button>
        <LoadingButton
          fullWidth
          variant="contained"
          loading={handleAlterarSenhaIsLoading}
          onClick={() =>
            // @ts-ignore
            methods.handleSubmit(submitAlterarSenha, (e) => {
              console.error(e);
            })()
          }
          sx={{ ml: 1 }}
        >
          Salvar
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
};
