import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useTheme } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { PATH_CLIENTE } from 'src/routes/paths';
import { useRouter } from 'next/router';
import { useDialogConfirmation } from 'src/components/dialog-confirmation/DialogConfirmationProvider';
import { CartaoInterface } from 'src/interfaces/cartao.interface';
import CardDadosCartao from '../card-dados-cartao';
import { useCartaoQuery } from '@modules/usuarios/hooks/react-query/useCartaoQuery';
import { alterarCartao } from '@modules/usuarios/validators/cartao-schema';
import { yupResolver } from '@hookform/resolvers/yup';

interface DetalheMeusCartoesProps {
  cartao: CartaoInterface;
}

export default function DetalheMeusCartoes({ cartao }: DetalheMeusCartoesProps) {
  const theme = useTheme();
  const router = useRouter();
  const { openDialogConfirmation } = useDialogConfirmation();
  const methods = useForm({
    resolver: yupResolver(alterarCartao),
    defaultValues: {
      id: cartao.id ?? 0,
      numero: cartao.numero,
      nome: cartao.nome,
      bandeira: cartao.bandeira,
      vencimentoMes: cartao.vencimentoMes,
      vencimentoAno: cartao.vencimentoAno,
      principal: cartao.principal,
    },
  });

  const { handleSalvarCartao, handleDeleteCartaoIsLoading, handleDeleteCartao, handleSalvarCartaoIsLoading } =
    useCartaoQuery();

  const submitCartao: SubmitHandler<CartaoInterface> = async (cartaoData) => {
    try {
      await handleSalvarCartao({ cartao: cartaoData, id: cartaoData.id ?? undefined });
      router.push(PATH_CLIENTE.minha_conta.root);
    } catch (err) {
      throw err;
    }
  };

  const submitDeleteCartao: SubmitHandler<CartaoInterface> = async (cartaoData) => {
    try {
      const id = cartaoData.id ?? 0;
      await handleDeleteCartao(id);
      router.push(PATH_CLIENTE.minha_conta.root);
    } catch (err) {
      throw err;
    }
  };

  const onExcluir = () => {
    openDialogConfirmation({
      title: `Deseja excluir o cartão?`,
      description: 'Ao excluir, o cartão será removido do seu perfil',
      color: 'error',
      confirmActionText: 'Excluir cartão',
      onConfirm() {
        // @ts-ignore
        methods.handleSubmit(submitDeleteCartao, (e) => {
          console.error(e);
        })();
      },
    });
  };

  return (
    <FormProvider {...methods}>
      <Accordion sx={{ borderRadius: 2, pb: 2 }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          sx={{ backgroundColor: theme.palette.primary.lightest, borderRadius: 2 }}
        >
          {cartao.bandeira}
        </AccordionSummary>
        <AccordionDetails>
          <CardDadosCartao />
        </AccordionDetails>
        <AccordionActions sx={{ pb: 2 }}>
          <LoadingButton
            loading={handleDeleteCartaoIsLoading}
            sx={{
              backgroundColor: theme.palette.warning.main,
              color: theme.palette.common.white,
              '&:hover': {
                backgroundColor: theme.palette.warning.main,
                color: theme.palette.common.white,
              },
            }}
            onClick={() => onExcluir()}
          >
            Excluir
          </LoadingButton>
          <LoadingButton
            loading={handleSalvarCartaoIsLoading}
            sx={{
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.common.white,
              '&:hover': {
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.common.white,
              },
            }}
            onClick={() =>
              // @ts-ignore
              methods.handleSubmit(submitCartao, (e) => {
                console.error(e);
              })()
            }
          >
            Salvar
          </LoadingButton>
        </AccordionActions>
      </Accordion>
    </FormProvider>
  );
}
