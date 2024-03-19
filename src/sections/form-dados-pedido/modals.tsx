import {
  Dialog,
  DialogActions,
  DialogTitle,
  Button,
  DialogContent,
  Grid,
  Typography,
  useTheme, Checkbox
} from '@mui/material';
import CardDadosCartao from '@modules/usuarios/components/meus-cartoes/card-dados-cartao';
import React from 'react';
import CardDadosEndereco from '@modules/usuarios/components/meus-enderecos/card-dados-endereco';

interface ModalProps {
  open: boolean,
  setOpen: (value: boolean) => void
}

export function ModalNovoEndereco({open, setOpen}: ModalProps){
  return(
    <Dialog open={open} maxWidth={'md'}>
      <DialogTitle>Novo endereço</DialogTitle>
      <DialogContent>
        <CardDadosEndereco/>
      </DialogContent>
      <DialogActions>
        <Button onClick={()=>setOpen(false)}>Cancelar</Button>
        <Button onClick={()=>setOpen(false)}>Salvar</Button>
      </DialogActions>
    </Dialog>
  )
}

export function ModalNovoCartao({open, setOpen}: ModalProps){
  return(
    <Dialog open={open} maxWidth={'md'}>
      <DialogTitle>Novo endereço</DialogTitle>
      <DialogContent>
        <CardDadosCartao/>
      </DialogContent>
      <DialogActions>
        <Button onClick={()=>setOpen(false)}>Cancelar</Button>
        <Button onClick={()=>setOpen(false)}>Salvar</Button>
      </DialogActions>
    </Dialog>
  )
}

export function ModalListaEndereco({open, setOpen}: ModalProps){
  const theme = useTheme()
  return(
    <Dialog open={open} maxWidth={'md'}>
      <DialogTitle>Novo endereço</DialogTitle>
      <DialogContent>
        <Grid container spacing={3}>
          <Grid item xs={12} md={2}>
            <Checkbox value={1}/>
          </Grid>
          <Grid item xs={12} md={10}>
            <Typography color={theme.palette.primary.dark} fontSize={16}>
              Casa
            </Typography>
            <Typography color={theme.palette.primary.dark} fontSize={16}>
              Rua Teste - 687
            </Typography>
            <Typography color={theme.palette.primary.dark} fontSize={16}>
              Bairro dos testes - 08888-666
            </Typography>
            <Typography color={theme.palette.primary.dark} fontSize={16}>
              Suzano - SP
            </Typography>
          </Grid>
          <Grid item xs={12} md={2}>
            <Checkbox value={1}/>
          </Grid>
          <Grid item xs={12} md={10}>
            <Typography color={theme.palette.primary.dark} fontSize={16}>
              Casa 2
            </Typography>
            <Typography color={theme.palette.primary.dark} fontSize={16}>
              Rua Teste 2 - 123
            </Typography>
            <Typography color={theme.palette.primary.dark} fontSize={16}>
              Bairro dos testes 2 - 11111-666
            </Typography>
            <Typography color={theme.palette.primary.dark} fontSize={16}>
              Mogi das Cruzes - SP
            </Typography>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={()=>setOpen(false)}>Cancelar</Button>
        <Button onClick={()=>setOpen(false)}>Selecionar</Button>
      </DialogActions>
    </Dialog>
  )
}

export function ModalListaCartao({open, setOpen}: ModalProps){
  const theme = useTheme()
  return(
    <Dialog open={open} maxWidth={'md'}>
      <DialogTitle>Novo cartão</DialogTitle>
      <DialogContent>
        <Grid container spacing={3}>
          <Grid item xs={12} md={2}>
            <Checkbox value={1}/>
          </Grid>
          <Grid item xs={12} md={10}>
            <Typography color={theme.palette.primary.dark} fontSize={16}>
              **** **** **** 0401
            </Typography>
            <Typography color={theme.palette.primary.dark} fontSize={16}>
              Mastercard - 10/2025
            </Typography>
          </Grid>
          <Grid item xs={12} md={2}>
            <Checkbox value={1}/>
          </Grid>
          <Grid item xs={12} md={10}>
            <Typography color={theme.palette.primary.dark} fontSize={16}>
              **** **** **** 1012
            </Typography>
            <Typography color={theme.palette.primary.dark} fontSize={16}>
              Visa - 03/2028
            </Typography>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={()=>setOpen(false)}>Cancelar</Button>
        <Button onClick={()=>setOpen(false)}>Selecionar</Button>
      </DialogActions>
    </Dialog>
  )
}