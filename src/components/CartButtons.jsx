import React from 'react';
import { FaShoppingCart, FaUserMinus, FaUserPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth0 } from '@auth0/auth0-react';
import { useEffect } from 'react';
import { useState } from 'react';
const CartButtons = ({ handleToggle }) => {
    const { cart } = useSelector((state) => state.cart_reducer);
    const { isAuthenticated, isLoading, loginWithRedirect, logout, user } =
        useAuth0();
    // const [myUser, setMyUser] = useState(null);
    const {myUser}=useSelector(state=>state.cart_reducer);
    const [toggle, setToggle] = useState(false);
    const dispatch = useDispatch();
    useEffect(() => {
        if (isAuthenticated) {
            dispatch({
                type: 'SET_USER',
                payload: user
            });
        } else {
            dispatch({
                type: 'SET_USER',
                payload: false
            });
        }
    }, [isAuthenticated]);
    
    return (
        <Wrapper className="cart-btn-wrapper">
            <Link to={'/cart'} className="cart-btn">
                Cart
                <span className="cart-container">
                    <FaShoppingCart></FaShoppingCart>
                    <span className="cart-value">{cart.length}</span>
                </span>
            </Link>
            {!myUser ? (
                <button
                    type="button"
                    className="auth-btn"
                    onClick={loginWithRedirect}
                >
                    Login <FaUserPlus></FaUserPlus>{' '}
                </button>
            ) : (
                <div
                    type="button"
                    className="auth-btn"
                    onClick={() => setToggle(!toggle)}
                    // onClick={() => logout({ returnTo: window.location.origin })}
                >
                    <img className="avatar" src={user.picture} alt="" />
                    {toggle && (
                        <div className="info-user">
                            <h4>{user.name}</h4>
                            <h4>{user.nickname}</h4>
                            <Link to={'/cart'} onClick={() => setToggle(false)}>
                                <button className="btn-user">
                                    My Cart <FaShoppingCart></FaShoppingCart>
                                </button>
                            </Link>
                            <br />
                            <button
                                className="btn-user"
                                onClick={() =>
                                    logout({ returnTo: window.location.origin })
                                }
                            >
                                Logout <FaUserMinus></FaUserMinus>
                            </button>
                        </div>
                    )}
                </div>
            )}
        </Wrapper>
    );
};

const Wrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    width: 225px;
    .avatar {
        border-radius: 100%;
        width: 35px;
        height: 35px;
        margin-left: 5px;
    }
    .cart-btn {
        color: var(--clr-grey-1);
        font-size: 1.5rem;
        letter-spacing: var(--spacing);
        color: var(--clr-grey-1);
        display: flex;
        margin-right: 25px;
        align-items: center;
    }

    .cart-container {
        display: flex;
        align-items: center;
        position: relative;
        svg {
            height: 1.6rem;
            margin-left: 5px;
        }
    }
    .cart-value {
        position: absolute;
        top: -10px;
        right: -16px;
        background: var(--clr-primary-5);
        width: 16px;
        height: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        font-size: 0.75rem;
        color: var(--clr-white);
        padding: 12px;
    }
    .auth-btn {
        display: flex;
        align-items: center;
        background: transparent;
        border-color: transparent;
        font-size: 1.5rem;
        cursor: pointer;
        position: relative;
        color: var(--clr-grey-1);
        letter-spacing: var(--spacing);
        svg {
            margin-left: 5px;
        }
    }
    .info-user {
        position: absolute;
        top: 100%;
        left: 0;
        background-color: white;
        border-radius: 15px;
        margin-top: 15px;
        padding: 10px;
        width: 180px;
        box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
        z-index: 99;
        @media (max-width: 992px) {
            max-width: 300px;
        }
        h4 {
            font-size: 17px;
            flex-wrap: nowrap;
        }
        p {
            font-size: 14px;
        }
        .btn-user {
            background-color: white;
            font-size: 20px;
            outline: none;
            border: none;
            cursor: pointer;
        }
    }
`;
export default CartButtons;
