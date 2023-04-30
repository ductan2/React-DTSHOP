import React from 'react';
import styled from 'styled-components';
import logo from '../assets/logo.png';
import { FaBars } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { links } from '../utils/constants';
import CartButtons from './CartButtons';
import { useDispatch, useSelector } from 'react-redux';

const Nav = () => {
    const dispatch = useDispatch();
    const { myUser } = useSelector((state) => state.cart_reducer);
    const handleToggle = () => {
        dispatch({
            type: 'SIDEBAR_OPEN'
        });
    };
    return (
        <NavContainer>
            <div className="nav-center">
                <div className="nav-header">
                    <Link to={'/'}>
                        <img src={logo} alt="" />
                    </Link>
                    <button
                        type="button"
                        className="nav-toggle"
                        onClick={handleToggle}
                    >
                        <FaBars></FaBars>
                    </button>
                </div>
                <ul className="nav-links">
                    {links.map((item, index) => {
                        return (
                            <li key={item.id}>
                                <Link to={item.url}>{item.text}</Link>
                            </li>
                        );
                    })}
                    {myUser && (
                        <li>
                            <Link to={'/checkout'}>checkout</Link>
                        </li>
                    )}
                </ul>
                <CartButtons handleToggle={handleToggle}></CartButtons>
            </div>
        </NavContainer>
    );
};

const NavContainer = styled.nav`
    height: 5rem;
    display: flex;
    align-items: center;
    justify-content: center;

    .nav-center {
        width: 90vw;
        margin: 0 auto;
        max-width: var(--max-width);
    }
    .nav-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        img {
            width: 175px;
            margin-left: -15px;
        }
    }
    .nav-toggle {
        background: transparent;
        border: transparent;
        color: var(--clr-primary-5);
        cursor: pointer;
        svg {
            font-size: 2rem;
        }
    }
    .nav-links {
        display: none;
        a {
            font-weight: bold;
            font-size: 20px !important;
        }
    }
    .cart-btn-wrapper {
        display: none;
    }
    @media (min-width: 992px) {
        .nav-toggle {
            display: none;
        }
        .nav-center {
            display: grid;
            grid-template-columns: auto 1fr auto;
            align-items: center;
        }
        .nav-links {
            display: flex;
            justify-content: center;
            li {
                margin: 0 0.5rem;
            }
            a {
                color: var(--clr-grey-3);
                font-size: 1rem;
                text-transform: capitalize;
                letter-spacing: var(--spacing);
                padding: 0.5rem;
                &:hover {
                    border-bottom: 2px solid var(--clr-primary-7);
                }
            }
        }
        .cart-btn-wrapper {
            display: grid;
        }
    }
`;

export default Nav;
