import PedidoContext from '@modules/pedido/contexts/PedidoContext';
import { Grid, Typography, CardContent, Card, useTheme } from '@mui/material';
import { useContext } from 'react';
import { CartaoInterface } from 'src/interfaces/cartao.interface';
import { formatCurrency } from 'src/utils/formatMoeda';

export function EnderecoSelecionado() {
  const theme = useTheme();
  const pedidoContext = useContext(PedidoContext);
  return (
    <Card>
      <CardContent>
        <Typography color={theme.palette.primary.dark} fontSize={16}>
          {pedidoContext?.endereco?.nome}
        </Typography>
        <Typography color={theme.palette.primary.dark} fontSize={16}>
          {pedidoContext?.endereco?.tpLogradouro} {pedidoContext?.endereco?.logradouro}{' '}
          {pedidoContext?.endereco?.numero}
        </Typography>
        <Typography color={theme.palette.primary.dark} fontSize={16}>
          {pedidoContext?.endereco?.bairro} {pedidoContext?.endereco?.cep}
        </Typography>
        <Typography color={theme.palette.primary.dark} fontSize={16}>
          {pedidoContext?.endereco?.cidade} {pedidoContext?.endereco?.estado}
        </Typography>
      </CardContent>
    </Card>
  );
}

export function EnderecoCobrancaSelecionado() {
  const theme = useTheme();
  const pedidoContext = useContext(PedidoContext);
  return (
    <Card>
      <CardContent>
        <Typography color={theme.palette.primary.dark} fontSize={16}>
          {pedidoContext?.enderecoCobranca?.nome}
        </Typography>
        <Typography color={theme.palette.primary.dark} fontSize={16}>
          {pedidoContext?.enderecoCobranca?.tpLogradouro} {pedidoContext?.enderecoCobranca?.logradouro}{' '}
          {pedidoContext?.enderecoCobranca?.numero}
        </Typography>
        <Typography color={theme.palette.primary.dark} fontSize={16}>
          {pedidoContext?.enderecoCobranca?.bairro} {pedidoContext?.enderecoCobranca?.cep}
        </Typography>
        <Typography color={theme.palette.primary.dark} fontSize={16}>
          {pedidoContext?.enderecoCobranca?.cidade} {pedidoContext?.enderecoCobranca?.estado}
        </Typography>
      </CardContent>
    </Card>
  );
}

export function CartaoSelecionado() {
  const theme = useTheme();
  const pedidoContext = useContext(PedidoContext);
  const totalCartao = pedidoContext?.calculaTotalPorCartao();
  return (
    <Grid container spacing={2}>
      {pedidoContext?.pagamento?.cartoes?.map((cartao: CartaoInterface) => (
        <Grid item lg={6} sm={12} xl={6} xs={12} pb={2}>
          <Card>
            <CardContent>
              <Typography color={theme.palette.primary.dark} fontSize={16}>
                {cartao?.numero}
              </Typography>
              <Typography color={theme.palette.primary.dark} fontSize={16}>
                {cartao?.nome}
              </Typography>
              <Typography color={theme.palette.primary.dark} fontSize={16}>
                {cartao?.bandeira} - {cartao.vencimentoMes}/{cartao.vencimentoAno}
              </Typography>
              <Typography color={theme.palette.primary.dark} fontSize={16}>
                {formatCurrency(totalCartao || 0)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
