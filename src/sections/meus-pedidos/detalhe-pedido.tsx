import {
  Card,
  CardContent,
  Container,
  Button,
  Typography,
  useTheme,
  CardHeader,
  Grid,
  CardActions
} from '@mui/material';
import React, { useState } from 'react';
import { formatMoeda } from '../../utils/formatMoeda';

export default function DetalhePedidoSection(){
  const theme = useTheme()

  const mock = [
    {
      id: 1,
      nome: 'orci',
      descricao:
        'Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci.',
      valor: 158.77,
      categoria_id: 2,
    },
    {
      id: 2,
      nome: 'metus sapien',
      descricao: 'Integer non velit. Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue.',
      valor: 30.41,
      categoria_id: 4,
    },
  ];
  return(
    <Container>
      <Card>
        <CardContent>
          <Typography>
            <b>Status Pedido:</b> 	Entrega realizada
          </Typography>
        </CardContent>
      </Card>

      <Typography fontSize={18} fontWeight={'bold'} color={theme.palette.primary.dark} py={4} px={2}>
        Itens do pedido
      </Typography>
      <Grid container spacing={3}>
        {mock?.map((item: any) => {
          return(
            <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography><b>Produto:</b> {item.nome}</Typography>
                <Typography><b>Quantidade:</b> 1</Typography>
                <Typography><b>Valor:</b> {formatMoeda(item.valor)}</Typography>
              </CardContent>
              <CardActions>
                <Button variant={'contained'} fullWidth>Solicitar troca</Button>
              </CardActions>
            </Card>
            </Grid>
          )})}
      </Grid>
      <Grid container spacing={3} pt={4}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title={'Forma de pagamento'}></CardHeader>
            <CardContent>
              <Typography color={theme.palette.common.black} fontSize={16}>
                **** **** **** 0401
              </Typography>
              <Typography color={theme.palette.common.black} fontSize={16}>
                Mastercard - 10/2025
              </Typography>
              <Typography color={theme.palette.common.black} fontSize={16}>
                R$59,08
              </Typography>
            </CardContent>
            <CardContent>
              <Typography color={theme.palette.common.black} fontSize={16}>
                **** **** **** 1012
              </Typography>
              <Typography color={theme.palette.common.black} fontSize={16}>
                Visa - 03/2028
              </Typography>
              <Typography color={theme.palette.common.black} fontSize={16}>
                R$59,08
              </Typography>
              <Typography color={theme.palette.common.black} fontSize={16} pt={2}>
                <b>Cupom:</b> 9227-aaa - R$10.20
              </Typography>
            </CardContent>
            <CardContent>
              <Typography color={theme.palette.common.black} fontSize={16}>
                <b>Total:</b> R$126,36
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title={'Endereço de entrega'}></CardHeader>
            <CardContent>
              <Typography color={theme.palette.common.black} fontSize={16}>
                Casa
              </Typography>
              <Typography color={theme.palette.common.black} fontSize={16}>
                Rua Teste - 687
              </Typography>
              <Typography color={theme.palette.common.black} fontSize={16}>
                Bairro dos testes - 08888-666
              </Typography>
              <Typography color={theme.palette.common.black} fontSize={16}>
                Suzano - SP
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  )
}