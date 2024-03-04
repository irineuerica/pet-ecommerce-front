import EmojiNatureOutlinedIcon from '@mui/icons-material/EmojiNatureOutlined';
import PetsOutlinedIcon from '@mui/icons-material/PetsOutlined';
import { SvgIcon } from '@mui/material';

export const items = [
  {
    title: 'Pagina inicial',
    path: '/',
    icon: (
      <SvgIcon fontSize="small">
        <EmojiNatureOutlinedIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Meus Pedidos',
    path: '/customers',
    icon: (
      <SvgIcon fontSize="small">
        <PetsOutlinedIcon />
      </SvgIcon>
    )
  },
];
