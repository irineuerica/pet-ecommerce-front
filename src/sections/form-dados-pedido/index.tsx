import { Grid, Typography, Stack, Button, TextField, useTheme, Divider } from '@mui/material';
import React, { useContext, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';
import { PATH_CLIENTE } from '../../routes/paths';
import { useRouter } from 'next/router';
import { ModalListaEndereco } from './components/modal-lista-enderecos';
import PedidoContext from '@modules/pedido/contexts/PedidoContext';
import { CupomInterface } from 'src/interfaces/cupom.interface';
import { formatCurrency } from 'src/utils/formatMoeda';
import { ModalListaCartoes } from './components/modal-lista-cartoes';
import { ModalNovoEndereco } from './components/modal-novo-endereco';
import { ModalNovoCartao } from './components/modal-novo-cartao';
import { EnderecoSelecionado, EnderecoCobrancaSelecionado, CartaoSelecionado } from './components/itens-selecionados';
import { Resumo } from './components/resumo';

export default function FormDadosPedido() {
  const [openEndereco, setOpenEndereco] = useState(false);
  const [openEnderecoCobranca, setOpenEnderecoCobranca] = useState(false);
  const [openCartao, setOpenCartao] = useState(false);
  const [openListaEndereco, setOpenListaEndereco] = useState(false);
  const [openListaEnderecoCobranca, setOpenListaEnderecoCobranca] = useState(false);
  const [openListaCartao, setOpenListaCartao] = useState(false);
  const theme = useTheme();
  const methods = useForm();
  const pedidoContext = useContext(PedidoContext);

  return (
    <FormProvider {...methods}>
      <Grid container sx={{ p: 2 }} spacing={3}>
        <Grid item xs={12} md={6}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12} pb={2}>
              <Typography
                fontWeight={'bold'}
                color={theme.palette.primary.dark}
                textAlign={'center'}
                fontSize={20}
                pb={2}
              >
                Endereço de entrega
              </Typography>
              <Stack flexDirection={'row'} justifyContent={'space-around'}>
                <Button
                  color={'secondary'}
                  variant={'outlined'}
                  onClick={() => setOpenListaEndereco(true)}
                  key={'btn_selecionar_endereco'}
                >
                  Selecionar endereço de entrega
                </Button>
                <Button
                  color={'secondary'}
                  variant={'outlined'}
                  onClick={() => setOpenEndereco(true)}
                  key={'btn_add_endereco'}
                >
                  Novo endereço de entrega
                </Button>
              </Stack>
            </Grid>

            {pedidoContext?.endereco && (
              <Grid item xs={12} md={12}>
                <EnderecoSelecionado />
              </Grid>
            )}

            <Divider style={{ width: '100%', borderWidth: 1 }} />

            <Grid item xs={12} md={12} pb={2}>
              <Typography
                fontWeight={'bold'}
                color={theme.palette.primary.dark}
                textAlign={'center'}
                fontSize={20}
                pb={2}
              >
                Endereço de cobrança
              </Typography>
              <Stack flexDirection={'row'} justifyContent={'space-around'}>
                <Button
                  color={'secondary'}
                  variant={'outlined'}
                  onClick={() => setOpenListaEnderecoCobranca(true)}
                  key={'btn_selecionar_endereco_cobranca'}
                >
                  Selecionar endereço de cobrança
                </Button>
                <Button
                  color={'secondary'}
                  variant={'outlined'}
                  onClick={() => setOpenEnderecoCobranca(true)}
                  key={'btn_add_endereco_cobranca'}
                >
                  Novo endereço de cobrança
                </Button>
              </Stack>
            </Grid>

            {pedidoContext?.enderecoCobranca && (
              <Grid item xs={12} md={12}>
                <EnderecoCobrancaSelecionado />
              </Grid>
            )}
            <Divider style={{ width: '100%', borderWidth: 1 }} />
            <Grid item xs={12} md={12}>
              <Typography
                fontWeight={'bold'}
                color={theme.palette.primary.dark}
                textAlign={'center'}
                fontSize={20}
                pb={2}
              >
                Forma de pagamento
              </Typography>
              <Stack flexDirection={'row'} justifyContent={'space-around'}>
                <Button
                  color={'secondary'}
                  variant={'outlined'}
                  onClick={() => setOpenListaCartao(true)}
                  key={'btn_selecionar_pagamento'}
                >
                  Selecionar cartão
                </Button>
                <Button
                  color={'secondary'}
                  variant={'outlined'}
                  onClick={() => setOpenCartao(true)}
                  key={'btn_add_pagamento'}
                >
                  Novo cartão
                </Button>
              </Stack>
            </Grid>
            <Grid item xs={12} md={12} pr={2}>
              <CartaoSelecionado />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={6}>
          <Resumo />
        </Grid>
        <ModalNovoEndereco open={openEndereco} setOpen={setOpenEndereco} />
        <ModalNovoEndereco open={openEnderecoCobranca} setOpen={setOpenEnderecoCobranca} isCobranca />
        <ModalNovoCartao open={openCartao} setOpen={setOpenCartao} />
        <ModalListaEndereco open={openListaEndereco} setOpen={setOpenListaEndereco} />
        <ModalListaEndereco open={openListaEnderecoCobranca} setOpen={setOpenListaEnderecoCobranca} isCobranca />
        <ModalListaCartoes open={openListaCartao} setOpen={setOpenListaCartao} />
      </Grid>
    </FormProvider>
  );
}
