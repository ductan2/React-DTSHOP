import React from 'react';
import styled from 'styled-components';
import { useCartContext } from '../context/cart_context';
import { Link } from 'react-router-dom';
import { CartContent, PageHero } from '../components';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
const CartPage = () => {
    const { cart } = useSelector((state) => state.cart_reducer);
    const { user,loginWithRedirect } = useAuth0();
    console.log('🚀  ~  CartPage ~  cart:', cart);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({
            type: 'COUNT_CART_TOTALS'
        });
        dispatch({
            type: 'SHIPPING_FEE',
        });
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);
    if (!user) {
        return (
            <Wrapper className="page-100">
                <div className="empty">
                    <h2>Your need login </h2>
                    <button className='btn' onClick={loginWithRedirect}>
                        Login
                    </button>
                </div>
            </Wrapper>
        );
    }
    if (cart.length < 1) {
        return (
            <Wrapper className="page-100">
                <div className="empty">
                    <h2>Your cart is empty</h2>
                    <Link to={'/products'} className="btn">
                        fill it
                    </Link>
                </div>
            </Wrapper>
        );
    }
    return (
        <main>
            <PageHero title={'cart'}></PageHero>
            <Wrapper className="page">
                <CartContent></CartContent>
            </Wrapper>
        </main>
    );
};

const Wrapper = styled.main`
    .empty {
        text-align: center;
        h2 {
            margin-bottom: 1rem;
            text-transform: none;
        }
    }
`;

export default CartPage;
