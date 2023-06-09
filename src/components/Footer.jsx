import React from 'react';
import styled from 'styled-components';
const Footer = () => {
    return (
        <Wrapper>
            <a href="https://github.com/ductan2">
                <h5>
                    {' '}
                    © {new Date().getFullYear()} <span>DTSHOP</span> Bản
                    quyền thuộc về{' '}
                    <span>Đức Tân</span>
                </h5>
            </a>
        </Wrapper>
    );
};

const Wrapper = styled.footer`
    height: 5rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: var(--clr-black);
    text-align: center;
    color: #fff;
    span {
        color: var(--clr-primary-5);
        font-weight:600;
    }
    a {
        color: var(--clr-primary-5);
    }
    h5 {
        color: var(--clr-white);
        margin: 0.1rem;

        font-weight: 400;
        text-transform: none;
        line-height: 1.25;
    }
    @media (min-width: 776px) {
        flex-direction: row;
    }
`;

export default Footer;
