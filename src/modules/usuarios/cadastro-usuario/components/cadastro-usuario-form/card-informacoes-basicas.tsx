
import { Button, Card, CardActions, CardContent, CardHeader, Divider, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import { useState } from "react";
import { CadastroUsuarioInterface } from "../../types/cadastro-usuario-types";
import { GeneroEnum } from "src/constants/enums/genero.enum";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import moment from 'moment';
import 'moment/locale/pt-br';
import InputMask from 'react-input-mask';


export default function CardInformacoesBasicas() {
  const [confirmarSenha, setConfirmarSenha] = useState<string>('')
  const [usuario, setUsuario] = useState<CadastroUsuarioInterface>({
    nome: "",
    genero: "",
    dataNascimento: new Date(),
    cpf: "",
    dddTelefone: "",
    telefone: "",
    email: "",
    senha: ""
  });


  return (
    <Card>
      <CardHeader
        subheader="The information can be edited"
        title="Profile"
      />
      <CardContent sx={{ pt: 2, pl: 5 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <TextField
              fullWidth
              label="Nome"
              name="nome"
              onChange={(value: React.ChangeEvent<HTMLInputElement>) => {
                setUsuario({
                  ...usuario,
                  nome: value.target.value
                })
              }}
              required
              value={usuario?.nome}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <TextField
              fullWidth
              label="E-mail"
              name="email"
              required
              value={usuario.email}
              onChange={(value: React.ChangeEvent<HTMLInputElement>) => {
                setUsuario({
                  ...usuario,
                  email: value.target.value
                })
              }}
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <InputMask
              mask="99"
              maskChar=""
              value={usuario.dddTelefone}
              onChange={(value: React.ChangeEvent<HTMLInputElement>) => {
                setUsuario({
                  ...usuario,
                  dddTelefone: value.target.value
                })
              }}
            >
              {/* @ts-ignore */}
              {() => (
                <TextField
                  fullWidth
                  label="DDD"
                  name="ddd"
                  required
                />)}
            </InputMask>
          </Grid>
          <Grid item xs={12} md={4}>
            <InputMask
              mask="99999-9999"
              maskChar=""
              value={usuario.telefone}
              onChange={(value: React.ChangeEvent<HTMLInputElement>) => {
                setUsuario({
                  ...usuario,
                  telefone: value.target.value
                })
              }}
            >
              {/* @ts-ignore */}
              {() => (
                <TextField
                  fullWidth
                  required
                  label="Celular"
                  name="telefone"
                />)}
            </InputMask>
          </Grid>
          <Grid item xs={12} md={6} >
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Gênero</InputLabel>
              <Select
                id="select-genero"
                required
                name='genero'
                value={usuario.genero}
                label="Gênero"
                onChange={(event: SelectChangeEvent) => {
                  setUsuario({
                    ...usuario,
                    genero: event.target.value
                  })
                }}
              >
                <MenuItem value={GeneroEnum.FEMININO}>{GeneroEnum.FEMININO}</MenuItem>
                <MenuItem value={GeneroEnum.MASCULINO}>{GeneroEnum.MASCULINO}</MenuItem>
                <MenuItem value={GeneroEnum.OUTRO}>{GeneroEnum.OUTRO}</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale={'pt-br'}>
              <DatePicker
                label='Data de nascimento'
                value={moment(usuario.dataNascimento)}
                //@ts-ignore
                onChange={(value: date) => {
                  setUsuario({
                    ...usuario,
                    dataNascimento: value
                  })
                }}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} md={6} >
            <InputMask
              mask="999.999.999-99"
              maskChar=""
              value={usuario.cpf}
              onChange={(value: React.ChangeEvent<HTMLInputElement>) => {
                setUsuario({
                  ...usuario,
                  cpf: value.target.value
                })
              }}
            >
              {/* @ts-ignore */}
              {() => (
                <TextField
                  required
                  fullWidth
                  label="CPF"
                  name="cpf"
                />
              )}
            </InputMask>

          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              required
              fullWidth
              type="password"
              label="Senha"
              name="senha"
              value={usuario.senha}
              onChange={(value: React.ChangeEvent<HTMLInputElement>) => {
                setUsuario({
                  ...usuario,
                  senha: value.target.value
                })
              }}
            />
          </Grid>
          <Grid item xs={12} md={6} >
            <TextField
              required
              fullWidth
              type="password"
              label="Confirmar senha"
              name="confirmarSenha"
              value={confirmarSenha}
              onChange={(value: React.ChangeEvent<HTMLInputElement>) => {
                setConfirmarSenha(value.target.value)
              }}
            />
          </Grid>
        </Grid>
      </CardContent>
      <Divider />
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Button variant="contained">
          Cadastrar
        </Button>
      </CardActions>
    </Card>
  )
}