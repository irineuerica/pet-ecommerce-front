import NextLink from 'next/link';
import { Box, Link, Stack, Typography } from '@mui/material';
import CadastroUsuarioContent from '@modules/auth/cadastro-usuario';

export default function CadastroSection() {
  return (
    <Box
      sx={{
        flex: '1 1 auto',
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          maxWidth: '80%',
          px: 3,
          width: '100%',
        }}
      >
        <Stack spacing={1} sx={{ mb: 3 }}>
          <Typography variant="h4">Cadastro</Typography>
          <Typography color="text.secondary" variant="body2">
            Já possui uma conta? &nbsp;
            <Link component={NextLink} href="/auth/login" underline="hover" variant="subtitle2">
              Logar
            </Link>
          </Typography>
        </Stack>
        <Stack spacing={3}>
          <CadastroUsuarioContent />
        </Stack>
      </Box>
    </Box>
  );
}
