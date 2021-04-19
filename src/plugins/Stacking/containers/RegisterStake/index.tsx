import * as React from 'react';
import styled from 'styled-components';

const RegisterStakeStyles = styled.div`
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
            color: #b5b5b5;
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
        color: #7b7b7b;
        border: 1px solid hsla(0,0%,85.5%,.5);
        font-size: 15px;
        text-align: center;
        margin: 0 6px 6px 0;
        outline: none;
    }
    .period-btn__active {
        background-color: #4231c8;
        color: #fff;
        border-color: #4231c8;
    }

    .staking-details {
        margin-bottom: 20px;
        font-size: 14px;
        background-color: #fafafa;
        padding: 20px;
        .detail-row {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            margin-bottom: 8px;

            .key {
                color: #7b7b7b;
                padding-right: 8px;
            }
            .value {
                font-weight: 700;
                text-align: right;
                color: #000;
                flex: 1 0 auto;
            }
        }
    }
    .agree {
        display: flex;
        line-height: 1.5;
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
        background: #4231c8;
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

export const RegisterStake = () => {
    return (
        <RegisterStakeStyles>
            <div className="container">
                <div className="row">
                    <div className="col-12 text-right">
                        <span>
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
                        <span>Lock-up Period</span>
                        <div>
                            <button className="period-btn period-btn__active">30 days</button>
                        </div>
                    </div>
                </div>
                <div className="row mt-5">
                    <div className="col-12">
                        <div className="staking-details">
                            <div className="detail-row">
                                <span className="key">Minimum Stake</span>
                                <span className="value">0 VLX</span>
                            </div>
                            <div className="detail-row">
                                <span className="key">Annualized Rewards</span>
                                <span className="value">18.25%</span>
                            </div>
                            <div className="detail-row">
                                <span className="key">Staking Date</span>
                                <span className="value">2021-04-19 15:20 (GMT+7)</span>
                            </div>
                            <div className="detail-row">
                                <span className="key">Lockup Release</span>
                                <span className="value">2021-05-19 15:20 (GMT+7)</span>
                            </div>
                            <div className="detail-row">
                                <span className="key">Expected Rewards</span>
                                <span className="value">351.52500000 VLX</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <label className="agree">
                            <input type="checkbox" />
                            I have read and agree with the cautions.
                        </label>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <button className="stake-btn">STAKE</button>
                    </div>
                </div>
            </div>
        </RegisterStakeStyles>

    )
}
