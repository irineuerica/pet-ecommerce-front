import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import PropTypes from 'prop-types';
import { Box, Divider, Drawer, Stack, Theme, Typography, useMediaQuery, useTheme } from '@mui/material';
import { Logo } from 'src/components/logo';
import { Scrollbar } from 'src/components/scrollbar';
import { items, adminItems } from './config';
import { SideNavItem } from './side-nav-item';
import { useEffect, useState } from 'react';
import { UsuarioInterface } from '@modules/usuarios/interfaces/usuario.interface';
import { useRouter } from 'next/router';

export const SideNav = (props: { open: boolean; onClose: any }) => {
  const theme = useTheme();
  const router = useRouter();
  const { open, onClose } = props;
  const pathname = usePathname();
  const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'));
  const [usuario, setUsuario] = useState<UsuarioInterface>({
    nome: '',
    genero: '',
    dataNascimento: new Date(),
    cpf: '',
    ddd: '',
    telefone: '',
    email: '',
    senha: '',
    isAdmin: false,
    status: true,
  });

  useEffect(() => {
    const localUsuario = getStoredUser();
    setUsuario({ ...localUsuario });
  }, []);

  function getStoredUser() {
    if (typeof window !== 'undefined') {
      const UsuarioLocalStorage = localStorage.getItem('usuario');
      if (UsuarioLocalStorage !== null) {
        try {
          const usuarioData = JSON.parse(UsuarioLocalStorage);
          return usuarioData;
        } catch (error) {
          console.error(error);
        }
      }
    }
    return [];
  }

  const content = (
    <Scrollbar
      sx={{
        height: '100%',
        '& .simplebar-content': {
          height: '100%',
        },
        '& .simplebar-scrollbar:before': {
          background: 'neutral.400',
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
        }}
      >
        <Box sx={{ p: 3 }}>
          <Box
            sx={{
              alignItems: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.04)',
              borderRadius: 1,
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'start',
              mt: 2,
              p: '12px',
            }}
          >
            <Box
              component={NextLink}
              href="/"
              sx={{
                display: 'inline-flex',
                height: 32,
                width: 32,
              }}
            >
              <Logo />
            </Box>
            <div>
              <Typography
                color={theme.palette.primary.main}
                variant="subtitle1"
                pl={2}
                onClick={() => router.push('/')}
              >
                LIRO PET SHOP
              </Typography>
            </div>
          </Box>
        </Box>
        <Box
          component="nav"
          sx={{
            flexGrow: 1,
            px: 2,
            py: 3,
          }}
        >
          <Stack
            component="ul"
            spacing={0.5}
            sx={{
              listStyle: 'none',
              p: 0,
              m: 0,
            }}
          >
            {usuario.isAdmin ? (
              <>
                {adminItems.map((item) => {
                  const active = item.path ? pathname === item.path : false;

                  return (
                    <SideNavItem
                      active={active}
                      // disabled={item.disabled}
                      // external={item.external}
                      icon={item.icon}
                      key={item.title}
                      path={item.path}
                      title={item.title}
                    />
                  );
                })}
              </>
            ) : (
              <>
                {items.map((item) => {
                  const active = item.path ? pathname === item.path : false;

                  return (
                    <SideNavItem
                      active={active}
                      // disabled={item.disabled}
                      // external={item.external}
                      icon={item.icon}
                      key={item.title}
                      path={item.path}
                      title={item.title}
                    />
                  );
                })}
              </>
            )}
          </Stack>
        </Box>
        <Divider sx={{ borderColor: 'neutral.700' }} />
      </Box>
    </Scrollbar>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: theme.palette.primary.darker,
            color: 'common.white',
            width: 280,
          },
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: 'neutral.800',
          color: 'common.white',
          width: 280,
        },
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};

SideNav.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
};
