import PetsOutlinedIcon from '@mui/icons-material/PetsOutlined';
import { SvgIcon } from '@mui/material';
import { PATH_ADMIN, PATH_CLIENTE } from '../../routes/paths';

export const items = [
  {
    title: 'Pagina inicial',
    path: '/',
    icon: (
      <SvgIcon fontSize="small">
        <PetsOutlinedIcon />
      </SvgIcon>
    ),
  },
  {
    title: 'Meus Pedidos',
    path: PATH_CLIENTE.meus_pedidos,
    icon: (
      <SvgIcon fontSize="small">
        <PetsOutlinedIcon />
      </SvgIcon>
    ),
  },
  {
    title: 'Meus cupons',
    path: PATH_CLIENTE.meus_cupons,
    icon: (
      <SvgIcon fontSize="small">
        <PetsOutlinedIcon />
      </SvgIcon>
    ),
  },
  {
    title: 'Ajuda',
    path: PATH_CLIENTE.ajuda,
    icon: (
      <SvgIcon fontSize="small">
        <PetsOutlinedIcon />
      </SvgIcon>
    ),
  },
];

export const adminItems = [
  {
    title: 'Dashboard',
    path: PATH_ADMIN.dashboard,
    icon: (
      <SvgIcon fontSize="small">
        <PetsOutlinedIcon />
      </SvgIcon>
    ),
  },
  {
    title: 'Pedidos',
    path: PATH_ADMIN.pedidos,
    icon: (
      <SvgIcon fontSize="small">
        <PetsOutlinedIcon />
      </SvgIcon>
    ),
  },
  {
    title: 'Usuários',
    path: PATH_ADMIN.usuarios,
    icon: (
      <SvgIcon fontSize="small">
        <PetsOutlinedIcon />
      </SvgIcon>
    ),
  },
  {
    title: 'Produtos',
    path: PATH_ADMIN.produtos,
    icon: (
      <SvgIcon fontSize="small">
        <PetsOutlinedIcon />
      </SvgIcon>
    ),
  },
  {
    title: 'Estoque',
    path: PATH_ADMIN.estoque,
    icon: (
      <SvgIcon fontSize="small">
        <PetsOutlinedIcon />
      </SvgIcon>
    ),
  },
  {
    title: 'Cupons',
    path: PATH_ADMIN.cupons,
    icon: (
      <SvgIcon fontSize="small">
        <PetsOutlinedIcon />
      </SvgIcon>
    ),
  },
];
