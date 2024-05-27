import React, { useContext, useState } from 'react';
import { ProdutoInterface } from 'src/interfaces/produtos.interface';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { Button, CardActionArea, CardMedia, TextField, Typography, useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import { PATH_CLIENTE } from 'src/routes/paths';
import { formatCurrency } from 'src/utils/formatMoeda';
import PedidoContext from '@modules/pedido/contexts/PedidoContext';

interface ProductCardrops {
  produto: ProdutoInterface;
}

const ProductCard = ({ produto }: ProductCardrops) => {
  const router = useRouter();
  const theme = useTheme();
  const pedidoContext = useContext(PedidoContext);
  return (
    <div>
      <Card variant="outlined">
        <CardMedia
          component="img"
          height="250"
          image={`/assets/products/${produto.categoria.id}.png`}
          alt={`imagem do produto ${produto.nome}`}
        />
        <CardContent sx={{ minHeight: 250 }}>
          <Typography fontSize={18} fontWeight={'bold'} color={theme.palette.secondary.main} pt={2}>
            {produto.nome}
          </Typography>
          <Typography
            fontSize={14}
            color={theme.palette.common.black}
            pt={2}
            sx={{
              display: '-webkit-box',
              overflow: 'hidden',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 3,
            }}
          >
            <b>Descrição:</b> {produto.descricao}
          </Typography>

          <Typography fontSize={18} fontWeight={'bold'} color={theme.palette.primary.dark} pt={2}>
            {formatCurrency(produto?.valor)}
          </Typography>
        </CardContent>
        <CardActionArea>
          <Button
            fullWidth
            sx={{ py: 2 }}
            onClick={() => {
              pedidoContext?.adicionar(produto);
              router.push(PATH_CLIENTE.carrinho);
            }}
          >
            <AddShoppingCartIcon /> Adicionar ao Carrinho
          </Button>
        </CardActionArea>
      </Card>
    </div>
  );
};

export default ProductCard;
