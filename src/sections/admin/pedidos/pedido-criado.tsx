import React from 'react';
import { Container, Button, Typography, Stack } from '@mui/material';

import { useRouter } from 'next/router';

import Lottie from 'lottie-react';
import orderAnimation from 'src/animations/cat_order.json';
import { PATH_CLIENTE } from 'src/routes/paths';

export default function CriacaoPedido() {
  const router = useRouter();
  const { pedidoId } = router?.query;

  return (
    <Container>
      <Stack justifyContent={'center'} alignItems={'center'}>
        <Lottie animationData={orderAnimation} loop={true} style={{ height: 400, marginTop: 25 }} />
        <Typography textAlign={'center'} color={'primary'} fontWeight={'bold'} fontSize={24}>
          Pedido #{pedidoId} criado com sucesso!
        </Typography>
        <Button
          color="secondary"
          variant="contained"
          sx={{ mt: 5 }}
          onClick={() => {
            router.push({
              pathname: PATH_CLIENTE.detalhe_pedido,
              query: { pedidoId },
            });
          }}
        >
          Ver detalhes do pedido
        </Button>
      </Stack>
    </Container>
  );
}
