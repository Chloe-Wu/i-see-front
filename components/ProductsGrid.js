import styled from "styled-components";
import ProductBox from "@/components/ProductBox";

const StyledProductsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr 1fr;
    gap: 50px;
  }
`;

export default function ProductsGrid({products,limit}) {

    const limitedProducts = products.slice(0, limit);
  return (
    <StyledProductsGrid>
      {products?.length > 0 && limitedProducts.map(product => (
        <ProductBox key={product._id} {...product} />
      ))}
    </StyledProductsGrid>
  );
}