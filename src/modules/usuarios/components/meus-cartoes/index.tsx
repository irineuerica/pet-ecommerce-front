import * as React from 'react';
import { Box, Button, Card, CardActions, CardContent, CardHeader, Stack } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useRouter } from 'next/router';
import { PATH_CLIENTE } from 'src/routes/paths';
import { useCartaoQuery } from '@modules/usuarios/hooks/react-query/useCartaoQuery';
import { CartaoInterface } from 'src/interfaces/cartao.interface';
import DetalheMeusCartoes from './detalhe-meu-cartao';

export default function MeusCartoes() {
  const router = useRouter();
  const { cartoes } = useCartaoQuery();

  return (
    <Card>
      <CardHeader title="Meus cartões" />
      <CardContent>
        {cartoes?.map((cartao: CartaoInterface) => <DetalheMeusCartoes cartao={cartao} />)}
      </CardContent>
      <CardActions>
        <Stack width="70%" direction="row" justifyContent="flex-end" marginLeft="30%">
          <Box display="flex" justifyContent="right">
            <Button
              startIcon={<AddIcon />}
              sx={{ mb: 3 }}
              onClick={() => router.push(PATH_CLIENTE.minha_conta.novo_cartao)}
            >
              Adicionar novo cartão
            </Button>
          </Box>
        </Stack>
      </CardActions>
    </Card>
  );
}
