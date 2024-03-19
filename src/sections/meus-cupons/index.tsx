import { MRT_ColumnDef, MaterialReactTable } from 'material-react-table';
import React, { useMemo } from 'react';
import {
  Container,
  Typography,
  useTheme,
} from '@mui/material';
import { MRT_Localization_PT_BR } from 'material-react-table/locales/pt-BR';

import { FormProvider, useForm } from 'react-hook-form';
import { formatMoeda } from '../../utils/formatMoeda';

export default function TableMeusCupons() {
  const theme = useTheme();
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
      codigo: '2104-kqn',
      tipo: 'Promocional',
      pedido_origem_id: 2,
      cliente_id: 88,
      valor: 15.00,
      status: true,
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
        accessorKey: 'valor',
        header: 'Valor',
        size: 180,
        Cell: ({ cell }) =>(formatMoeda(cell.getValue<number>() ?? 0))
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
        <MaterialReactTable
          columns={columnsPedidos}
          data={mock}
          localization={MRT_Localization_PT_BR}
        />
      </Container>
    </FormProvider>
  );
}

