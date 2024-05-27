import PedidoContext from '@modules/pedido/contexts/PedidoContext';
import { useCartaoQuery } from '@modules/usuarios/hooks/react-query/useCartaoQuery';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
  Typography,
  DialogActions,
  Button,
  useTheme,
  Card,
  CardContent,
  Stack,
} from '@mui/material';
import { useContext } from 'react';

interface ModalProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  isCobranca?: boolean;
}
export function ModalListaCartoes({ open, setOpen }: ModalProps) {
  const theme = useTheme();
  const { cartoes } = useCartaoQuery();
  const pedidoContext = useContext(PedidoContext);

  return (
    <Dialog open={open} maxWidth={'md'} fullWidth>
      <DialogTitle>Cartões</DialogTitle>
      <DialogContent>
        <Grid container spacing={3}>
          {cartoes?.map((cartao) => (
            <Grid item xs={12} md={4} lg={4}>
              <Card sx={{justifyContent: 'center'}}>
                <CardContent>
                  <Typography color={theme.palette.primary.dark} fontSize={16}>
                    {cartao.numero}
                  </Typography>
                  <Typography color={theme.palette.primary.dark} fontSize={16}>
                    {cartao.bandeira} - {cartao.vencimentoMes}/ {cartao.vencimentoAno}
                  </Typography>

                  <Stack sx={{ justifyContent: 'center' }}>
                    <Button
                      onClick={() => {
                        pedidoContext?.adicionarCartao(cartao);
                        setOpen(false);
                      }}
                      sx={{
                        textAlign: 'center',
                        mt: 4,
                        backgroundColor: theme.palette.secondary.light,
                        color: theme.palette.secondary.dark,
                        '&:hover': {
                          backgroundColor: theme.palette.secondary.light,
                          color: theme.palette.secondary.dark,
                        },
                      }}
                      color="primary"
                    >
                      Selecionar
                    </Button>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)}>Fechar</Button>
      </DialogActions>
    </Dialog>
  );
}
