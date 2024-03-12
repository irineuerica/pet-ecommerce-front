import CardDadosEndereco from '@modules/usuarios/components/meus-enderecos/card-dados-endereco';
import { useEnderecoQuery } from '@modules/usuarios/hooks/react-query/useEnderecoQuery';
import { LoadingButton } from '@mui/lab';
import { Button, Stack, Typography, useTheme } from '@mui/material';
import { useRouter } from 'next/router';

import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { EnderecoInterface } from 'src/interfaces/endereco.interface';
import { PATH_CLIENTE } from 'src/routes/paths';

export const NovoEnderecoSection = () => {
  const router = useRouter();
  const theme = useTheme();
  const { handleSalvarEndereco, handleSalvarEnderecoIsLoading } = useEnderecoQuery();
  const methods = useForm({});

  const submitEndereco: SubmitHandler<EnderecoInterface> = async (enderecoData) => {
    try {
      await handleSalvarEndereco({ endereco: enderecoData, id: enderecoData.id ?? undefined });
      router.push(PATH_CLIENTE.minha_conta.root);
    } catch (err) {
      throw err;
    }
  };

  return (
    <FormProvider {...methods}>
      <Typography fontWeight="bold" color={theme.palette.secondary.main} fontSize={20}>
        Novo endereço
      </Typography>
      <CardDadosEndereco />
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
          loading={handleSalvarEnderecoIsLoading}
          onClick={() =>
            // @ts-ignore
            methods.handleSubmit(submitEndereco, (e) => {
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
