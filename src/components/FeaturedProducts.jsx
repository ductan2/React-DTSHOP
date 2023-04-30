import React from 'react';
import { useProductsContext } from '../context/products_context';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Error from './Error';
import Loading from './Loading';
import Product from './Product';
import { useSelector } from 'react-redux';

const FeaturedProducts = () => {
    const {
        products_error: error,
        products_loading: loading,
        features_products: features
    } = useSelector((state) => state.products);
    if (error) return <Error></Error>;
    if (loading) return <Loading></Loading>;
    return (
        <Wrapper className="section">
            <div className="title">
                <h2>Featured Products</h2>
                <div className="underline"></div>
            </div>
            <div className="section-center featured">
              {features.map((proc)=>{
                  return <Product key={proc.id} {...proc}></Product>
              })}
            </div>
            <Link to={'/products'} className='btn'>all products</Link>
        </Wrapper>
    );
};

const Wrapper = styled.section`
    background: var(--clr-grey-10);
    .featured {
        margin: 4rem auto;
        display: grid;
        gap: 2.5rem;
        img {
            height: 225px;
        }
    }
    .btn {
        display: block;
        width: 148px;
        margin: 0 auto;
        text-align: center;
    }
    @media (min-width: 576px) {
        .featured {
            grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
        }
    }
`;

export default FeaturedProducts;
