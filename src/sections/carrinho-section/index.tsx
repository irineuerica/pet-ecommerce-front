import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  Divider,
  Button,
  Snackbar,
  useTheme,
  Stack,
} from '@mui/material';
import React, { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import mockImage from 'public/mockProductImg.png';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { PATH_CLIENTE } from '../../routes/paths';

const MeuCarrinhoSection = () => {
  const theme = useTheme();
  const router = useRouter();
  const [cupom, setCupom] = useState(null);
  //utilizado para navegação das paginas

  const mock = [
    {
      id: 1,
      nome: 'orci',
      descricao:
        'Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci.',
      valor: 158.77,
      categoria_id: 2,
    },
    {
      id: 2,
      nome: 'metus sapien',
      descricao: 'Integer non velit. Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue.',
      valor: 30.41,
      categoria_id: 4,
    },
  ];

  const mockDelete = [
    {
      id: 4,
      nome: 'libsddro ut',
      descricao:
        'Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui. Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.',
      valor: 106.2,
      categoria_id: 3,
    },
  ];

  return (
    <Container maxWidth={false}>
      <Grid container spacing={3}>
        <Grid item lg={6} sm={6} xl={6} xs={12}>
          <Grid container spacing={3}>
            <Grid item lg={12} sm={12} xl={12} xs={12}>
              <Typography color={theme.palette.primary.dark} fontWeight={'bold'} fontSize={20} pb={2}>
                Carrinho
              </Typography>
              {mock?.map((item, index) => <ItemCarrinho item={item} disabled={false} />)}
              <Divider />
            </Grid>
            <Grid item lg={12} sm={12} xl={12} xs={12}>
              <Typography color={theme.palette.error.main} fontWeight={'bold'} fontSize={20}>
                Itens removidos do carrinho (tempo máximo)
              </Typography>

              {mockDelete?.map((item, index) => <ItemCarrinho item={item} index={index} disabled={true} />)}
              <Divider />
            </Grid>
            <Grid item lg={12} sm={12} xl={12} xs={12}>
              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <TextField name="cupom" id="cupom" label="Cupom" fullWidth value={cupom} disabled/>
                </Grid>
                <Grid item xs={2}>
                  <Button disabled>Adicionar</Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item lg={6} sm={6} xl={6} xs={12}>
          <Resumo/>
        </Grid>
      </Grid>
      <Grid item lg={12} sm={12} xl={12} xs={12}>
        <Grid container spacing={3} pb={3}>
          <Grid item xs={6} />
          <Grid item xs={3}>
            <Button variant='contained' onClick={()=> router.push('/')}>Adicionar mais produtos</Button>
          </Grid>
          <Grid item xs={3}>
            <Button variant='contained' onClick={()=> router.push(PATH_CLIENTE.dados_pedido)}>Continuar</Button>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default MeuCarrinhoSection;

export function ItemCarrinho({ item, disabled }) {
  const theme = useTheme();
  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Grid container spacing={1}>
          <Grid item xs={1}>
            <Image src={mockImage} width={50} height={50} alt="imagem do produto de gatito" />
          </Grid>
          <Grid item xs={6}>
            <Typography color={theme.palette.primary.dark}>{item?.nome}</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography color={theme.palette.primary.dark}>R${item?.valor}</Typography>
          </Grid>
          {disabled === false && (
            <>
              <Grid item xs={2}>
                <TextField label="Quantidade" type="number" id="qtde" value={1} />
              </Grid>
              <Grid item xs={1}>
                <DeleteIcon color='error'/>
              </Grid>
            </>
          )}
        </Grid>
      </CardContent>
    </Card>
  );
}

export function Resumo() {
  const theme = useTheme();
  return (
    <Grid container spacing={3}>
      <Grid item lg={12} sm={12} xl={12} xs={12} pb={3}>
        <Typography color={theme.palette.primary.dark} fontWeight={'bold'} fontSize={18}>
          Resumo
        </Typography>
      </Grid>
      <Grid item lg={12} sm={12} xl={12} xs={12}>
        <Typography color={theme.palette.secondary.dark} fontSize={16}>
          <b>Cupom:</b> 9227-aaa - R$10.20
        </Typography>
      </Grid>
      <Grid item lg={12} sm={12} xl={12} xs={12}>
        <Typography color={theme.palette.primary.dark} fontSize={16}>
          <b>Subtotal:</b> R$128,36
        </Typography>
      </Grid>
      <Grid item lg={12} sm={12} xl={12} xs={12}>
        <Typography color={theme.palette.primary.dark} fontSize={16}>
          <b>Descontos:</b> R$10.20
        </Typography>
      </Grid>
      <Grid item lg={12} sm={12} xl={12} xs={12}>
        <Typography color={theme.palette.primary.dark} fontSize={16}>
          <b>Total:</b> R$118,16
        </Typography>
      </Grid>
    </Grid>
  );
}

