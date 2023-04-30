import React from 'react';
import styled from 'styled-components';
import { useAuth0 } from '@auth0/auth0-react';
export const AuthWrapper = ({ children }) => {
    const { isLoading, error } = useAuth0();
    if (error) {
        return (
            <Wrapper>
                <h1>{error.message}</h1>
            </Wrapper>
        );
    }
    if (isLoading) {
        return (
            <Wrapper>
                <div></div>
            </Wrapper>
        );
    }
    return children;
};
const Wrapper = styled.section`
    min-height: 100vh;
    display: grid;
    place-items: center;
    h1 {
        color: red;
    }
`;
