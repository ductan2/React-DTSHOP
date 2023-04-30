import React from 'react';
import styled from 'styled-components';
import { Filters, ProductList, Sort, PageHero, Hero } from '../components';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import axios from 'axios';
import { fecthProductsPage } from '../reducers/fecthData';

const ProductsPage = () => {
    const dispatch = useDispatch();
 
    useEffect(() => {
        dispatch(fecthProductsPage())
    }, [dispatch]);

    return (
        <div>
            <PageHero title={'products'}></PageHero>
            <Wrapper className="page">
                <div className="section-center products">
                    <Filters></Filters>
                    <div>
                        <Sort></Sort>
                        <ProductList></ProductList>
                    </div>
                </div>
            </Wrapper>
        </div>
    );
};

const Wrapper = styled.div`
    .products {
        display: grid;
        gap: 3rem 1.5rem;
        margin: 4rem auto;
    }
    @media (min-width: 768px) {
        .products {
            grid-template-columns: 200px 1fr;
        }
    }
`;

export default ProductsPage;
