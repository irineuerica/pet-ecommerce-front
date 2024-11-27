"use client";
import dynamic from 'next/dynamic';
const Lottie = dynamic(() => import('lottie-react'), { ssr: false });
import { MRT_ColumnDef, MaterialReactTable } from 'material-react-table';
import { useMemo } from 'react';
import moment from 'moment';
import { Container, Typography, useTheme, Button } from '@mui/material';
import { MRT_Localization_PT_BR } from 'material-react-table/locales/pt-BR';
import { formatMoeda } from '../../../../utils/formatMoeda';
import { PedidoInterface } from '../../../../interfaces/pedidos.interface';
import { PATH_CLIENTE } from '../../../../routes/paths';
import { useRouter } from 'next/router';
import { usePedido } from '@modules/pedido/hooks/usePedido';
import loadingAnimation from 'src/animations/cat_loading.json';

export default function TablePedidos() {
  const router = useRouter();
  const theme = useTheme();
  const { pedidos, pedidosIsLoading } = usePedido();

  const columnsPedidos = useMemo<MRT_ColumnDef<PedidoInterface>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'Pedido',
        size: 50,
      },
      {
        accessorKey: 'data',
        header: 'Data',
        size: 250,
        Cell: ({ cell }) => moment(cell.getValue<string>()).format('DD/MM/YYYY'),
      },
      {
        accessorKey: 'valor', //normal accessorKey
        header: 'Valor',
        size: 200,
        Cell: ({ cell }) => formatMoeda(cell.getValue<number>()),
      },
      {
        accessorKey: 'status.nome',
        header: 'Status',
        size: 150,
        Cell: ({ cell }) => cell.getValue<number>(),
      },
      {
        accessorKey: 'id',
        header: 'Ações',
        size: 150,
        Cell: ({ cell }) => (
          <Button
            variant={'contained'}
            onClick={() => {
              router.push({
                pathname: PATH_CLIENTE.detalhe_pedido,
                query: { pedidoId: cell.getValue<number>() },
              });
            }}
            key={`btn_detalhes_${cell.id}`}
          >
            Ver detalhes
          </Button>
        ),
      },
    ],
    [],
  );
  return (
    <Container sx={{ pt: 3 }}>
      <Typography fontWeight={'bold'} fontSize={24} pb={3} color={theme.palette.primary.dark}>
        Pedidos
      </Typography>
      {pedidosIsLoading || !pedidos ? (
        <Lottie animationData={loadingAnimation} loop={true} style={{ height: 400 }} />
      ) : (
        <MaterialReactTable columns={columnsPedidos} data={pedidos} localization={MRT_Localization_PT_BR} />
      )}
    </Container>
  );
}
