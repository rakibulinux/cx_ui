import * as React from 'react'
import styled from 'styled-components';

const UnStakeStyles = styled.div`
    .amount-box {
        flex: 1 1 auto;
        height: 100%;
        border: 1px solid hsla(0,0%,85.5%,.5);
        box-sizing: border-box;
        padding: 10px 20px;
        display: flex;
        align-items: center;
        span {
            font-size: 14px;
            color: #fff;
            white-space: nowrap
        }
        input {
            flex: 1 1 auto;
            font-size: 19px;
            border-radius: 0;
            margin: 0;
            width: 0;
            letter-spacing: .7px;
            font-weight: 700;
            padding: 10px;
            text-align: right;
            border: 0;
            outline: 0;
            background-color: transparent;
            color: #fff;
        }
    }

    .period-btn {
        cursor: pointer;
        flex: 0 0 auto;
        min-width: 110px;
        box-sizing: border-box;
        height: 40px;
        padding: 0 4px;
        line-height: 40px;
        background-color: #fff;
        color: #fff;
        border: 1px solid hsla(0,0%,85.5%,.5);
        font-size: 15px;
        text-align: center;
        margin: 0 6px 6px 0;
        outline: none;
    }
    .period-btn__active {
        background-color: #30B57E;
        color: #fff;
        border-color: #30B57E;
    }

    
    .agree {
        display: flex;
        line-height: 1.5;
        color: #fff;
        input {
            transition: background-color .3s;
            visibility: visible;
            display: inline-block;
            line-height: 1;
            box-sizing: border-box;
            background: #fff;
            border: 1px solid #b5b5b5;
            outline: 0;
            margin: 0;
            width: 16px;
            height: 16px;
            vertical-align: middle;
            flex: 0 0 16px;
            margin-right: 6px!important;
        }
        
    }

    .stake-btn {
        outline: 0;
        -webkit-appearance: none;
        -webkit-tap-highlight-color: transparent;
        padding: 0;
        border: 0;
        cursor: pointer;
        background: #30B57E;
        color: #fff;
        transition: .3s;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        flex-direction: column;
        width: 100%;
        height: 50px;
        font-size: 20px;
        font-weight: 800;
    }
`;

export const UnStake = () => {
    return (
        <UnStakeStyles>
            <div className="container">
                <div className="row">
                    <div className="col-12 text-right">
                        <span style={{color: '#fff'}}>
                            Available Amount: 0.00000000 VLX
                        </span>
                        <div className="amount-box">
                            <span>AMOUNT</span>
                            <input type="number" placeholder="0" />
                            <span>VLX</span>
                        </div>
                    </div>
                </div>
                <div className="row mt-5">
                    <div className="col-12">
                        <label className="agree">
                            <input type="checkbox" />
                            I have read and agree with the cautions.
                        </label>
                    </div>
                </div>
                <div className="row mt-2">
                    <div className="col-12">
                        <button className="stake-btn">STAKE</button>
                    </div>
                </div>
            </div>
        </UnStakeStyles>
    )
}
