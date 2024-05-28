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
  Stack,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { formatCurrency } from '../../../utils/formatMoeda';
import { FormSelect } from '../../../components/FormSelect';
import { StatusPedidoOption } from '../../../utils/options/form.options';
import { FormProvider, useForm } from 'react-hook-form';
import { usePedido } from '@modules/pedido/hooks/usePedido';
import { useRouter } from 'next/router';
import { StatusById, StatusPedidoEnum } from 'src/constants/enums/status-pedido.enum';
import { ItemPedido, ListPedidoInterface } from 'src/interfaces/pedidos.interface';

export default function DetalhePedidoAdminSection() {
  const theme = useTheme();
  const methods = useForm();
  const router = useRouter();
  const { handleAlterarStatusItem, handleShowPedido, handleAlterarStatusPedido, handleTrocaDevolucao } = usePedido();
  const { pedidoId } = router?.query;
  const [pedido, setPedido] = useState<ListPedidoInterface>();

  async function getDetails() {
    const pedidoSelecionado = await handleShowPedido({ id: Number(pedidoId) });
    methods.setValue('status', pedido?.status.id);
    setPedido(pedidoSelecionado);
  }

  useEffect(() => {
    if (pedidoId) {
      getDetails();
    }
  }, [pedidoId]);

  async function alterarStatus() {
    const statusId = methods.getValues('status');
    const novoStatus = StatusById?.find((status) => status.id === Number(statusId));

    if (novoStatus && pedido && pedido.id) {
      await handleAlterarStatusPedido({ status: novoStatus, id: pedido.id });
      router.reload();
    }
  }

  async function aprovarTroca(item: ItemPedido) {
    const novoStatus = StatusById?.find((status) => status.id === StatusPedidoEnum.TROCA_AUTORIZADA);
    if (novoStatus && pedido && pedido.id) {
      await handleAlterarStatusItem({ status: novoStatus, id: item.id });
      router.reload();
    }
  }

  async function recusarTroca(item: ItemPedido) {
    const novoStatus = StatusById?.find((status) => status.id === StatusPedidoEnum.TROCA_REJEITADA);
    if (novoStatus && pedido && pedido.id) {
      await handleAlterarStatusItem({ status: novoStatus, id: item.id });
      router.reload();
    }
  }

  async function aprovarDevolucao(item: ItemPedido) {
    const novoStatus = StatusById?.find((status) => status.id === StatusPedidoEnum.DEVOLUÇÃO_AUTORIZADA);
    if (novoStatus && pedido && pedido.id) {
      await handleAlterarStatusItem({ status: novoStatus, id: item.id });
      router.reload();
    }
  }

  async function recusarDevolucao(item: ItemPedido) {
    const novoStatus = StatusById?.find((status) => status.id === StatusPedidoEnum.DEVOLUÇÃO_REJEITADA);
    if (novoStatus && pedido && pedido.id) {
      await handleAlterarStatusItem({ status: novoStatus, id: item.id });
      router.reload();
    }
  }

  async function trocaEfetuada(item: ItemPedido) {
    const novoStatus = StatusById?.find((status) => status.id === StatusPedidoEnum.TROCA_EFETUADA);
    if (novoStatus && pedido && pedido.id) {
      await handleTrocaDevolucao({ status: novoStatus, id: item.id });
      router.reload();
    }
  }

  async function devolucaoEfetuada(item: ItemPedido) {
    const novoStatus = StatusById?.find((status) => status.id === StatusPedidoEnum.DEVOLUÇÃO_EFETUADA);
    if (novoStatus && pedido && pedido.id) {
      await handleTrocaDevolucao({ status: novoStatus, id: item.id });
      router.reload();
    }
  }

  return (
    <Container>
      <FormProvider {...methods}>
        {pedido && (
          <>
            <Card>
              <CardContent>
                <Typography>
                  <b>Status Pedido:</b> {pedido.status.nome}
                </Typography>
              </CardContent>
              <Stack flexDirection={'row'} p={2}>
                <FormSelect name={'status'} options={StatusPedidoOption} label="Status" />
                <Button sx={{ ml: 5 }} variant={'contained'} onClick={() => alterarStatus()}>
                  Salvar
                </Button>
              </Stack>
            </Card>

            <Typography fontSize={18} fontWeight={'bold'} color={theme.palette.primary.dark} py={4} px={2}>
              Itens do pedido
            </Typography>
            <Grid container spacing={3}>
              {pedido?.itensPedido?.map((item) => (
                <Grid item xs={12} md={4}>
                  <Card sx={{ minHeight: 200 }}>
                    <CardContent>
                      <Typography>
                        <b>Produto:</b> {item.produto.nome}
                      </Typography>
                      <Typography>
                        <b>Status:</b> {item.status.nome}
                      </Typography>
                      <Typography>
                        <b>Valor:</b> {formatCurrency(item.produto.valor)}
                      </Typography>
                    </CardContent>
                    {item.status.id === StatusPedidoEnum.TROCA_SOLICITADA && (
                      <CardActions sx={{ pb: 2 }}>
                        <Button color={'error'} variant={'contained'} fullWidth onClick={() => recusarTroca(item)}>
                          Recusar troca
                        </Button>
                        <Button color={'success'} variant={'contained'} fullWidth onClick={() => aprovarTroca(item)}>
                          Aceitar troca
                        </Button>
                      </CardActions>
                    )}
                    {item.status.id === StatusPedidoEnum.TROCA_AUTORIZADA && (
                      <CardActions sx={{ pb: 2 }}>
                        <Button color={'warning'} variant={'contained'} fullWidth onClick={() => trocaEfetuada(item)}>
                          Concluir troca
                        </Button>
                      </CardActions>
                    )}
                    {item.status.id === StatusPedidoEnum.DEVOLUÇÃO_SOLICITADA && (
                      <CardActions sx={{ pb: 2 }}>
                        <Button color={'error'} variant={'contained'} fullWidth onClick={() => recusarDevolucao(item)}>
                          Recusar devolução
                        </Button>
                        <Button
                          color={'success'}
                          variant={'contained'}
                          fullWidth
                          onClick={() => aprovarDevolucao(item)}
                        >
                          Aceitar devolução
                        </Button>
                      </CardActions>
                    )}
                    {item.status.id === StatusPedidoEnum.DEVOLUÇÃO_AUTORIZADA && (
                      <CardActions sx={{ pb: 2 }}>
                        <Button
                          color={'warning'}
                          variant={'contained'}
                          fullWidth
                          onClick={() => devolucaoEfetuada(item)}
                        >
                          Concluir devolução
                        </Button>
                      </CardActions>
                    )}
                  </Card>
                </Grid>
              ))}
            </Grid>

            <Card sx={{ mt: 4 }}>
              <CardHeader title={'Dados do usuário'}></CardHeader>
              <CardContent>
                <Typography color={theme.palette.common.black} fontSize={16} pb={1}>
                  <b>Nome: </b> Usuário Cliente Teste
                </Typography>
                <Typography color={theme.palette.common.black} fontSize={16} pb={1}>
                  <b>E-mail: </b>usuario@teste.com
                </Typography>
                <Typography color={theme.palette.common.black} fontSize={16} pb={1}>
                  <b>CPF:</b> 111.751.000-88
                </Typography>
                <Typography color={theme.palette.common.black} fontSize={16}>
                  <b>Sexo:</b> Feminino
                </Typography>
              </CardContent>
            </Card>

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
                      <b>Total:</b> {formatCurrency(pedido.valor)}
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
      </FormProvider>
    </Container>
  );
}
