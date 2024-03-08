import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import { EnderecoInterface } from 'src/interfaces/endereco.interface';
import { FormProvider, useForm } from 'react-hook-form';
import CardDadosEndereco from '../card-dados-endereco';
import { useTheme } from '@mui/material';
import { LoadingButton } from '@mui/lab';

interface DetalheMeusEnderecosProps {
  endereco: EnderecoInterface;
}

export default function DetalheMeusEnderecos({ endereco }: DetalheMeusEnderecosProps) {
  const theme = useTheme();
  const methods = useForm<EnderecoInterface>({
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

  return (
    <FormProvider {...methods}>
      <Accordion sx={{ borderRadius: 2, pb: 2 }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          sx={{ backgroundColor: theme.palette.secondary.light, borderRadius: 2 }}
        >
          {endereco.nome}
        </AccordionSummary>
        <AccordionDetails>
          <CardDadosEndereco />
        </AccordionDetails>
        <AccordionActions sx={{pb: 2}}>
          <LoadingButton
            sx={{
              backgroundColor: theme.palette.warning.main,
              color: theme.palette.common.white,
              '&:hover': {
                backgroundColor: theme.palette.warning.main,
                color: theme.palette.common.white,
              },
            }}
          >
            Excluir
          </LoadingButton>
          <LoadingButton
            sx={{
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.common.white,
              '&:hover': {
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.common.white,
              },
            }}
          >
            Salvar
          </LoadingButton>
        </AccordionActions>
      </Accordion>
    </FormProvider>
  );
}
