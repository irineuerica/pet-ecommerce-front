import { MRT_ColumnDef, MaterialReactTable } from 'material-react-table';
import { useMemo } from 'react';
import moment from 'moment';
import {  Container, Typography, useTheme, Button } from '@mui/material';
import { MRT_Localization_PT_BR } from 'material-react-table/locales/pt-BR';
import { useDialogConfirmation } from 'src/components/dialog-confirmation/DialogConfirmationProvider';

import { useRouter } from 'next/router';
import { PATH_ADMIN, PATH_CLIENTE } from '../../../../../routes/paths';
import { StatusById } from '../../../../../constants/enums/status-pedido.enum';
import { formatMoeda } from '../../../../../utils/formatMoeda';
import { PedidoInterface } from '../../../../../interfaces/pedidos.interface';
export default function TablePedidosAdmin() {
  const router = useRouter();
  const theme = useTheme();
  const { openDialogConfirmation } = useDialogConfirmation();

  const mock = [
    {
      id: 1,
      data: '2023-11-13',
      enderecos_id: 5,
      frete_id: 17,
      status_pedido_id: 6,
      usuario_id: 1,
      valor: 14.53,
    },
    {
      id: 2,
      data: '2024-01-06',
      enderecos_id: 0,
      frete_id: 19,
      status_pedido_id: 6,
      usuario_id: 13,
      valor: 51.49,
    },
    {
      id: 3,
      data: '2024-01-16',
      enderecos_id: 3,
      frete_id: 27,
      status_pedido_id: 13,
      usuario_id: 6,
      valor: 58.11,
    },
  ]

  const columnsPedidos = useMemo<MRT_ColumnDef<PedidoInterface>[]>(
    () => [
      {
        accessorKey: 'id', //access nested data with dot notation
        header: 'Pedido',
        size: 50,
      },
      {
        accessorKey: 'id', //access nested data with dot notation
        header: 'Usuário',
        size: 50,
        Cell: ({ cell }) => 'usuario@teste.com'
      },
      {
        accessorKey: 'id',
        header: 'CPF usuário',
        size: 50,
        Cell: ({ cell }) => '111.751.000-88'
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
        Cell: ({ cell }) =>formatMoeda(cell.getValue<number>()),
      },
      {
        accessorKey: 'status_pedido_id',
        header: 'Status',
        size: 150,
        Cell: ({ cell }) =>(StatusById.find((status) => status.id === cell.getValue<number>())?.nome),
      },
      {
        accessorKey: 'id',
        header: 'Ações',
        size: 150,
        Cell: ({ cell }) => (
          <Button variant={'contained'} onClick={()=>router.push(PATH_ADMIN.detalhe_pedido)}>Ver detalhes</Button>
        )
      },
    ],
    [],
  );
  return (
    <Container sx={{ pt: 3 }}>
      <Typography fontWeight={'bold'} fontSize={24} pb={3} color={theme.palette.primary.dark}>
        Pedidos
      </Typography>

      <MaterialReactTable
        columns={columnsPedidos}
        data={mock}
        localization={MRT_Localization_PT_BR}

      />
    </Container>
  );
}
