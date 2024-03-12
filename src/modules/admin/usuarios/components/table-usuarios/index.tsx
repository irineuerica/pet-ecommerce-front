import { MRT_ColumnDef, MaterialReactTable } from 'material-react-table';
import { useUsuarioQuery } from '@modules/usuarios/hooks/react-query/useUsuarioQuery';
import { useMemo } from 'react';
import { UsuarioInterface } from '@modules/usuarios/interfaces/usuario.type';
import Lottie from 'lottie-react';
import loadingAnimation from 'src/animations/cat_loading.json';
import moment from 'moment';
import { Box, Chip, Container, IconButton, Stack, Tooltip, Typography, useTheme } from '@mui/material';

import { MRT_Localization_PT_BR } from 'material-react-table/locales/pt-BR';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useDialogConfirmation } from 'src/components/dialog-confirmation/DialogConfirmationProvider';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
export default function TableUsuarios() {
  const theme = useTheme();
  const { openDialogConfirmation } = useDialogConfirmation();
  const { handleChangeStatus, handleSetAdmin } = useUsuarioQuery();

  const onChangeStatus = (dadosUsuario: UsuarioInterface) => {
    openDialogConfirmation({
      title: `Atenção`,
      description: 'Deseja alterar o status do usuário?',
      color: 'secondary',
      confirmActionText: 'Alterar',
      onConfirm() {
        handleChangeStatus({ id: dadosUsuario.id ?? 0, status: !dadosUsuario.status });
      },
    });
  };

  const onChangeProfile = (dadosUsuario: UsuarioInterface) => {
    openDialogConfirmation({
      title: `Atenção`,
      description: 'Deseja tornar perfil do usuário administrativo?',
      color: 'secondary',
      confirmActionText: 'Alterar',
      onConfirm() {
        handleSetAdmin({ id: dadosUsuario.id ?? 0 });
      },
    });
  };
  const columnsUsuarios = useMemo<MRT_ColumnDef<UsuarioInterface>[]>(
    () => [
      {
        accessorKey: 'id', //access nested data with dot notation
        header: 'Código',
        size: 50,
      },
      {
        accessorKey: 'nome',
        header: 'Nome',
        size: 250,
      },
      {
        accessorKey: 'email', //normal accessorKey
        header: 'E-mail',
        size: 200,
      },
      {
        accessorKey: 'cpf',
        header: 'CPF',
        size: 150,
      },
      {
        accessorKey: 'genero',
        header: 'Gênero',
        size: 150,
      },

      {
        accessorKey: 'dataNascimento',
        header: 'Data de Nascimento',
        size: 150,
        Cell: ({ cell }) => moment(cell.getValue<string>()).format('DD/MM/YYYY'),
      },

      {
        accessorKey: 'ddd',
        header: 'DDD',
        size: 150,
      },

      {
        accessorKey: 'telefone',
        header: 'Celular',
        size: 150,
      },

      {
        accessorKey: 'isAdmin',
        header: 'Perfil',
        size: 150,
        Cell: ({ cell }) => (
          <Chip
            variant="filled"
            color={cell.getValue() ? 'warning' : 'primary'}
            label={cell.getValue() ? 'Admin' : 'Cliente'}
          />
        ),
      },
      {
        accessorKey: 'status',
        header: 'Status',
        size: 150,
        Cell: ({ cell }) => (
          <Chip
            variant="filled"
            color={cell.getValue() ? 'secondary' : 'error'}
            label={cell.getValue() ? 'Ativo' : 'Inativo'}
          />
        ),
      },
    ],
    [],
  );
  const { usuarios, usuariosIsLoading } = useUsuarioQuery();
  return (
    <Container sx={{ pt: 3 }}>
      <Typography fontWeight={'bold'} fontSize={24} pb={3} color={theme.palette.primary.dark}>
        Usuários
      </Typography>
      {usuariosIsLoading ? (
        <Lottie animationData={loadingAnimation} loop={true} style={{ height: 400 }} />
      ) : (
        <MaterialReactTable
          columns={columnsUsuarios}
          data={usuarios}
          localization={MRT_Localization_PT_BR}
          enableRowActions
          renderRowActions={({ row }) => (
            <Stack flexDirection={'row'}>
              {row.original.isAdmin === false && (
                <Box>
                  <Tooltip title={'Tornar admin'}>
                    <IconButton color="error" onClick={() => onChangeProfile(row.original)}>
                      <AccountCircleIcon color="warning" />
                    </IconButton>
                  </Tooltip>
                </Box>
              )}
              <Box>
                <Tooltip title={row.original.status ? 'Inativar' : 'Ativar'}>
                  <IconButton color="error" onClick={() => onChangeStatus(row.original)}>
                    {row.original.status ? <CancelIcon color="error" /> : <CheckCircleIcon color="secondary" />}
                  </IconButton>
                </Tooltip>
              </Box>
            </Stack>
          )}
        />
      )}
    </Container>
  );
}
