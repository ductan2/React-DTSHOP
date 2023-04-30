import React, { useEffect } from 'react';
import { useProductsContext } from '../context/products_context';
import { single_product_url as url } from '../utils/constants';
import {
    Loading,
    Error,
    ProductImages,
    AddToCart,
    Stars,
    PageHero
} from '../components';
import styled from 'styled-components';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { single_product_url } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import getSingleProduct from '../reducers/fecthData';

const SingleProductPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getSingleProduct(id));
    }, [dispatch,id]);

    const {
        single_product: proc,
        single_product_error: error,
        single_product_loading: loading
    } = useSelector((state) => state.products);

    if (error) return <Error></Error>;
    if (loading) return <Loading></Loading>;
    return (
        <Wrapper>
            <PageHero title={proc.name} product></PageHero>
            <div className="section section-center page">
                <Link to={'/products'} className="btn">
                    Back to products
                </Link>
                <div className="product-center">
                    <ProductImages images={proc.images}></ProductImages>
                    <section className="content">
                        <h2>{proc.name}</h2>
                        <Stars
                            stars={proc.stars}
                            reviews={proc.reviews}
                        ></Stars>
                        <h5 className="price">{proc.price}</h5>
                        <p className="desc">{proc.description}</p>
                        <p className="info">
                            <span>Available :</span>
                            {proc.stock > 0 ? 'In stock' : 'out of stock'}
                        </p>
                        {/* <p className="info">
                            <span>SKU : </span>
                            {proc.sku}
                        </p> */}
                        <p className="info">
                            <span>Brand : </span>
                            {proc.company}
                        </p>
                        <hr />
                        {proc.stock > 0 && (
                            <AddToCart product={proc}></AddToCart>
                        )}
                    </section>
                </div>
            </div>
        </Wrapper>
    );
};

const Wrapper = styled.main`
    .product-center {
        display: grid;
        gap: 4rem;
        margin-top: 2rem;
    }
    .price {
        color: var(--clr-primary-5);
    }
    .desc {
        line-height: 2;
        max-width: 45em;
    }
    .info {
        text-transform: capitalize;
        width: 300px;
        display: grid;
        grid-template-columns: 125px 1fr;
        span {
            font-weight: 700;
        }
    }

    @media (min-width: 992px) {
        .product-center {
            grid-template-columns: 1fr 1fr;
            align-items: center;
        }
        .price {
            font-size: 1.25rem;
        }
    }
`;

export default SingleProductPage;
