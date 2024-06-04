import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  Divider,
  Button,
  useTheme,
  CardHeader,
  Avatar,
} from '@mui/material';
import React, { useContext, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { useRouter } from 'next/router';
import { PATH_CLIENTE } from '../../routes/paths';
import { ItemCarrinhoInterface } from 'src/interfaces/carrinho.interface';
import { formatCurrency } from 'src/utils/formatMoeda';
import PedidoContext from '@modules/pedido/contexts/PedidoContext';
import { CupomInterface } from 'src/interfaces/cupom.interface';

const MeuCarrinhoSection = () => {
  const theme = useTheme();
  const router = useRouter();
  const [cupom, setCupom] = useState('');
  const pedidoContext = useContext(PedidoContext);

  return (
    <Container maxWidth={false}>
      <Grid container spacing={3}>
        <Grid item lg={7} sm={7} xl={7} xs={12}>
          <Grid container spacing={3}>
            <Grid item lg={12} sm={12} xl={12} xs={12}>
              <Typography color={theme.palette.primary.dark} fontWeight={'bold'} fontSize={20} pb={2}>
                Carrinho
              </Typography>
              {pedidoContext?.carrinho?.itens?.length === 0 ? (
                <Typography
                  color={theme.palette.warning.main}
                  fontWeight={'bold'}
                  fontSize={20}
                  sx={{ textAlign: 'center', py: 10 }}
                >
                  Carrinho vazio :/
                </Typography>
              ) : (
                <>
                  {pedidoContext?.carrinho?.itens?.map((item, index) => (
                    <ItemCarrinho item={item} disabled={false} index={index} key={`produto_${index}`} />
                  ))}
                </>
              )}
              <Divider />
            </Grid>
            <Grid item lg={12} sm={12} xl={12} xs={12}>
              <Typography color={theme.palette.error.main} fontWeight={'bold'} fontSize={20}>
                Itens removidos do carrinho (tempo máximo)
              </Typography>
              {pedidoContext?.itensCancelados?.itens?.map((item: ItemCarrinhoInterface, index: number) => (
                <ItemCarrinho item={item} disabled={true} key={`produto_excluido_${index}`} index={index} />
              ))}
              <Divider />
            </Grid>
            <Grid item lg={12} sm={12} xl={12} xs={12} mt={10}>
              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <TextField
                    key={'input_cupom'}
                    name="cupom"
                    id="cupom"
                    label="Cupom"
                    fullWidth
                    value={cupom}
                    onChange={(value) => setCupom(value.target.value)}
                  />
                </Grid>
                <Grid item xs={2}>
                  <Button onClick={() => pedidoContext?.adicionarCupom(cupom)} key={'adicionar_cupom'}>
                    Adicionar
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item lg={5} sm={5} xl={5} xs={12}>
          <Resumo />
        </Grid>
      </Grid>
      <Grid item lg={12} sm={12} xl={12} xs={12}>
        <Grid container spacing={3} pb={3}>
          <Grid item xs={7} />
          <Grid item xs={3}>
            <Button variant="contained" key={'btn_add_produtos'} onClick={() => router.push('/')}>
              Adicionar mais produtos
            </Button>
          </Grid>
          <Grid item xs={2}>
            <Button
              key={'btn_continuar'}
              variant="contained"
              onClick={() => router.push(PATH_CLIENTE.dados_pedido)}
              disabled={pedidoContext?.carrinho?.itens?.length === 0}
            >
              Continuar
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default MeuCarrinhoSection;

interface ItemCarrinhoProps {
  item: ItemCarrinhoInterface;
  disabled: boolean;
  index: number;
}

export function ItemCarrinho({ item, disabled = false, index }: ItemCarrinhoProps) {
  const theme = useTheme();
  const pedidoContext = useContext(PedidoContext);
  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Grid container spacing={1}>
          <Grid item xs={1}>
            <Avatar src={`/assets/products/${item.produto.categoria.id}.png`} />
          </Grid>
          <Grid item xs={6}>
            <Typography color={theme.palette.primary.dark}>{item?.produto?.nome}</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography color={theme.palette.primary.dark}>R${item?.produto?.valor}</Typography>
          </Grid>
          {disabled === false && (
            <>
              <Grid item xs={2}>
                <TextField
                  key={`input_qtde_item_${index}`}
                  label="Quantidade"
                  type="number"
                  id="qtde"
                  value={item?.quantidade}
                  onChange={(value) => {
                    pedidoContext?.alterarQuantidade(item?.produto?.id || 0, Number(value.target.value));
                  }}
                  InputProps={{
                    inputProps: {
                      max: item?.produto?.estoque?.quantidadeAtual,
                      min: 0,
                    },
                  }}
                />
              </Grid>
              <Grid item xs={1}>
                <DeleteIcon
                  color="error"
                  onClick={() => pedidoContext?.deletarItem(item?.produto?.id || 0)}
                  key={`btn_remove_${index}`}
                />
              </Grid>
            </>
          )}
        </Grid>
      </CardContent>
    </Card>
  );
}

export function Resumo() {
  const theme = useTheme();
  const pedidoContext = useContext(PedidoContext);

  return (
    <Card>
      <CardHeader title="Resumo" sx={{ color: theme.palette.primary.dark }} />
      <CardContent>
        <Grid container spacing={3}>
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
            <Typography color={theme.palette.secondary.dark} fontSize={16}>
              <b>Descontos:</b> {formatCurrency(pedidoContext?.desconto || 0)}
            </Typography>
          </Grid>
          <Grid item lg={12} sm={12} xl={12} xs={12}>
            <Typography color={theme.palette.primary.dark} fontSize={16}>
              <b>Total:</b> {formatCurrency(pedidoContext?.total || 0)}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
