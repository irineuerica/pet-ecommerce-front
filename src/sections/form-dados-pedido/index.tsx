import {
  Grid,
  Typography,
  Stack,
  Button,
  TextField,
  useTheme,
  Divider
} from '@mui/material';
import React, { useState } from 'react';
import { ModalListaCartao, ModalListaEndereco, ModalNovoCartao, ModalNovoEndereco } from './modals';
import { FormProvider, useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';
import { PATH_CLIENTE } from '../../routes/paths';
import { useRouter } from 'next/router';
export default function FormDadosPedido(){
  const [openEndereco, setOpenEndereco] = useState(false);
  const [openCartao, setOpenCartao] = useState(false);
  const [openListaEndereco, setOpenListaEndereco] = useState(false)
  const [openListaCartao, setOpenListaCartao] = useState(false)
  const theme = useTheme()
  const methods = useForm()

  return(
    <FormProvider {...methods}>
      <Grid container sx={{p: 2}} spacing={3}>
        <Grid item xs={12} md={6}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12}>
              <Typography
                fontWeight={'bold'}
                color={theme.palette.primary.dark}
                textAlign={'center'}
                fontSize={20}
                pb={2}
              >Endereço de entrega</Typography>
              <Stack flexDirection={'row'} justifyContent={'space-around'}>
                <Button color={'secondary'} variant={'outlined'} onClick={()=>setOpenListaEndereco(true)}>Selecionar endereço de entrega</Button>
                <Button color={'secondary'} variant={'outlined'} onClick={()=>setOpenEndereco(true)}>
                  Novo endereço de entrega</Button>
              </Stack>
            </Grid>
            <Grid item xs={12} md={12}>
              <EnderecoSelecionado/>
            </Grid>

            <Divider style={{width:'100%', borderWidth: 1}} />

            <Grid item xs={12} md={12}>
              <Typography
                fontWeight={'bold'}
                color={theme.palette.primary.dark}
                textAlign={'center'}
                fontSize={20}
                pb={2}
              >Endereço de cobrança</Typography>
              <Stack flexDirection={'row'} justifyContent={'space-around'}>
                <Button color={'secondary'} variant={'outlined'} onClick={()=>setOpenListaEndereco(true)}>Selecionar endereço de cobrança</Button>
                <Button color={'secondary'} variant={'outlined'} onClick={()=>setOpenEndereco(true)}>Novo endereço de cobrança</Button>
              </Stack>
            </Grid>

            <Grid item xs={12} md={12}>
              <EnderecoSelecionado/>
            </Grid>
            <Divider style={{width:'100%', borderWidth: 1}} />
            <Grid item xs={12} md={12}>
              <Typography
                fontWeight={'bold'}
                color={theme.palette.primary.dark}
                textAlign={'center'}
                fontSize={20}
                pb={2}
              >Forma de pagamento</Typography>
              <Stack flexDirection={'row'} justifyContent={'space-around'}>
                <Button color={'secondary'} variant={'outlined'} onClick={()=>setOpenListaCartao(true)}>Selecionar cartão</Button>
                <Button color={'secondary'} variant={'outlined'} onClick={()=>setOpenCartao(true)}>Novo cartão</Button>
              </Stack>
            </Grid>
            <Grid item xs={12} md={12} pr={2}>
              <CartaoSelecionado/>
            </Grid>
            <Divider style={{width:'100%', borderWidth: 1, marginTop: 4, paddingBottom: 4}} />
            <Grid item xs={12} md={12} pr={2}>
              <CartaoSelecionado/>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={6}>
          <Resumo/>
        </Grid>
        <ModalNovoEndereco open={openEndereco} setOpen={setOpenEndereco}/>
        <ModalNovoCartao open={openCartao} setOpen={setOpenCartao}/>
        <ModalListaEndereco open={openListaEndereco} setOpen={setOpenListaEndereco}/>
        <ModalListaCartao open={openListaCartao} setOpen={setOpenListaCartao}/>
      </Grid>
    </FormProvider>
  )
}

function Resumo(){
  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar();
  const theme = useTheme();
  return(
    <Grid container spacing={3} sx={{pl: 5}}>
      <Grid item lg={12} sm={12} xl={12} xs={12} pb={3}>
        <Typography color={theme.palette.primary.dark} fontWeight={'bold'} fontSize={18}>
          Resumo
        </Typography>
      </Grid>
      <Grid item lg={12} sm={12} xl={12} xs={12}>
        <Typography color={theme.palette.secondary.dark} fontSize={16}>
          <b>Cupom:</b> 9227-aaa - R$10.20
        </Typography>
      </Grid>
      <Grid item lg={12} sm={12} xl={12} xs={12}>
        <Typography color={theme.palette.error.dark} fontSize={16}>
          <b>Frete:</b> R$8.20
        </Typography>
      </Grid>
      <Grid item lg={12} sm={12} xl={12} xs={12}>
        <Typography color={theme.palette.primary.dark} fontSize={16}>
          <b>Subtotal:</b> R$128,36
        </Typography>
      </Grid>
      <Grid item lg={12} sm={12} xl={12} xs={12}>
        <Typography color={theme.palette.primary.dark} fontSize={16}>
          <b>Descontos:</b> R$10.20
        </Typography>
      </Grid>
      <Grid item lg={12} sm={12} xl={12} xs={12}>
        <Typography color={theme.palette.primary.dark} fontSize={16}>
          <b>Total:</b> R$126,36
        </Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <Button variant={'contained'} fullWidth onClick={()=>router.push(PATH_CLIENTE.carrinho)}> Voltar</Button>
      </Grid>
      <Grid item xs={12} md={6}>
        <Button variant={'contained'} fullWidth onClick={()=>{
          enqueueSnackbar('Pedido criado com sucesso!', {
            variant: 'success',
            style: { whiteSpace: 'pre-line' },
            autoHideDuration: 10000,
          })
          router.push(PATH_CLIENTE.meus_pedidos)
        }}> Finalizar pedido</Button>
      </Grid>
    </Grid>
  )
}

function EnderecoSelecionado(){
  const theme = useTheme();
  return(
    <Grid container spacing={3}>
      <Grid item lg={12} sm={12} xl={12} xs={12} pb={3}>
        <Typography color={theme.palette.primary.dark} fontSize={16}>
          Casa
        </Typography>
        <Typography color={theme.palette.primary.dark} fontSize={16}>
          Rua Teste - 687
        </Typography>
        <Typography color={theme.palette.primary.dark} fontSize={16}>
          Bairro dos testes - 08888-666
        </Typography>
        <Typography color={theme.palette.primary.dark} fontSize={16}>
          Suzano - SP
        </Typography>
      </Grid>
    </Grid>
  )
}

function CartaoSelecionado(){
  const theme = useTheme();
  return(
    <Grid container>
      <Grid item lg={12} sm={12} xl={12} xs={12} pb={3}>
        <Typography color={theme.palette.primary.dark} fontSize={16}>
          **** **** **** 0401
        </Typography>
        <Typography color={theme.palette.primary.dark} fontSize={16}>
          Mastercard - 10/2025
        </Typography>
        <Typography color={theme.palette.primary.dark} fontSize={16}>
          R$59,08
        </Typography>
      </Grid>
      <Grid item xs={12} md={3} pr={2}>
        <TextField size={'small'} label={'CVV'}/>
      </Grid>
    </Grid>
  )
}