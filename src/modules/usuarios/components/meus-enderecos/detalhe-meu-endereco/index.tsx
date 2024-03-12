import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { EnderecoInterface } from 'src/interfaces/endereco.interface';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import CardDadosEndereco from '../card-dados-endereco';
import { useTheme } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useEnderecoQuery } from '@modules/usuarios/hooks/react-query/useEnderecoQuery';
import { PATH_CLIENTE } from 'src/routes/paths';
import { useRouter } from 'next/router';
import { yupResolver } from '@hookform/resolvers/yup';
import { alterarEndereco } from '@modules/usuarios/validators/endereco-schemas';
import { useDialogConfirmation } from 'src/components/dialog-confirmation/DialogConfirmationProvider';

interface DetalheMeusEnderecosProps {
  endereco: EnderecoInterface;
}

export default function DetalheMeusEnderecos({ endereco }: DetalheMeusEnderecosProps) {
  const theme = useTheme();
  const router = useRouter();
  const { openDialogConfirmation } = useDialogConfirmation();
  const methods = useForm({
    resolver: yupResolver(alterarEndereco),
    defaultValues: {
      id: endereco.id,
      tpResidencia: endereco.tpResidencia,
      tpLogradouro: endereco.tpLogradouro,
      logradouro: endereco.logradouro,
      numero: endereco.numero,
      nome: endereco.nome,
      bairro: endereco.bairro,
      cep: endereco.cep,
      cidade: endereco.cidade,
      estado: endereco.estado,
      observacao: endereco.observacao,
      cobranca: endereco.cobranca,
      entrega: endereco.entrega,
    },
  });
  const { handleSalvarEndereco, handleSalvarEnderecoIsLoading, handleDeleteEndereco, handleDeleteEnderecoIsLoading } =
    useEnderecoQuery();

  const submitEndereco: SubmitHandler<EnderecoInterface> = async (enderecoData) => {
    try {
      await handleSalvarEndereco({ endereco: enderecoData, id: enderecoData.id ?? undefined });
      router.push(PATH_CLIENTE.minha_conta.root);
    } catch (err) {
      throw err;
    }
  };

  const submitDeleteEndereco: SubmitHandler<EnderecoInterface> = async (enderecoData) => {
    try {
      const id = enderecoData.id ?? 0;
      await handleDeleteEndereco(id);
      router.push(PATH_CLIENTE.minha_conta.root);
    } catch (err) {
      throw err;
    }
  };

  const onExcluir = () => {
    openDialogConfirmation({
      title: `Deseja excluir o endereço?`,
      description: 'Ao excluir, o endereço será removido do seu perfil',
      color: 'error',
      confirmActionText: 'Excluir endereço',
      onConfirm() {
        // @ts-ignore
        methods.handleSubmit(submitDeleteEndereco, (e) => {
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
          {endereco.nome}
        </AccordionSummary>
        <AccordionDetails>
          <CardDadosEndereco />
        </AccordionDetails>
        <AccordionActions sx={{ pb: 2 }}>
          <LoadingButton
            loading={handleDeleteEnderecoIsLoading}
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
            loading={handleSalvarEnderecoIsLoading}
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
              methods.handleSubmit(submitEndereco, (e) => {
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
