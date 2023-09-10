import styled from 'styled-components';
import Button from './Button';
import CartIcon from './icons/CartIcon';
import Link from 'next/link';
import { CartContext } from './CartContext';
import { useContext } from 'react';

const ProductWrapper = styled.div`

`

const WhiteBox = styled(Link)`
    background-color:#fff;
    padding:20px;
    height:200px;
    text-align:center;
    display:flex;
    align-items:center;
    justify-content:center;
    border-radius: 10px;
    img{
        max-width:100%;
        max-height:180px;
    }
`

const Title = styled(Link)`
    font-weight: normal;
    font-size:.9rem;
    margin:0;
    color:inherit;
    text-decoration:none;
`

const ProductInfoBox = styled.div`
    margin-top:10px;
`

const PriceRow = styled.div`
    display:block;
    align-items:center;
    justify-content:space-between;
    margin-top:2px;
    @media screen and (min-width:768px){
        display:flex;
        gap:5px;
    }
`

const Price = styled.div`
    font-size:1rem;
    font-weight:400;
    text-align:right;
    @media screen and (min-width:768px){
        font-size:1.2rem;
        font-weight:600;
        text-align:left;
    }
`

export default function ProductBox({_id,title,description,price,images}){
    const url = '/product/' + _id;
    const {addProduct} = useContext(CartContext);
    return(
        <ProductWrapper>
            <WhiteBox href={url}>
                <div>
                    <img src= {images[0]}  alt="/"/>
                </div>
            </WhiteBox >
            <ProductInfoBox>
                <Title href={url}>{title.substring(0,27)}...</Title>
                <PriceRow>
                    <Price>
                        ${price}
                    </Price>
                    <Button block primary outline onClick = {() => addProduct(_id)}>Add to Cart</Button>
                </PriceRow>
            </ProductInfoBox>
        </ProductWrapper>
    )
}