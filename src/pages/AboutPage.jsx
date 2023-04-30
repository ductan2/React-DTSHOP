import React from 'react';
import styled from 'styled-components';
import { PageHero } from '../components';
import aboutImg from '../assets/hero-bcg.jpeg';

const AboutPage = () => {
    return (
        <div>
            <PageHero title={"About"}/>
            <Wrapper className='page section-center section'>
                <img src={aboutImg} alt="" />
                <div>
                    <div className="title">
                        <h2>Our Story</h2>
                        <div className="underline"></div>
                    </div>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Veritatis fugiat optio molestiae molestias
                        reprehenderit iste. Culpa eos veniam odit assumenda.
                        Illum temporibus nulla atque ad libero non iste deserunt
                        veritatis?
                    </p>
                </div>
            </Wrapper>
        </div>
    );
};

const Wrapper = styled.section`
    display: grid;
    gap: 4rem;
    padding-top:80px;
    img {
        width: 100%;
        display: block;
        border-radius: var(--radius);
        height: 500px;
        object-fit: cover;
    }
    p {
        line-height: 2;
        max-width: 45em;
        margin: 0 auto;
        margin-top: 2rem;
        color: var(--clr-grey-5);
    }
    .title {
        text-align: left;
    }
    .underline {
        margin-left: 0;
    }
    @media (min-width: 992px) {
        grid-template-columns: 1fr 1fr;
    }
`;
export default AboutPage;
