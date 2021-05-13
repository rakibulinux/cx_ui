import * as React from 'react'
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { selectWallets } from '../../../../modules';

const UnStakeStyles = styled.div`
    padding: 20px 0;
    .amount-box {
        flex: 1 1 auto;
        height: 100%;
        border: 1px solid hsla(0,0%,85.5%,.5);
        box-sizing: border-box;
        padding: 0 20px;
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
            padding: 0 10px;
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

    .unstake-btn {
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

        :disabled {
            background: rgba(132, 142, 156, 0.35);
            color: #fff;
            cursor: not-allowed;
        }
    }

    .amount-number {
        color: #30B57E;
        font-weight: bold;
    }
`;

interface UnStakeProps {
    currency_id: string;
}

export const UnStake: React.FC<UnStakeProps> = (props: UnStakeProps) => {
    const { currency_id } = props;
    const [amountState, setAmountState] = React.useState("");
    const [agreeState, setAgreeState] = React.useState(false);
    const wallets = useSelector(selectWallets);
    const wallet = wallets.find(wallet => wallet.currency.toLowerCase() === currency_id.toLowerCase()) || { balance: 0.00000000 }
    return (
        <UnStakeStyles>
            <div className="container">
                <div className="row">
                    <div className="col-12 text-right">
                        <span className="amount-number">
                            Available Amount: {wallet.balance}  {currency_id.toUpperCase()}
                        </span>
                        <div className="amount-box">
                            <span>AMOUNT</span>
                            <input value={amountState} type="number" placeholder="0" onChange={e => {
                                const amount = e.target.value;
                                if (Number(amount) >= 0) setAmountState(amount)

                            }} />
                            <span>{currency_id.toUpperCase()}</span>
                        </div>
                    </div>
                </div>
                <div className="row mt-5">
                    <div className="col-12">
                        <label className="agree">
                            <input type="checkbox" onChange={e => setAgreeState(e.target.checked)} />
                            I have read and agree with the cautions.
                        </label>
                    </div>
                </div>
                <div className="row mt-2">
                    <div className="col-12">
                        <button disabled={!agreeState || Number(amountState) > Number(wallet.balance) || Number(amountState) <= 0} className="unstake-btn">UNSTAKE</button>
                    </div>
                </div>
            </div>
        </UnStakeStyles>
    )
}
