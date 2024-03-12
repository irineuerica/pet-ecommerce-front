import PetsOutlinedIcon from '@mui/icons-material/PetsOutlined';
import { SvgIcon } from '@mui/material';

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
    path: '/customers',
    icon: (
      <SvgIcon fontSize="small">
        <PetsOutlinedIcon />
      </SvgIcon>
    ),
  },
];

export const adminItems = [
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
    title: 'Usuários',
    path: '/admin/usuarios',
    icon: (
      <SvgIcon fontSize="small">
        <PetsOutlinedIcon />
      </SvgIcon>
    ),
  },
];
