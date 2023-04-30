import React from 'react';
import ReactLoading from 'react-loading';
import styled from 'styled-components';
const Loading = () => {
    return (
        <Wrapper className="section-center">
            <ReactLoading
                type={'spin'}
                color={'black'}
                height={'20%'}
                width={'20%'}
            />
        </Wrapper>
    );
};
const Wrapper=styled.div`
    display:flex;
    align-items:center;
    justify-content:center;
`
export default Loading;
