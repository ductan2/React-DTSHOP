import React from 'react';
import styled from 'styled-components';
import visa from '../assets/visa.png';
import paypal from '../assets/paypal.png';
import { useState } from 'react';
export const Payment = () => {
    const [selectPay, setSelectPay] = useState('');

    return (
        <Wrapper>
            <div className="grid">
                <div
                    className={`${selectPay === 'visa' ? 'active' : null}`}
                    onClick={() => setSelectPay('visa')}
                >
                    <img src={visa} alt="" />
                    <h5>Visa</h5>
                </div>
                <div
                    className={`${selectPay === 'paypal' ? 'active' : null}`}
                    onClick={() => setSelectPay('paypal')}
                >
                    <img src={paypal} alt="" />
                    <h5>Paypal</h5>
                </div>
            </div>
            <div className="info-payment">
                <h1>Payment details</h1>
                <div className="input-payment">
                    <label htmlFor="">Name on card</label>
                    <input type="text" />
                </div>
                <div className="input-payment">
                    <label htmlFor="">Card number</label>
                    <input type="text" />
                </div>
            </div>
        </Wrapper>
    );
};
const Wrapper = styled.div`
    .grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        margin: 15px;
        padding: 20px;
        place-items: center;
        gap: 30px;
        div {
            display: flex;
            align-items: center;
            justify-content: space-around;
            flex-direction: column;
            cursor: pointer;
            background: linear-gradient(
                    0deg,
                    rgba(188, 187, 187, 0.03),
                    rgba(188, 187, 187, 0.03)
                ),
                #ffffff;
            border: 1px solid rgba(104, 104, 104, 0.15);
            box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
            border-radius: 28px;
            width: 180px;
            min-height: 150px;
        }
        .active {
            opacity: 0.6;
        }
    }
    .info-payment {
        background: rgba(200, 200, 200, 0.06);
        border: 1px solid rgba(132, 132, 132, 0.3);
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        border-radius: 8px;
        padding: 15px 50px 150px 50px;
        h1 {
            font-weight: 700;
            font-size: 30px;
            line-height: 39px;
            text-align: center;
            color: #000000;
        }
        .input-payment {
            display: flex;
            margin-top:30px;
            flex-direction: column;
            label {
                font-weight: 800;
                font-size: 18px;
                color: #858181;
            }
            input {
                background: transparent;
                outline: none;
                border: none;
                padding: 10px;
                border-bottom: 1px solid #858181;
                transform: rotate(-0.16deg);
                font-size: 18px;
                font-weight:700;
            }
        }
    }
`;
