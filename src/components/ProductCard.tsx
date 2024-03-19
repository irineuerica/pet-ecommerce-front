import React, { useState } from 'react';
import { ProdutosInterface } from 'src/interfaces/produtos.interface';
import mockImage from '../../public/mockProductImg.png';
import Image from 'next/image';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { Unstable_NumberInput as NumberInput } from '@mui/base/Unstable_NumberInput';
import { Button, CardActionArea, TextField, Typography, useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import { PATH_CLIENTE } from 'src/routes/paths';

const ProductCard = ({
  id,
  nome,
  descricao,
  valor,
  imagem,
  categoria_id,
  criado_em,
  atualizado_em,
}: ProdutosInterface) => {
    const router = useRouter()
  const theme = useTheme();
  const [quantity, setQuantity] = useState(0);

  return (
    <div>
      <Card variant="outlined">
        <CardContent sx={{ minHeight: 450 }}>
          <Image src={mockImage} width={200} alt="imagem do produto de gatito" />
          <Typography fontSize={18} fontWeight={'bold'} color={theme.palette.secondary.main} pt={2}>
            {nome}
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
            <b>Descrição:</b> {descricao}
          </Typography>

          <Typography fontSize={18} fontWeight={'bold'} color={theme.palette.primary.dark} pt={2}>
            R$ {valor}
          </Typography>
        </CardContent>
        <CardActionArea>
          <Button fullWidth sx={{py: 2}} onClick={()=> router.push(PATH_CLIENTE.carrinho)}>
            <AddShoppingCartIcon /> Adicionar ao Carrinho
          </Button>
        </CardActionArea>
      </Card>
    </div>
  );
};

export default ProductCard;
