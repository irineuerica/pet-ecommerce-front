// @ts-nocheck
import { MRT_ColumnDef, MaterialReactTable } from 'material-react-table';
import React, { useEffect, useMemo, useState } from 'react';
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
  Grid,
  Select,
  MenuItem,
  Chip,
} from '@mui/material';
import { MRT_Localization_PT_BR } from 'material-react-table/locales/pt-BR';
import { useDialogConfirmation } from 'src/components/dialog-confirmation/DialogConfirmationProvider';
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useRouter } from 'next/router';
import AddIcon from '@mui/icons-material/Add';
import { formatCurrency, formatMoeda } from '../../../utils/formatMoeda';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { PATH_ADMIN } from '../../../routes/paths';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { FormInputDate } from '../../../components/FormInputDate';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useEstoque } from '@modules/estoque/hooks/useEstoque';
import moment from 'moment';
import { EstoqueFormInterface, EstoqueInterface } from 'src/interfaces/estoque.interface';
import { useProduto } from '@modules/produtos/hooks/useProduto';
import { FormSelect, FormSelectOptions } from 'src/components/FormSelect';
import { FormInputText } from 'src/components/FormInputText ';
import { LoadingButton } from '@mui/lab';
export default function TableEstoqueAdmin() {
  const router = useRouter();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [estoqueSelecionado, setEstoqueSelecionado] = useState();
  const [operacaoSelecionada, setOperacaoSelecionada] = useState();

  function limparSelecionado() {
    setEstoqueSelecionado(null);
  }

  const methods = useForm();
  const { estoques, isLoading } = useEstoque();

  const columnsPedidos = useMemo<MRT_ColumnDef<any>[]>(
    () => [
      {
        accessorKey: 'id', //access nested data with dot notation
        header: 'Código',
        size: 20,
      },
      {
        accessorKey: 'produto.nome', //access nested data with dot notation
        header: 'Produto',
        size: 200,
      },
      {
        accessorKey: 'quantidadeAtual',
        header: 'Quantidade Atual',
        size: 20,
      },
      {
        accessorKey: 'custo',
        header: 'Ult. valor de custo',
        size: 50,
        Cell: ({ cell }) => formatCurrency(cell.getValue<number>() ?? 0),
      },
      {
        accessorKey: 'produto.valor',
        header: 'Valor de venda',
        size: 50,
        Cell: ({ cell }) => formatCurrency(cell.getValue<number>() ?? 0),
      },
      {
        accessorKey: 'dataEntrada',
        header: 'Ult. data entrada',
        size: 150,
        Cell: ({ cell }) => moment(cell.getValue<string>()).format('DD/MM/YYYY'),
      },
      {
        accessorKey: 'dataSaida',
        header: 'Ult. data saída',
        size: 150,
        Cell: ({ cell }) => moment(cell.getValue<string>()).format('DD/MM/YYYY'),
      },
      {
        accessorKey: 'produto.status',
        header: 'Status',
        size: 150,
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
        size: 200,
        Cell: ({ row }) => (
          <Stack flexDirection={'row'}>
            <IconButton
              onClick={() => {
                setEstoqueSelecionado(row.original);
                console.log(row.original);
                setOperacaoSelecionada('ENTRADA');
                setOpen(true);
              }}
            >
              <AddCircleOutlineIcon color="success" />
            </IconButton>
            <IconButton
              onClick={() => {
                setEstoqueSelecionado(row.original);
                setOperacaoSelecionada('SAIDA');
                setOpen(true);
              }}
            >
              <RemoveCircleIcon color="error" />
            </IconButton>
          </Stack>
        ),
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
            <Button variant={'outlined'} startIcon={<AddIcon />} sx={{ mb: 3 }} onClick={() => setOpen(true)}>
              Adicionar novo estoque
            </Button>
          </Box>
        </Stack>
        <MaterialReactTable columns={columnsPedidos} data={estoques} localization={MRT_Localization_PT_BR} />
        <ModalFormEstoque
          open={open}
          setOpen={setOpen}
          estoque={estoqueSelecionado}
          operacao={operacaoSelecionada}
          limparSelecionado={limparSelecionado}
        />
      </Container>
    </FormProvider>
  );
}

interface ModalProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  limparSelecionado: () => void;
  estoque?: EstoqueInterface;
  operacao?: 'ENTRADA' | 'SAIDA';
}

export function ModalFormEstoque({ open, setOpen, estoque, operacao, limparSelecionado }: ModalProps) {
  const methods = useForm();
  const { todosProdutos } = useProduto();
  const isEdit = estoque ? true : false;
  const {
    gruposPrecificacao,
    handleCriarEstoque,
    handleCriarEstoqueIsLoading,
    handleAlterarEstoque,
    handleAlterarEstoqueIsLoading,
  } = useEstoque();
  const [opcoesProdutos, setOpcoesProdutos] = useState<FormSelectOptions>();
  const [opcoesGruposPrecificacao, setOpcoesGruposPrecificacao] = useState<FormSelectOptions>();

  const submitEstoque: SubmitHandler<EstoqueFormInterface> = async (estoqueData) => {
    try {
      if (estoque) {
        await handleAlterarEstoque(estoqueData);
      } else {
        await handleCriarEstoque(estoqueData);
      }
      setOpen(false);
    } catch (err) {
      throw err;
    } finally {
      methods.reset();
      limparSelecionado();
    }
  };

  useEffect(() => {
    if (todosProdutos) {
      setOpcoes();
    }
    if (gruposPrecificacao) {
      setOpcoes();
    }
  }, [todosProdutos, gruposPrecificacao]);

  useEffect(() => {
    if (estoque) {
      methods.reset({
        precificacao: estoque.produto.precificacao.id,
        fornecedor: estoque.fornecedor,
        produto: estoque.produto.id,
        operacao,
      });
      setOpcoes();
    }
  }, [estoque]);

  function setOpcoes() {
    if (todosProdutos) {
      if (estoque) {
        const opcoes = todosProdutos?.map((produto) => {
          return { value: produto.id || 0, label: produto.nome };
        });
        setOpcoesProdutos(opcoes);
      } else {
        const produtosSemEstoque = todosProdutos.filter((produto) => !produto.estoque);
        const opcoes = produtosSemEstoque?.map((produto) => {
          return { value: produto.id || 0, label: produto.nome };
        });
        setOpcoesProdutos(opcoes);
      }
    }

    if (gruposPrecificacao) {
      const opcoes = gruposPrecificacao.map((grupo) => {
        return { value: grupo.id, label: `${grupo.nome} - ${grupo.porcentagem}%` };
      });
      setOpcoesGruposPrecificacao(opcoes);
    }
  }

  return (
    <FormProvider {...methods}>
      <Dialog open={open} maxWidth={'md'}>
        <DialogTitle>Gerencia Estoque</DialogTitle>
        <DialogContent>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <FormSelect name="produto" disabled={isEdit} options={opcoesProdutos || []} label="Produtos" />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormInputText name="fornecedor" label="Fornecedor" fullWidth />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormSelect
                name="precificacao"
                disabled={isEdit}
                options={opcoesGruposPrecificacao || []}
                label="Grupo de precifição"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormInputDate name="data" label={'Data transação'} maxDate={new Date()} />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormInputText name="quantidade" label="Quantidade" type="number" fullWidth />
            </Grid>
            {operacao !== 'SAIDA' && (
              <Grid item xs={12} md={6}>
                <FormInputText name="custo" label={'Valor de custo'} type="number" fullWidth />
              </Grid>
            )}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              methods.reset();
              limparSelecionado();
              setOpen(false);
            }}
            color="error"
          >
            Cancelar
          </Button>
          <LoadingButton
            loading={handleCriarEstoqueIsLoading || handleAlterarEstoqueIsLoading}
            onClick={() => {
              // @ts-ignore
              methods.handleSubmit(submitEstoque, (e) => {
                console.error(e);
              })();
            }}
            color="success"
          >
            Salvar
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </FormProvider>
  );
}
