import React from 'react';
import styled from 'styled-components';
import { PageHero } from '../components';
import { useDispatch, useSelector } from 'react-redux';
import logoCart from '../assets/imageCart.png';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Payment } from '../components/Payment';
const CheckoutPage = () => {
    const { cart, total_amount } = useSelector((state) => state.cart_reducer);
    const dispatch = useDispatch();
    console.log('🚀  ~  CheckoutPage ~  cart:', cart);
    useEffect(() => {
        dispatch({
            type: 'COUNT_CART_TOTALS'
        });
        dispatch({
            type: 'SHIPPING_FEE'
        });
    }, [cart]);
    return (
        <Wrapper className="section-center page-100">
            <Payment></Payment>
            <div className="checkout-cart">
                <div className="center">
                    <h1>Your Cart</h1>
                    <img src={logoCart} alt="" />
                </div>
                <div className="checkout-cart-list">
                    {cart.map((item) => {
                        return (
                            <div key={item.id} className="checkout-cart-item">
                                <img src={item.image} alt="" />
                                <div>
                                    <h3>{item.name}</h3>
                                    <p>${item.price}</p>
                                    <span>Amount: {item.amount}</span>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div className="total">
                    <h1>Total : {total_amount}$</h1>
                </div>
                <div className="center">
                    <Link to={'*'}>
                        <button className="btn-pay">Pay Now</button>
                    </Link>
                </div>
            </div>
        </Wrapper>
    );
};
const Wrapper = styled.div`
    display: grid;
    /* grid-template-columns:1fr 1fr; */
    grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
    gap: 3rem;
    .checkout-cart {
        background: rgba(200, 200, 200, 0.11);
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        border: 1px solid rgba(188, 187, 187, 0.2);
        border-radius: 8px;
        padding: 18px 40px;
        .center {
            display: flex;
            align-items: center;
            justify-content: center;
        }

        h1 {
            font-size: 36px;
            font-weight: bold;
        }
        .checkout-cart-item {
            display: flex;
            align-items: center;
            gap: 20px;
            margin-bottom: 20px;
            img {
                width: 85px;
                height: 85px;
                border-radius: 8px;
            }
            h3 {
                color: #000000;
                font-size: 18px;
            }
            span {
                color: #000000;
                font-size: 17px;
                font-weight: 600;
            }
            p {
                color: #b7b5b5;
                font-weight: bold;
                margin: 0;
            }
        }
        .total {
            margin-top: 50px;
        }
    }
`;
export default CheckoutPage;
