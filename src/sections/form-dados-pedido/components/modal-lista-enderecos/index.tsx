import PedidoContext from '@modules/pedido/contexts/PedidoContext';
import { useEnderecoQuery } from '@modules/usuarios/hooks/react-query/useEnderecoQuery';
import {
  Dialog,
  DialogActions,
  DialogTitle,
  Button,
  DialogContent,
  Grid,
  Typography,
  useTheme,
  Card,
  CardContent,
  CardActionArea,
  Stack,
} from '@mui/material';
import React, { useContext } from 'react';

interface ModalProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  isCobranca?: boolean;
}

export function ModalListaEndereco({ open, setOpen, isCobranca = false }: ModalProps) {
  const theme = useTheme();
  const { enderecos } = useEnderecoQuery();
  const pedidoContext = useContext(PedidoContext);
  return (
    <Dialog open={open} maxWidth={'md'} fullWidth>
      <DialogTitle>Endereços</DialogTitle>
      <DialogContent>
        <Grid container spacing={3}>
          {enderecos?.map((endereco) => (
            <Grid item xs={12} md={6} lg={6}>
              <Card>
                <CardContent>
                  <Typography color={theme.palette.primary.dark} fontSize={16}>
                    {endereco.nome}
                  </Typography>
                  <Typography color={theme.palette.primary.dark} fontSize={16}>
                    {endereco.logradouro} - {endereco.numero}
                  </Typography>
                  <Typography color={theme.palette.primary.dark} fontSize={16}>
                    {endereco.bairro} - {endereco.cep}
                  </Typography>
                  <Typography color={theme.palette.primary.dark} fontSize={16}>
                    {endereco.cidade} - {endereco.estado}
                  </Typography>
                  <Stack sx={{ justifyContent: 'center' }}>
                    <Button
                      onClick={() => {
                        if (isCobranca) {
                          pedidoContext?.setEnderecoCobranca(endereco);
                        } else {
                          pedidoContext?.setEndereco(endereco);
                        }
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
