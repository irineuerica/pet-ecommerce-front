import { MRT_ColumnDef, MaterialReactTable } from 'material-react-table';
import React, { useMemo, useState } from 'react';
import {
  Container,
  Typography,
  useTheme,
  Button,
  IconButton,
  Dialog,
  DialogTitle, DialogContent, DialogActions, TextField, Stack, Box
} from '@mui/material';
import { MRT_Localization_PT_BR } from 'material-react-table/locales/pt-BR';
import { useDialogConfirmation } from 'src/components/dialog-confirmation/DialogConfirmationProvider';
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useRouter } from 'next/router';
import { PATH_ADMIN, PATH_CLIENTE } from '../../../../routes/paths';
import AddIcon from '@mui/icons-material/Add';
import { formatMoeda } from '../../../../utils/formatMoeda';


export default function TableProdutosAdmin() {
  const router = useRouter();
  const theme = useTheme();
  const { openDialogConfirmation } = useDialogConfirmation();
  const [open, setOpen] = useState(false)


  const mock = [
    {
      id: 1,
      nome: 'Produto 01',
      descricao: 'Descrição do produto 1',
      peso: 1,
      marca: 'Marca 01',
      categoria: 2,
      status: true,
      valor: 50.41,
    },
    {
      id: 2,
      nome: 'Produto 02',
      descricao: 'Descrição do produto 2',
      peso: 2,
      marca: 'Marca 02',
      categoria: 1,
      status: true,
      valor: 17.12,
    },
    {
      id: 3,
      nome: 'Produto 03',
      descricao: 'Descrição do produto 3',
      peso: 1,
      marca: 'Marca 03',
      categoria: 3,
      status: false,
      valor: 20.00,
    },
  ]

  const columnsPedidos = useMemo<MRT_ColumnDef<any>[]>(
    () => [
      {
        accessorKey: 'id', //access nested data with dot notation
        header: 'Código',
        size: 20,
      },
      {
        accessorKey: 'descricao', //access nested data with dot notation
        header: 'Descrição',
        size: 200,
      },
      {
        accessorKey: 'peso',
        header: 'Peso',
        size: 20,
      },
      {
        accessorKey: 'marca',
        header: 'Marca',
        size: 180,
      },
      {
        accessorKey: 'valor',
        header: 'Valor de venda',
        size: 180,
        Cell: ({ cell }) =>(formatMoeda(cell.getValue<number>() ?? 0))
      },
      {
        accessorKey: 'status_pedido_id',
        header: 'Status',
        size: 150,
        Cell: ({ cell }) =>(cell.getValue<boolean>() ? 'Ativo' : 'Inativo')
      },
      {
        accessorKey: 'status',
        header: 'Ações',
        size: 200,
        Cell: ({ cell }) => (
          <Stack flexDirection={'row'}>
            <IconButton onClick={()=>router.push(PATH_ADMIN.novo_produto)}><EditIcon/></IconButton>
            {cell.getValue<boolean>() ?
              <IconButton onClick={()=>setOpen(true)}><CheckCircleIcon/></IconButton> :
              <IconButton onClick={()=>setOpen(true)}><CancelIcon/></IconButton>
            }
          </Stack>
        )
      },
    ],
    [],
  );
  return (
    <Container sx={{ pt: 3 }}>
      <Typography fontWeight={'bold'} fontSize={24} pb={3} color={theme.palette.primary.dark}>
        Produtos
      </Typography>
      <Stack width="70%" direction="row" justifyContent="flex-end" marginLeft="30%">
        <Box display="flex" justifyContent="right">
          <Button
            variant={'outlined'}
            startIcon={<AddIcon />}
            sx={{ mb: 3 }}
            onClick={() => router.push(PATH_ADMIN.novo_produto)}
          >
            Adicionar novo produto
          </Button>
        </Box>
      </Stack>
      <MaterialReactTable
        columns={columnsPedidos}
        data={mock}
        localization={MRT_Localization_PT_BR}

      />
      <ModalJustificativa open={open} setOpen={setOpen}/>
    </Container>
  );
}

interface ModalProps {
  open: boolean,
  setOpen: (value: boolean) => void
}

export function ModalJustificativa({open, setOpen}: ModalProps){
  return(
    <Dialog open={open} maxWidth={'md'}>
      <DialogTitle>Alterar Status</DialogTitle>
      <DialogContent>
        <TextField label={"Justificativa"}/>
      </DialogContent>
      <DialogActions>
        <Button onClick={()=>setOpen(false)}>Cancelar</Button>
        <Button onClick={()=>setOpen(false)}>Salvar</Button>
      </DialogActions>
    </Dialog>
  )
}

