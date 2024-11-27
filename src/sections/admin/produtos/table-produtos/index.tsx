"use client";
import dynamic from 'next/dynamic';
const Lottie = dynamic(() => import('lottie-react'), { ssr: false });
import { MRT_ColumnDef, MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import React, { useMemo, useState } from 'react';
import {
  Container,
  Typography,
  useTheme,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Stack,
  Box,
  Tooltip,
  Chip,
} from '@mui/material';
import { MRT_Localization_PT_BR } from 'material-react-table/locales/pt-BR';
import { useDialogConfirmation } from 'src/components/dialog-confirmation/DialogConfirmationProvider';
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useRouter } from 'next/router';
import { PATH_ADMIN } from '../../../../routes/paths';
import AddIcon from '@mui/icons-material/Add';
import { formatCurrency, formatMoeda } from '../../../../utils/formatMoeda';
import { useProduto } from '@modules/produtos/hooks/useProduto';
import { ProdutoInterface } from 'src/interfaces/produtos.interface';
import { LoadingButton } from '@mui/lab';
import loadingAnimation from 'src/animations/cat_loading.json';
export default function TableProdutosAdmin() {
  const router = useRouter();
  const theme = useTheme();
  const { openDialogConfirmation } = useDialogConfirmation();
  const { todosProdutos, todosProdutosIsLoading } = useProduto();
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState();

  const columnsPedidos = useMemo<MRT_ColumnDef<any>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'Código',
        size: 15,
      },
      {
        accessorKey: 'nome',
        header: 'Produto',
        size: 200,
      },
      {
        accessorKey: 'precificacao.nome',
        header: 'Grupo precificação',
        size: 20,
      },
      {
        accessorKey: 'precificacao.porcentagem',
        header: 'Precificação (%)',
        size: 20,
      },
      {
        accessorKey: 'valor',
        header: 'Valor de venda',
        size: 20,
        Cell: ({ cell }) => formatCurrency(cell.getValue<number>() ?? 0),
      },
      {
        accessorKey: 'motivoAtivacao',
        header: 'Motivo ativação',
        size: 50,
      },
      {
        accessorKey: 'motivoInativacao',
        header: 'Motivo inativação',
        size: 50,
      },
      {
        accessorKey: 'status',
        header: 'Status',
        size: 20,
        Cell: ({ cell }) => (
          <Chip
            label={cell.getValue<boolean>() ? 'Ativo' : 'Inativo'}
            color={cell.getValue<boolean>() ? 'success' : 'error'}
          />
        ),
      },
      {
        accessorKey: 'status',
        header: 'Ações',
        size: 50,
        Cell: ({ cell, row }) => (
          <Stack flexDirection={'row'}>
            <IconButton
              onClick={() => {
                router.push({
                  pathname: PATH_ADMIN.form_produto,
                  query: { produto: row.original.id },
                });
              }}
            >
              <EditIcon />
            </IconButton>
            {cell.getValue<boolean>() ? (
              <IconButton
                onClick={() => {
                  const values = row.original;
                  setSelectedProduct(values);
                  setOpen(true);
                }}
              >
                <Tooltip title="Inativar produto">
                  <CancelIcon
                    color="error"
                    onClick={() => {
                      const values = row.original;
                      setSelectedProduct(values);
                      setOpen(true);
                    }}
                  />
                </Tooltip>
              </IconButton>
            ) : (
              <IconButton onClick={() => setOpen(true)}>
                <Tooltip title="Ativar produto">
                  <CheckCircleIcon
                    color="success"
                    onClick={() => {
                      const values = row.original;
                      setSelectedProduct(values);
                      setOpen(true);
                    }}
                  />
                </Tooltip>
              </IconButton>
            )}
          </Stack>
        ),
      },
    ],
    [],
  );
  return (
    <Container sx={{ pt: 3 }}>
      <Typography fontWeight={'bold'} fontSize={24} pb={3} color={theme.palette.primary.dark}>
        Produtos
      </Typography>
      <Stack width="100%" direction="row" justifyContent="flex-end">
        <Box display="flex" justifyContent="right">
          <Button
            variant={'outlined'}
            startIcon={<AddIcon />}
            sx={{ mb: 3 }}
            onClick={() => {
              router.push(PATH_ADMIN.form_produto);
            }}
          >
            Adicionar novo produto
          </Button>
        </Box>
      </Stack>
      {todosProdutosIsLoading ? (
        <Lottie animationData={loadingAnimation} loop={true} style={{ height: 400 }} />
      ) : (
        <MaterialReactTable
          columns={columnsPedidos}
          data={todosProdutos}
          localization={MRT_Localization_PT_BR}
          enableFullScreenToggle={true}
        />
      )}
      <ModalJustificativa open={open} setOpen={setOpen} produto={selectedProduct} />
    </Container>
  );
}

interface ModalProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  produto: ProdutoInterface;
}

export function ModalJustificativa({ open, setOpen, produto }: ModalProps) {
  const [justificativa, setJustificativa] = useState('');
  const { handleAlterarProduto, handleAlterarProdutoIsLoading } = useProduto();

  async function updateStatus() {
    produto.status = !produto.status;
    if (produto.status) {
      produto.motivoAtivacao = justificativa;
    } else {
      produto.motivoInativacao = justificativa;
    }
    await handleAlterarProduto(produto);
  }

  return (
    <Dialog open={open} fullWidth maxWidth={'sm'}>
      <DialogTitle color="secondary">Alterar Status</DialogTitle>
      <DialogContent sx={{ mt: 4 }}>
        <TextField
          label={'Justificativa'}
          onChange={(text) => setJustificativa(text.target.value)}
          fullWidth
          minRows={4}
        />
      </DialogContent>
      <DialogActions>
        <Button
          color="error"
          onClick={() => {
            setOpen(false);
          }}
        >
          Cancelar
        </Button>
        <LoadingButton
          color="success"
          loading={handleAlterarProdutoIsLoading}
          onClick={() => {
            updateStatus();
            setOpen(false);
          }}
          disabled={!justificativa}
        >
          Salvar
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}
