import {
  Card,
  CardContent,
  Container,
  Button,
  Typography,
  useTheme,
  CardHeader,
  Grid,
  CardActions,
  CardMedia,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { formatCurrency, formatMoeda } from '../../utils/formatMoeda';
import { useRouter } from 'next/router';
import { usePedido } from '@modules/pedido/hooks/usePedido';
import { ItemPedido, ListPedidoInterface } from 'src/interfaces/pedidos.interface';
import { StatusById, StatusPedidoEnum } from 'src/constants/enums/status-pedido.enum';

export default function DetalhePedidoSection() {
  const theme = useTheme();
  const router = useRouter();
  const { handleAlterarStatusItem, handleShowPedido } = usePedido();
  const { pedidoId } = router.query;
  const [pedido, setPedido] = useState<ListPedidoInterface>();

  async function getDetails() {
    const pedidoSelecionado = await handleShowPedido({ id: Number(pedidoId) });
    setPedido(pedidoSelecionado);
  }

  useEffect(() => {
    if (pedidoId) {
      getDetails();
    }
  }, [pedidoId]);

  async function solicitarTroca(id: number) {
    const novoStatus = StatusById?.find((status) => status.id === StatusPedidoEnum.TROCA_SOLICITADA);
    if (novoStatus) {
      await handleAlterarStatusItem({ status: novoStatus, id });
      router.reload();
    }
  }

  async function solicitarDevolução(id: number) {
    const novoStatus = StatusById?.find((status) => status.id === StatusPedidoEnum.DEVOLUÇÃO_SOLICITADA);
    if (novoStatus) {
      await handleAlterarStatusItem({ status: novoStatus, id });
      router.reload();
    }
  }

  return (
    <Container>
      {pedido && (
        <>
          <Card>
            <CardContent>
              <Typography>
                <b>Status Pedido:</b> {pedido.status.nome}
              </Typography>
            </CardContent>
          </Card>

          <Typography fontSize={18} fontWeight={'bold'} color={theme.palette.primary.dark} py={4} px={2}>
            Itens do pedido
          </Typography>
          <Grid container spacing={3}>
            {pedido?.itensPedido?.map((item: ItemPedido) => {
              return (
                <Grid item xs={12} md={4}>
                  <Card>
                    <CardMedia
                      component="img"
                      height="150"
                      image={`/assets/products/${item.produto.categoria.id}.png`}
                      alt={`imagem do produto ${item.produto.nome}`}
                    />
                    <CardContent sx={{ minHeight: 200 }}>
                      <Typography>
                        <b>Produto:</b> {item.produto.nome}
                      </Typography>
                      <Typography>
                        <b>Status:</b> {item.status.nome}
                      </Typography>
                      <Typography>
                        <b>Valor:</b> {formatCurrency(item.produto.valor || 0)}
                      </Typography>
                    </CardContent>
                    <CardActions sx={{ pb: 2 }}>
                      <Button
                        variant={'contained'}
                        fullWidth
                        onClick={() => solicitarTroca(item.id)}
                        disabled={item.status.id !== StatusPedidoEnum.ENTREGA_REALIZADA}
                      >
                        Solicitar troca
                      </Button>
                      <Button
                        variant={'contained'}
                        fullWidth
                        onClick={() => solicitarDevolução(item.id)}
                        disabled={item.status.id !== StatusPedidoEnum.ENTREGA_REALIZADA}
                      >
                        Solicitar devolução
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
          <Grid container spacing={3} pt={4}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardHeader title={'Forma de pagamento'}></CardHeader>
                {pedido?.cartoes?.length > 0 &&
                  pedido?.cartoes?.map((cartao) => (
                    <CardContent>
                      <Typography color={theme.palette.common.black} fontSize={16}>
                        {cartao.numero}
                      </Typography>
                      <Typography color={theme.palette.common.black} fontSize={16}>
                        {cartao.nome}
                      </Typography>
                      <Typography color={theme.palette.common.black} fontSize={16}>
                        {/* @ts-ignore */}
                        {cartao.bandeira} - {cartao.vencimento_mes}/{cartao.vencimento_ano}
                      </Typography>
                    </CardContent>
                  ))}

                {pedido?.cupons?.length > 0 &&
                  pedido?.cupons?.map((cupom) => (
                    <CardContent>
                      <Typography color={theme.palette.common.black} fontSize={16} pt={2}>
                        <b>Cupom</b>
                      </Typography>
                      <Typography color={theme.palette.common.black} fontSize={16}>
                        {cupom.codigo} - {formatCurrency(cupom.valor)}
                      </Typography>
                    </CardContent>
                  ))}

                <CardContent>
                  <Typography color={theme.palette.common.black} fontSize={16}>
                    <b>Total:</b> {formatCurrency(pedido.valor || 0)}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card>
                <CardHeader title={'Endereço de entrega'}></CardHeader>
                <CardContent>
                  <Typography color={theme.palette.common.black} fontSize={16}>
                    {pedido.endereco.nome}
                  </Typography>
                  <Typography color={theme.palette.common.black} fontSize={16}>
                    {pedido.endereco.tpLogradouro} {pedido.endereco.logradouro} - {pedido.endereco.numero}
                  </Typography>
                  <Typography color={theme.palette.common.black} fontSize={16}>
                    {pedido.endereco.bairro} - {pedido.endereco.cep}
                  </Typography>
                  <Typography color={theme.palette.common.black} fontSize={16}>
                    {pedido.endereco.cidade} - {pedido.endereco.estado}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </>
      )}
    </Container>
  );
}
