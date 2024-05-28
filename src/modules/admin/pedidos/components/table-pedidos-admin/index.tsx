// @ts-nocheck
import { MRT_ColumnDef, MaterialReactTable } from 'material-react-table';
import { useEffect, useMemo, useState } from 'react';
import moment from 'moment';
import { Container, Typography, useTheme, Button } from '@mui/material';
import { MRT_Localization_PT_BR } from 'material-react-table/locales/pt-BR';
import { useDialogConfirmation } from 'src/components/dialog-confirmation/DialogConfirmationProvider';
import { useRouter } from 'next/router';
import { PATH_ADMIN } from '../../../../../routes/paths';
import { formatCurrency, formatMoeda } from '../../../../../utils/formatMoeda';
import { ListPedidoInterface, PedidoInterface } from '../../../../../interfaces/pedidos.interface';
import { usePedido } from '@modules/pedido/hooks/usePedido';
export default function TablePedidosAdmin() {
  const router = useRouter();
  const theme = useTheme();
  const { openDialogConfirmation } = useDialogConfirmation();
  const { handleGetAll } = usePedido();
  const [pedidos, setPedidos] = useState<ListPedidoInterface[]>();

  async function getPedidos() {
    const todosPedidos = await handleGetAll();
    setPedidos(todosPedidos);
  }

  useEffect(() => {
    getPedidos();
  }, []);

  const columnsPedidos = useMemo<MRT_ColumnDef<PedidoInterface>[]>(
    () => [
      {
        accessorKey: 'id', //access nested data with dot notation
        header: 'Pedido',
        size: 20,
      },
      {
        accessorKey: 'usuario.email', //access nested data with dot notation
        header: 'Usuário',
        size: 50,
        Cell: ({ cell }) => cell.getValue<string>(),
      },
      {
        accessorKey: 'data',
        header: 'Data',
        size: 50,
        Cell: ({ cell }) => moment(cell.getValue<string>()).format('DD/MM/YYYY'),
      },
      {
        accessorKey: 'valor', //normal accessorKey
        header: 'Valor',
        size: 50,
        Cell: ({ cell }) => formatCurrency(cell.getValue<number>()),
      },
      {
        accessorKey: 'status.nome',
        header: 'Status',
        size: 150,
        Cell: ({ cell }) => cell.getValue<string>(),
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
                pathname: PATH_ADMIN.detalhe_pedido,
                query: { pedidoId: cell.getValue<number>() },
              });
            }}
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

      {pedidos && (
        <MaterialReactTable
          columns={columnsPedidos}
          data={pedidos}
          localization={MRT_Localization_PT_BR}
          sx={{ width: '100%' }}
        />
      )}
    </Container>
  );
}
