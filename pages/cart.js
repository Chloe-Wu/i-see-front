import Header from "@/components/Header"
import styled from 'styled-components';
import Center from "@/components/Center";
import Button from "@/components/Button";
import { useContext, useEffect,useState } from "react";
import { CartContext } from "@/components/CartContext";
import axios from "axios";
import Table from "@/components/Table";
import Input from "@/components/Input";

const ColumnsWrapper = styled.div`
    display:grid;
    grid-template-columns: 1fr;
    @media screen and (min-width:768px){
        grid-template-columns: 1.2fr .8fr;
    }
    gap:40px;
    margin-top:40px;
`
const Box = styled.div`
    background-color:#fff;
    border-radius: 10px;
    padding:30px;
`

const ProductInfoCell = styled.td`
    padding:10px 0;
    
`

const ProductImageBox = styled.div`
    width:90px;
    height:100px;
    padding: 2px;
    border:1px solid rgba(0,0,0,.1);
    display:flex;
    align-items:center;
    justify-content:center;
    border-radius:10px;
    img{
        max-width:80px;
        max-height:80px;
    }
    @media screen and (min-width:768px){
        padding: 10px;
        width:100px;
        height:100px;
        img{
            max-width:60px;
            max-height:6 0px;
        }
    }
`
const QuantityLabel = styled.span`
    padding: 0 15px;
    display:block;
    @media screen and (min-width:768px){
        display:inline-block;
        padding: 10px;
    }
    

`
const CityHolder = styled.div`
    display:flex;
    gap:5px;
`

export default function CartPage(){
    const {cartProducts, addProduct,removeProduct,clearCart} = useContext(CartContext);
    const [products, setProducts] = useState([])
    const [name,setName] = useState('');
    const [email, setEmail] = useState('');
    const [city,setCity] = useState('');
    const [postCode,setPostcode] = useState('');
    const [streetAddress, setStreetAddress] = useState('');
    const [country, setCountry] = useState('');
    const [isSuccess,setIsSuccess] = useState(false);
    useEffect(()=> {
        if(cartProducts.length > 0){
            axios.post('/api/cart',{ids:cartProducts})
                .then(response => {
                    setProducts(response.data)
                })
        }else{
            setProducts([])
        }
    },[cartProducts])

    useEffect(()=>{
        if (typeof window === 'undefined') {
            return;
          }
        if(window?.location.href.includes('success')){
            setIsSuccess(true); 
            clearCart();
        }
    },[])

    function moreOfThisProduct(id){
        addProduct(id);
    }

    function lessOfThisProduct(id){
        removeProduct(id);
    }
    async function goToPayment(){
        const response = await axios.post('/api/checkout',{
            name,email,city,postCode,streetAddress,country,cartProducts,
        })
        if(response.data.url){
            window.location = response.data.url
        }
    }
    let total = 0;
    for(const productId of cartProducts){
        const price = products.find(p =>p._id === productId)?.price || 0;
        total += price;
    }


    if(isSuccess){
        return(
            <>
                <Header />
                <Center>
                    <ColumnsWrapper>
                    <Box>
                        <h1>Thanks for your order!</h1>
                        <p>We will email you when your order will be sent.</p>
                    </Box>
                    </ColumnsWrapper>
                </Center>
            </>
        )
    }
    return(
        <>
            <Header />
            <Center>
                <ColumnsWrapper>
                    <Box>
                        <h2>Cart</h2>
                        {!cartProducts?.length &&(
                             <div>Your cart is empty</div>
                        )}
                        
                        {products?.length > 0 && (
                        
                        <Table>
                            <thead>
                                <tr>
                                    <th>Product</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map(product => (
                                    <tr key={product._id}>
                                        <ProductInfoCell>
                                            <ProductImageBox>
                                                <img src={product.images[0]} alt="/"/>
                                            </ProductImageBox>
                                         
                                            {product.title}
                                        </ProductInfoCell>
                                        <td>
                                            <Button onClick = {()=> lessOfThisProduct(product._id)}>-</Button>
                                            <QuantityLabel>
                                            {cartProducts.filter(id => id === product._id).length}
                                            </QuantityLabel>
                                            <Button onClick = {()=> moreOfThisProduct(product._id)}>+</Button>
                                            
                                        </td>
                                        <td>${cartProducts.filter(id => id === product._id).length * product.price}</td>
                                        
                                    </tr>
                                ))}
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td>${total}</td>
                                </tr>
                            </tbody>
                        </Table>
                        )}
                    </Box>
                    {!!cartProducts?.length &&(
                        <Box>
                        <h2>Order Information</h2>
                        <Input type= "text" placeHolder="Name" 
                        name="name"
                        value={name} onChange={e => setName(e.target.value)} />  
                        <Input type= "text" placeHolder="Email" 
                        name="email"
                        value={email} onChange={e => setEmail(e.target.value)} /> 
                        <CityHolder>
                            <Input type= "text" placeHolder="City"
                            name="city" 
                            value={city} onChange={e => setCity(e.target.value)} />  
                            <Input type= "text" placeHolder="Postal Code" 
                            name="postCode"
                            value={postCode} onChange={e => setPostcode(e.target.value)} />                        
                        </CityHolder> 
                        <Input type= "text" placeHolder="Street Address" 
                        name="streetAddress"
                        value={streetAddress} 
                        onChange={e => setStreetAddress(e.target.value)} />  

                        <Input type= "text" placeHolder="Country" 
                        name="country"
                        value={country} onChange={e => setCountry(e.target.value)} /> 

                        <Button black block onClick = {goToPayment}>Continue to payment</Button>
                        </Box>
                    )}
                </ColumnsWrapper>
            </Center>

        </>
    )
}