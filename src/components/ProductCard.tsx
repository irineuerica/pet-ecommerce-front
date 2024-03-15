import React, { useState } from "react";
import { ProdutosInterface } from "src/interfaces/produtos.interface";
import mockImage from '../../public/mockProductImg.png'
import Image from "next/image";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { Unstable_NumberInput as NumberInput } from '@mui/base/Unstable_NumberInput';
import { TextField } from "@mui/material";


const ProductCard = ({
    id, nome, descricao, valor, imagem,
    categoria_id, criado_em, atualizado_em }: ProdutosInterface) => {

    const [quantity, setQuantity] = useState(0);

    return (
        <div>
            <Card variant="outlined">
                <CardContent>
                    <h3>{nome}</h3>
                    <p>Descrição: {descricao}</p>
                    <p>ID Produto: #{id}</p>
                    <Image src={mockImage} width={200} alt="imagem do produto de gatito"/>
                    <h4>R$ {valor}</h4>

                    <NumberInput
                        slots={{
                            root: 'aside',
                            incrementButton: AddIcon,
                            decrementButton: RemoveIcon,
                        }}
                        value={quantity}
                        onChange={(_event, val) => setQuantity(val as number)}
                        />


                    <button>
                        <AddShoppingCartIcon/> Adicionar ao Carrinho
                    </button>

                    <button>
                        <ShoppingBagIcon/> Comprar
                    </button>
                </CardContent>
            </Card>
        </div>
    )
}

export default ProductCard;