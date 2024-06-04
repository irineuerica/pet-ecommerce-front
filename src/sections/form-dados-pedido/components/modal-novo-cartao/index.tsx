import { Dialog, DialogActions, DialogTitle, Button, DialogContent } from '@mui/material';
import CardDadosCartao from '@modules/usuarios/components/meus-cartoes/card-dados-cartao';
import React, { useContext } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import PedidoContext from '@modules/pedido/contexts/PedidoContext';
import { cadastroCartao } from '@modules/usuarios/validators/cartao-schema';
import { useCartaoQuery } from '@modules/usuarios/hooks/react-query/useCartaoQuery';
import { CartaoInterface } from 'src/interfaces/cartao.interface';

interface ModalProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  isCobranca?: boolean;
}

export function ModalNovoCartao({ open, setOpen, isCobranca = false }: ModalProps) {
  const pedidoContext = useContext(PedidoContext);
  const methods = useForm({
    resolver: yupResolver(cadastroCartao),
  });

  const { handleSalvarCartao, handleSalvarCartaoIsLoading } = useCartaoQuery();

  const submitCartao: SubmitHandler<CartaoInterface> = async (cartaoData) => {
    try {
      const novoCartao = await handleSalvarCartao({ cartao: cartaoData, id: cartaoData.id ?? undefined });
      pedidoContext?.adicionarCartao(novoCartao);
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
          <CardDadosCartao />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancelar</Button>
          <LoadingButton
            loading={handleSalvarCartaoIsLoading}
            onClick={() => {
              //@ts-ignore
              methods.handleSubmit(submitCartao, (e) => {
                console.error(e);
              })();
            }}
            key={`btn_salva_cartao`}
          >
            Salvar
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </FormProvider>
  );
}
