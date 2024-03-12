import { yupResolver } from '@hookform/resolvers/yup';
import CardDadosCartao from '@modules/usuarios/components/meus-cartoes/card-dados-cartao';
import { useCartaoQuery } from '@modules/usuarios/hooks/react-query/useCartaoQuery';
import { cadastroCartao } from '@modules/usuarios/validators/cartao-schema';
import { LoadingButton } from '@mui/lab';
import { Button, Stack, Typography, useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { CartaoInterface } from 'src/interfaces/cartao.interface';
import { PATH_CLIENTE } from 'src/routes/paths';

export const NovoCartaoSection = () => {
  const router = useRouter();
  const theme = useTheme();
  const { handleSalvarCartao, handleSalvarCartaoIsLoading } = useCartaoQuery();
  const methods = useForm({
    resolver: yupResolver(cadastroCartao)
  });

  const submitCartao: SubmitHandler<CartaoInterface> = async (cartaoData) => {
    try {
      await handleSalvarCartao({ cartao: cartaoData, id: cartaoData.id ?? undefined });
      router.push(PATH_CLIENTE.minha_conta.root);
    } catch (err) {
      throw err;
    }
  };

  return (
    <FormProvider {...methods}>
      <Typography fontWeight="bold" color={theme.palette.secondary.main} fontSize={20}>
        Novo Cartão
      </Typography>
      <CardDadosCartao />
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
          loading={handleSalvarCartaoIsLoading}
          onClick={() =>
            // @ts-ignore
            methods.handleSubmit(submitCartao, (e) => {
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
