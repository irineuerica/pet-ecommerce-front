import { MRT_ColumnDef, MaterialReactTable } from 'material-react-table';
import React, { useMemo, useState } from 'react';
import {
  Container,
  Typography,
  useTheme,
  Button,

  Dialog,
  DialogTitle, DialogContent, DialogActions, TextField, Stack, Box, Grid, Select, MenuItem
} from '@mui/material';
import { MRT_Localization_PT_BR } from 'material-react-table/locales/pt-BR';

import AddIcon from '@mui/icons-material/Add';

import { FormProvider, useForm } from 'react-hook-form';
import { formatMoeda } from '../../../utils/formatMoeda';
export default function TableCuponsAdmin() {
  const theme = useTheme();
  const [openNovo, setOpenNovo] = useState(false)
  const methods = useForm();
  const mock = [
    {
      codigo: '9227-aaa',
      tipo: 'Troca',
      pedido_origem_id: 1,
      cliente_id: 1,
      valor: 50.5,
      status: true,
    },
    {
      codigo: '9087-jqz',
      tipo: 'Troca',
      pedido_origem_id: 1,
      cliente_id: 13,
      valor: 10.99,
      status: false,
    },
    {
      codigo: '2104-kqn',
      tipo: 'Promocional',
      pedido_origem_id: 2,
      cliente_id: 88,
      valor: 15.00,
      status: true,
    },
    {
      codigo: '8224-hrg',
      tipo: 'Troca',
      pedido_origem_id: 3,
      cliente_id: 31,
      valor: 100.45,
      status: false,
    },
    {
      codigo: '4352-mof',
      tipo: 'Promocional',
      pedido_origem_id: 4,
      cliente_id: 7,
      valor: 10.99,
      status: false,
    },
    {
      codigo: '4578-tfl',
      tipo: 'Troca',
      pedido_origem_id: 5,
      cliente_id: 21,
      valor: 44.98,
      status: false,
    },
  ]

  const columnsPedidos = useMemo<MRT_ColumnDef<any>[]>(
    () => [
      {
        accessorKey: 'codigo', //access nested data with dot notation
        header: 'Código',
        size: 20,
      },
      {
        accessorKey: 'tipo', //access nested data with dot notation
        header: 'Tipo',
        size: 200,
      },
      {
        accessorKey: 'codigo',
        header: 'Cliente',
        size: 20,
        Cell: ({ cell }) =>('usuario@teste.com')
      },
      {
        accessorKey: 'valor',
        header: 'Valor',
        size: 180,
        Cell: ({ cell }) =>(formatMoeda(cell.getValue<number>() ?? 0))
      },
      {
        accessorKey: 'status',
        header: 'Status',
        size: 180,
        Cell: ({ cell }) =>(cell.getValue<boolean>() ? 'Ativo' : 'Inativo')
      },
    ],
    [],
  );
  return (
    <FormProvider {...methods}>
      <Container sx={{ pt: 3 }}>
        <Typography fontWeight={'bold'} fontSize={24} pb={3} color={theme.palette.primary.dark}>
          Cupons
        </Typography>
        <Stack width="70%" direction="row" justifyContent="flex-end" marginLeft="30%">
          <Box display="flex" justifyContent="right">
            <Button
              variant={'outlined'}
              startIcon={<AddIcon />}
              sx={{ mb: 3 }}
              onClick={() => setOpenNovo(true)}
            >
              Adicionar novo cupom promocional
            </Button>
          </Box>
        </Stack>
        <MaterialReactTable
          columns={columnsPedidos}
          data={mock}
          localization={MRT_Localization_PT_BR}
        />
        <ModalNovo open={openNovo} setOpen={setOpenNovo}/>
      </Container>
    </FormProvider>
  );
}

interface ModalProps {
  open: boolean,
  setOpen: (value: boolean) => void
}

export function ModalNovo({open, setOpen}: ModalProps){
  return(
    <Dialog open={open} maxWidth={'md'}>
      <DialogTitle>Novo Cupom</DialogTitle>
      <DialogContent>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField label={'Codigo'} fullWidth/>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField label={'Valor'} fullWidth/>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={()=>setOpen(false)}>Cancelar</Button>
        <Button onClick={()=>setOpen(false)}>Salvar</Button>
      </DialogActions>
    </Dialog>
  )
}


