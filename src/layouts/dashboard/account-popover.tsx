import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';
import { MenuItem, MenuList, Popover } from '@mui/material';
import { PATH_AUTH, PATH_CLIENTE } from 'src/routes/paths';
import { useAuth } from '@modules/auth/login/contexts/authContext';

export const AccountPopover = (props: { anchorEl: any; onClose: any; open: any }) => {
  const { anchorEl, onClose, open } = props;
  const { handleLogout, authenticated } = useAuth();
  const router = useRouter();

  const handleSignOut = useCallback(() => {
    onClose?.();
    handleLogout();
    router.push(PATH_AUTH.login);
  }, [onClose, router]);

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: 'left',
        vertical: 'bottom',
      }}
      onClose={onClose}
      open={open}
      PaperProps={{ sx: { width: 200 } }}
    >
      <MenuList
        disablePadding
        dense
        sx={{
          p: '8px',
          '& > *': {
            borderRadius: 1,
          },
        }}
      >
        <MenuItem
          onClick={() => {
            if (authenticated) {
              router.push(PATH_CLIENTE.minha_conta.root);
            } else {
              router.push(PATH_AUTH.login);
            }
          }}
        >
          {authenticated ? 'Minha conta' : 'Logar'}
        </MenuItem>
        <MenuItem onClick={handleSignOut}>Sair</MenuItem>
      </MenuList>
    </Popover>
  );
};

AccountPopover.propTypes = {
  anchorEl: PropTypes.any,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
};
