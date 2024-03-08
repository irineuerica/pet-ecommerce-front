import * as React from 'react';
import { EnderecoInterface } from 'src/interfaces/endereco.interface';
import { Box, Button, Card, CardActions, CardContent, CardHeader, Stack } from '@mui/material';
import DetalheMeusEnderecos from './detalhe-meu-endereco';
import AddIcon from '@mui/icons-material/Add';

export default function MeusEnderecos() {
  const mockData: EnderecoInterface[] = [
    {
      id: 0,
      tpResidencia: 'Casa',
      tpLogradouro: 'Rua',
      logradouro: 'Rua abc',
      numero: '888',
      nome: 'Casa',
      bairro: 'Bairro 1',
      cep: '10000000',
      cidade: 'Suzano',
      estado: 'São Paulo',
      observacao: 'obs',
      cobranca: true,
      entrega: true,
    },
    {
      id: 1,
      tpResidencia: 'Casa',
      tpLogradouro: 'Rua',
      logradouro: 'Rua abc',
      numero: '888',
      nome: 'Casa',
      bairro: 'Bairro 1',
      cep: '10000000',
      cidade: 'Suzano',
      estado: 'São Paulo',
      observacao: 'obs',
      cobranca: true,
      entrega: true,
    },
  ];
  return (
    <Card>
      <CardHeader title="Meus endereços" />
      <CardContent>
        {mockData.map((endereco: EnderecoInterface) => (
          <DetalheMeusEnderecos endereco={endereco} />
        ))}
      </CardContent>
      <CardActions>
        <Stack width="70%" direction="row" justifyContent="flex-end" marginLeft="30%">
          <Box display="flex" justifyContent="right">
            <Button startIcon={<AddIcon />} sx={{ mb: 3 }}>
              Adicionar novo endereço
            </Button>
          </Box>
        </Stack>
      </CardActions>
    </Card>
  );
}
