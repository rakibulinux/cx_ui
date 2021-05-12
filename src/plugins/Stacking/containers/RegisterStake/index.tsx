import * as classNames from 'classnames';
import * as React from 'react';
import styled from 'styled-components';
import { StakingReward } from '../../../../modules';
import { format, addDays } from 'date-fns';

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

    .expected-reward-box {
        flex: 1 1 auto;
        height: 100%;
        border: 1px solid hsla(0,0%,85.5%,.5);
        box-sizing: border-box;
        padding: 5px 20px;
        display: flex;
        align-items: center;
        span {
            font-size: 14px;
            color: #fff;
            white-space: nowrap
        }
        input {
            flex: 1 1 auto;
            font-size: 16px;
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
        flex: 1 1 26%;
        box-sizing: border-box;
        height: 40px;
        padding: 0 4px;
        line-height: 40px;
        color: #fff;
        font-size: 15px;
        background: rgba(132, 142, 156, 0.35);
        border: 1px solid #848E9C;
        box-sizing: border-box;
        border-radius: 5px;
        text-align: center;
        margin: 0 6px 6px 0;
        outline: none;
        transition: all 0.3s;

        &__active {
            background: #2FB67E;
            color: #fff;
            border-color: #30B57E;
        }
    }

    .staking-details {
        margin-bottom: 20px;
        font-size: 14px;
        background-color:rgba(132, 142, 156, 0.35);
        padding: 20px;
        .detail-row {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            margin-bottom: 8px;

            .key {
                color: #fff;
                padding-right: 8px;
            }
            .value {
                font-weight: 700;
                text-align: right;
                color: #fff;
                flex: 1 0 auto;
            }
        }
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

interface RegisterStakeProps {
    currency_id: string;
    start_time: string;
    end_time: string;
    rewards: StakingReward[];
}

const DEFAULT_PERIOD_INDEX = 0;

export const RegisterStake: React.FC<RegisterStakeProps> = (props: RegisterStakeProps) => {
    const { currency_id, rewards } = props;
    const [selectedPeriodIndexState, setSelectedPeriodIndexState] = React.useState<number>(DEFAULT_PERIOD_INDEX);
    const [stakingDateState, setStakingDateState] = React.useState("");
    const [releaseDateState, setReleaseDateState] = React.useState("");
    const [expectedRewardState, setExpectedRewardState] = React.useState("");
    const [amountState, setAmountState] = React.useState("");
    const [rewardState, setRewardState] = React.useState({
        "period": 0,
        "total_amount": "0",
        "cap_amount": "0",
        "min_amount": "0",
        "cap_amount_per_user": "0",
        "annual_rate": 0,
        "payment_time": ""
    })
    const selecterdPeriodButtonClass = classNames('period-btn', 'period-btn__active');

    React.useEffect(() => {
        setExpectedRewardState((rewardState.annual_rate / 365 * rewardState.period * Number(amountState)).toString())
    }, [amountState])

    const handleSelectLockupPeriod = (period_index: number) => {
        const reward = rewards[period_index];
        const { period, annual_rate, min_amount, total_amount, cap_amount, payment_time } = reward;
        setSelectedPeriodIndexState(period_index);
        setStakingDateState(format(new Date(), 'yyyy-MM-dd hh:mm'));
        setReleaseDateState(format(addDays(new Date(), Number(period)), 'yyyy-MM-dd hh:mm'));
        setRewardState({
            ...rewardState,
            period: Number(period),
            min_amount: min_amount,
            cap_amount: cap_amount,
            total_amount: total_amount,
            annual_rate: Number(annual_rate),
            payment_time: payment_time

        })

    }

    React.useEffect(() => {
        if (rewards.length > 0) {
            handleSelectLockupPeriod(DEFAULT_PERIOD_INDEX);
        }
    }, [rewards.length]);


    return (
        <RegisterStakeStyles>
            <div className="container">
                <div className="row">
                    <div className="col-12 text-right">
                        <div className="amount-box">
                            <span>AMOUNT</span>
                            <input onChange={e => setAmountState(e.target.value)} value={amountState} type="number" placeholder="0" />
                            <span>{currency_id.toUpperCase()}</span>
                        </div>
                    </div>
                </div>
                <div className="row mt-5">
                    <div className="col-12">
                        <h5>Lock-up Period</h5>
                        <div className="d-flex flex-row justify-content-between">
                            {
                                rewards.map((reward: StakingReward, index: number) => (
                                    <button
                                        className={selectedPeriodIndexState === index ? selecterdPeriodButtonClass : 'period-btn'}
                                        onClick={() => handleSelectLockupPeriod(index)}>
                                        {Number(reward.period)} days
                                    </button>
                                ))
                            }
                        </div>

                    </div>
                    <div className="col-12">
                        <span className="text-white float-right">Annualized Rewards <strong>{Number(rewardState.annual_rate) * 100}</strong>%</span>
                    </div>
                </div>
                <div className="row mt-5">
                    <div className="col-12">
                        <h5>Lock-up dates (GMT+7)</h5>
                    </div>
                    <div className="col-12">
                        <div className="staking-details">
                            <div className="detail-row">
                                <span className="key">Lock-Up</span>
                                <span className="value">{stakingDateState}</span>
                            </div>
                            <div className="detail-row">
                                <span className="key">Release</span>
                                <span className="value">{releaseDateState}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row mt-5">
                    <div className="col-12">
                        <h5>Expected Rewards (Distributed at end)</h5>
                    </div>
                    <div className="col-12">
                        <div className="expected-reward-box">
                            <span></span>
                            <input type="text" disabled value={expectedRewardState} />
                            <span>{currency_id.toUpperCase()}</span>
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
                <div className="row">
                    <div className="col-12">
                        <button className="stake-btn">STAKE</button>
                    </div>
                </div>
            </div>
        </RegisterStakeStyles>

    )
}
