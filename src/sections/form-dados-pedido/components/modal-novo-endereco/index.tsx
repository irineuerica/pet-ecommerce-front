import { Dialog, DialogActions, DialogTitle, Button, DialogContent } from '@mui/material';
import React, { useContext } from 'react';
import CardDadosEndereco from '@modules/usuarios/components/meus-enderecos/card-dados-endereco';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { cadastroEndereco } from '@modules/usuarios/validators/endereco-schemas';
import { useEnderecoQuery } from '@modules/usuarios/hooks/react-query/useEnderecoQuery';
import { EnderecoInterface } from 'src/interfaces/endereco.interface';
import { LoadingButton } from '@mui/lab';
import PedidoContext from '@modules/pedido/contexts/PedidoContext';

interface ModalProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  isCobranca?: boolean;
}

export function ModalNovoEndereco({ open, setOpen, isCobranca = false }: ModalProps) {
  const pedidoContext = useContext(PedidoContext);
  const methods = useForm({
    resolver: yupResolver(cadastroEndereco),
    defaultValues: {
      tpResidencia: '',
      tpLogradouro: '',
      logradouro: '',
      numero: '',
      nome: '',
      bairro: '',
      cep: '',
      cidade: '',
      estado: '',
      observacao: '',
      cobranca: true,
      entrega: true,
    },
  });

  const { handleSalvarEndereco, handleSalvarEnderecoIsLoading } = useEnderecoQuery();

  const submitEndereco: SubmitHandler<EnderecoInterface> = async (enderecoData) => {
    try {
      const novoEndereco = await handleSalvarEndereco({ endereco: enderecoData, id: enderecoData.id ?? undefined });
      if (isCobranca) {
        pedidoContext?.setEnderecoCobranca(novoEndereco);
      } else {
        pedidoContext?.setEndereco(novoEndereco);
      }
      setOpen(false);
    } catch (err) {
      throw err;
    }
  };

  return (
    <FormProvider {...methods}>
      <Dialog open={open} maxWidth={'md'}>
        <DialogTitle>Novo endereço</DialogTitle>
        <DialogContent>
          <CardDadosEndereco />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancelar</Button>
          <LoadingButton
            loading={handleSalvarEnderecoIsLoading}
            onClick={() => {
              //@ts-ignore
              methods.handleSubmit(submitEndereco, (e) => {
                console.error(e);
              })();
            }}
          >
            Salvar
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </FormProvider>
  );
}
