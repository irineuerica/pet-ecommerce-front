import { MRT_ColumnDef, MaterialReactTable } from 'material-react-table';
import React, { useEffect, useMemo, useState } from 'react';
import {
  Container,
  Typography,
  useTheme,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Stack,
  Box,
  Grid,
  Select,
  MenuItem,
} from '@mui/material';
import { MRT_Localization_PT_BR } from 'material-react-table/locales/pt-BR';
import AddIcon from '@mui/icons-material/Add';
import { FormProvider, useForm } from 'react-hook-form';
import { formatMoeda } from '../../../utils/formatMoeda';
import { useCupomQuery } from '@modules/cupons/hooks/react-query/useCupomQuery';
import { CupomInterface } from 'src/interfaces/cupom.interface';
import Lottie from 'lottie-react';
import loadingAnimation from 'src/animations/cat_loading.json';

export default function TableCuponsAdmin() {
  const theme = useTheme();
  const [openNovo, setOpenNovo] = useState(false);
  const { getAllCuponsIsLoading, getAllCupons } = useCupomQuery();
  const [cupons, setCupons] = useState<CupomInterface[]>();

  async function getCupons() {
    const data = await getAllCupons();
    setCupons(data);
  }

  useEffect(() => {
    getCupons();
  }, []);

  const methods = useForm();

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
      },
      {
        accessorKey: 'valor',
        header: 'Valor',
        size: 180,
        Cell: ({ cell }) => formatMoeda(cell.getValue<number>() ?? 0),
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
        <Stack width="70%" direction="row" justifyContent="flex-end" marginLeft="30%">
          <Box display="flex" justifyContent="right">
            <Button variant={'outlined'} startIcon={<AddIcon />} sx={{ mb: 3 }} onClick={() => setOpenNovo(true)}>
              Adicionar novo cupom promocional
            </Button>
          </Box>
        </Stack>
        {getAllCuponsIsLoading || !cupons ? (
          <Lottie animationData={loadingAnimation} loop={true} style={{ height: 400 }} />
        ) : (
          <MaterialReactTable columns={columnsPedidos} data={cupons} localization={MRT_Localization_PT_BR} />
        )}
        <ModalNovo open={openNovo} setOpen={setOpenNovo} />
      </Container>
    </FormProvider>
  );
}

interface ModalProps {
  open: boolean;
  setOpen: (value: boolean) => void;
}

export function ModalNovo({ open, setOpen }: ModalProps) {
  return (
    <Dialog open={open} maxWidth={'md'}>
      <DialogTitle>Novo Cupom</DialogTitle>
      <DialogContent>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField label={'Codigo'} fullWidth />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField label={'Valor'} fullWidth />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)}>Cancelar</Button>
        <Button onClick={() => setOpen(false)}>Salvar</Button>
      </DialogActions>
    </Dialog>
  );
}
