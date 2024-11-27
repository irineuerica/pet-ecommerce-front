"use client";
import dynamic from 'next/dynamic';
const Lottie = dynamic(() => import('lottie-react'), { ssr: false });
import { MRT_ColumnDef, MaterialReactTable } from 'material-react-table';
import React, { useMemo } from 'react';
import { Container, Typography, useTheme } from '@mui/material';
import { MRT_Localization_PT_BR } from 'material-react-table/locales/pt-BR';
import { FormProvider, useForm } from 'react-hook-form';
import { formatCurrency } from '../../utils/formatMoeda';
import { useCupomQuery } from '@modules/cupons/hooks/react-query/useCupomQuery';
import loadingAnimation from 'src/animations/cat_loading.json';

export default function TableMeusCupons() {
  const theme = useTheme();
  const methods = useForm();
  const { cupons, cuponsIsloading } = useCupomQuery();

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
        Cell: ({ cell }) => formatCurrency(cell.getValue<number>() ?? 0),
      },
      {
        accessorKey: 'status',
        header: 'Status',
        size: 180,
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
        {cuponsIsloading || !cupons ? (
          <Lottie animationData={loadingAnimation} loop={true} style={{ height: 400 }} />
        ) : (
          <MaterialReactTable columns={columnsPedidos} data={cupons} localization={MRT_Localization_PT_BR} />
        )}
      </Container>
    </FormProvider>
  );
}
