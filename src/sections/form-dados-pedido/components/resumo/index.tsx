import PedidoContext from '@modules/pedido/contexts/PedidoContext';
import { Grid, Typography, Button, useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import { useContext } from 'react';
import { CupomInterface } from 'src/interfaces/cupom.interface';
import { PATH_CLIENTE } from 'src/routes/paths';
import { formatCurrency } from 'src/utils/formatMoeda';

export function Resumo() {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const theme = useTheme();
  const pedidoContext = useContext(PedidoContext);
  const enable =
    pedidoContext?.endereco &&
    pedidoContext.enderecoCobranca &&
    (pedidoContext?.pagamento?.cartoes?.length > 0 || pedidoContext?.pagamento?.cupons?.length > 0);

  return (
    <Grid container spacing={3} sx={{ pl: 5 }}>
      <Grid item lg={12} sm={12} xl={12} xs={12} pb={3}>
        <Typography color={theme.palette.primary.dark} fontWeight={'bold'} fontSize={18}>
          Resumo
        </Typography>
      </Grid>
      <Grid item lg={12} sm={12} xl={12} xs={12}>
        <Typography color={theme.palette.secondary.dark} fontSize={16}>
          <b>Cupom:</b>
        </Typography>
        {pedidoContext?.pagamento?.cupons?.map((cupom: CupomInterface) => (
          <Typography color={theme.palette.secondary.dark} fontSize={16}>
            {cupom.codigo} - {formatCurrency(cupom.valor)}
          </Typography>
        ))}
      </Grid>
      <Grid item lg={12} sm={12} xl={12} xs={12}>
        <Typography color={theme.palette.primary.dark} fontSize={16}>
          <b>Subtotal:</b> {formatCurrency(pedidoContext?.subtotal || 0)}
        </Typography>
      </Grid>
      <Grid item lg={12} sm={12} xl={12} xs={12}>
        <Typography color={theme.palette.primary.dark} fontSize={16}>
          <b>Descontos:</b> {formatCurrency(pedidoContext?.desconto || 0)}
        </Typography>
      </Grid>
      <Grid item lg={12} sm={12} xl={12} xs={12}>
        <Typography color={theme.palette.error.dark} fontSize={16}>
          <b>Frete:</b> {formatCurrency(pedidoContext?.frete || 0)}
        </Typography>
      </Grid>
      <Grid item lg={12} sm={12} xl={12} xs={12}>
        <Typography color={theme.palette.primary.dark} fontSize={16}>
          <b>Total:</b> {formatCurrency(pedidoContext?.total || 0)}
        </Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <Button variant={'contained'} fullWidth onClick={() => router.push(PATH_CLIENTE.carrinho)}>
          {' '}
          Voltar
        </Button>
      </Grid>
      <Grid item xs={12} md={6}>
        <Button
          disabled={!enable}
          variant={'contained'}
          fullWidth
          onClick={() => {
            pedidoContext?.salvarPedido();
            router.push(PATH_CLIENTE.meus_pedidos);
          }}
        >
          Finalizar pedido
        </Button>
      </Grid>
    </Grid>
  );
}
