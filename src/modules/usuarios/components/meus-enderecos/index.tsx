import * as React from 'react';
import { EnderecoInterface } from 'src/interfaces/endereco.interface';
import { Box, Button, Card, CardActions, CardContent, CardHeader, Stack } from '@mui/material';
import DetalheMeusEnderecos from './detalhe-meu-endereco';
import AddIcon from '@mui/icons-material/Add';
import { useRouter } from 'next/router';
import { PATH_CLIENTE } from 'src/routes/paths';
import { useEnderecoQuery } from '@modules/usuarios/hooks/react-query/useEnderecoQuery';

export default function MeusEnderecos() {
  const router = useRouter();
  const { enderecos } = useEnderecoQuery();

  return (
    <Card>
      <CardHeader title="Meus endereços" />
      <CardContent>
        {enderecos?.map((endereco: EnderecoInterface) => <DetalheMeusEnderecos endereco={endereco} />)}
      </CardContent>
      <CardActions>
        <Stack width="70%" direction="row" justifyContent="flex-end" marginLeft="30%">
          <Box display="flex" justifyContent="right">
            <Button
              startIcon={<AddIcon />}
              sx={{ mb: 3 }}
              onClick={() => router.push(PATH_CLIENTE.minha_conta.novo_endereco)}
            >
              Adicionar novo endereço
            </Button>
          </Box>
        </Stack>
      </CardActions>
    </Card>
  );
}
