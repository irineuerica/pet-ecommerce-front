import { MRT_ColumnDef, MaterialReactTable } from 'material-react-table';
import React, { useMemo, useState } from 'react';
import {
  Container,
  Typography,
  useTheme,
  Button,
  IconButton,
  Dialog,
  DialogTitle, DialogContent, DialogActions, TextField, Stack, Box, Grid, Select, MenuItem
} from '@mui/material';
import { MRT_Localization_PT_BR } from 'material-react-table/locales/pt-BR';
import { useDialogConfirmation } from 'src/components/dialog-confirmation/DialogConfirmationProvider';
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useRouter } from 'next/router';
import AddIcon from '@mui/icons-material/Add';
import { formatMoeda } from '../../../utils/formatMoeda';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { PATH_ADMIN } from '../../../routes/paths';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { FormInputDate } from '../../../components/FormInputDate';
import { FormInputText } from '../../../components/FormInputText ';
import { FormProvider, useForm } from 'react-hook-form';
export default function TableEstoqueAdmin() {
  const router = useRouter();
  const theme = useTheme();
  const { openDialogConfirmation } = useDialogConfirmation();
  const [open, setOpen] = useState(false)
  const [openNovo, setOpenNovo] = useState(false)
  const methods = useForm();
  const mock = [
    {
      id: 1,
      produto: 'Produto 01',
      grupo: 'Grupo 01',
      quantidadeAtual: 55,
      data: '02/02/2024',
      valor: 50.41,
    },
    {
      id: 2,
      produto: 'Produto 02',
      grupo: 'Grupo 02',
      quantidadeAtual: 20,
      data: '02/02/2024',
      valor: 17.12,
    },
    {
      id: 3,
      produto: 'Produto 03',
      grupo: 'Grupo 03',
      quantidadeAtual: 10,
      data: '02/02/2024',
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
        accessorKey: 'produto', //access nested data with dot notation
        header: 'Produto',
        size: 200,
      },
      {
        accessorKey: 'quantidadeAtual',
        header: 'Quantidade Atual',
        size: 20,
      },
      {
        accessorKey: 'grupo',
        header: 'Grupo de preficificação',
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
            <IconButton onClick={()=>setOpen(true)}><AddCircleOutlineIcon/></IconButton>
            <IconButton onClick={()=>setOpen(true)}><RemoveCircleIcon/></IconButton>
          </Stack>
        )
      },
    ],
    [],
  );
  return (
    <FormProvider {...methods}>
    <Container sx={{ pt: 3 }}>
      <Typography fontWeight={'bold'} fontSize={24} pb={3} color={theme.palette.primary.dark}>
        Estoque
      </Typography>
      <Stack width="70%" direction="row" justifyContent="flex-end" marginLeft="30%">
        <Box display="flex" justifyContent="right">
          <Button
            variant={'outlined'}
            startIcon={<AddIcon />}
            sx={{ mb: 3 }}
            onClick={() => setOpenNovo(true)}
          >
            Adicionar novo estoque
          </Button>
        </Box>
      </Stack>
      <MaterialReactTable
        columns={columnsPedidos}
        data={mock}
        localization={MRT_Localization_PT_BR}

      />
      <ModalNovo open={openNovo} setOpen={setOpenNovo}/>
      <ModalEditar open={open} setOpen={setOpen}/>
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
      <DialogTitle>Gerencia Estoque</DialogTitle>
      <DialogContent>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Select label={'Produtos'} sx={{minWidth: '35%'}} defaultValue={'1'} fullWidth>
              <MenuItem value ='1'>Produto 01</MenuItem>
              <MenuItem value ='1'>Produto 02</MenuItem>
              <MenuItem value ='1'>Produto 03</MenuItem>
              <MenuItem value ='1'>Produto 04</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField label={'Fornecedor'} fullWidth/>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField disabled label={'Grupo de precifição'} value={"Grupo 01"} fullWidth/>
          </Grid>
          <Grid item xs={12} md={6}>
            <FormInputDate name={'data'} label={'Data transação'}/>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField label={'Quantidade'} type={'number'} fullWidth/>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField label={'Valor de custo'} type={'number'} fullWidth/>
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

export function ModalEditar({open, setOpen}: ModalProps){
  return(
    <Dialog open={open} maxWidth={'md'}>
      <DialogTitle>Gerenciar Estoque</DialogTitle>
      <DialogContent>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField disabled label={'Produto'} value={"Produto 01"} fullWidth/>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField label={'Fornecedor'} fullWidth/>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField disabled label={'Grupo de precifição'} value={"Grupo 01"} fullWidth/>
          </Grid>
          <Grid item xs={12} md={6}>
            <FormInputDate name={'data'} label={'Data transação'} />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField label={'Quantidade'} type={'number'} fullWidth/>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField label={'Valor de custo'} type={'number'} fullWidth/>
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

