import * as classNames from 'classnames';
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
        color: #333;
        border: 1px solid #30B57E;
        font-size: 15px;
        text-align: center;
        margin: 0 6px 6px 0;
        outline: none;
        transition: all 0.3s;

        &__active {
            background-color: #30B57E;
            color: #fff;
            border-color: #30B57E;
        }
    }

    .staking-details {
        margin-bottom: 20px;
        font-size: 14px;
        background-color: #313445;
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

interface Reward {
    period: number,
    totalAmount: string,
    capAmount?: string,
    minAmount: string,
    capAmountPerUser?: string,
    annualRate: string,
    paymentTime: string,
}
interface RegisterStakeProps {
    currency_id: string;
    start_time: string;
    end_time: string;
    reward_desc: Reward[];
}

const DEFAULT_PERIOD_INDEX = 0;

export const RegisterStake: React.FC<RegisterStakeProps> = (props: RegisterStakeProps) => {
    const { currency_id, reward_desc } = props;
    const [selectedPeriodIndexState, setSelectedPeriodIndexState] = React.useState<number>(DEFAULT_PERIOD_INDEX); 
    const [minimumState, setMinimumState] = React.useState("");
    const [annualizedRewardState, setAnnualizedRewardState] = React.useState(0);
    const [stakingDateState, setStakingDateState] = React.useState("");
    const [lockupReleaseState, setLockupReleaseState] = React.useState("");
    const [expectedRewardState, setExpectedRewardState] = React.useState("");

    const selecterdPeriodButtonClass = classNames('period-btn', 'period-btn__active');


    const handleSelectLockupPeriod = (reward: Reward, period_index: number) => {
        setSelectedPeriodIndexState(period_index);
        setMinimumState(reward.minAmount);
        setAnnualizedRewardState(Number(reward.annualRate) * 100);
        setStakingDateState((new Date().toDateString()));
        setLockupReleaseState(reward.paymentTime);
        setExpectedRewardState(reward.totalAmount);
    }

    React.useEffect(() => {
        if(reward_desc.length > 0) {
            handleSelectLockupPeriod(reward_desc[DEFAULT_PERIOD_INDEX], DEFAULT_PERIOD_INDEX);
        }
    }, [reward_desc.length]);

    
    return (
        <RegisterStakeStyles>
            <div className="container">
                <div className="row">
                    <div className="col-12 text-right">
                        <span style={{ color: '#fff' }}>
                            Available Amount: 0.00000000 {currency_id}
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
                        <h5>Lock-up Period</h5>
                        <div>
                            {
                                reward_desc.map((reward: Reward, index: number) => (
                                    <button
                                        className={selectedPeriodIndexState === index ? selecterdPeriodButtonClass : 'period-btn'}
                                        onClick={() => handleSelectLockupPeriod(reward, index)}>
                                        {reward.period / 24} days
                                    </button>
                                ))
                            }
                        </div>
                    </div>
                </div>
                <div className="row mt-5">
                    <div className="col-12">
                        <div className="staking-details">
                            <div className="detail-row">
                                <span className="key">Minimum Stake</span>
                                <span className="value">{minimumState} VLX</span>
                            </div>
                            <div className="detail-row">
                                <span className="key">Annualized Rewards</span>
                                <span className="value">{annualizedRewardState}%</span>
                            </div>
                            <div className="detail-row">
                                <span className="key">Staking Date</span>
                                <span className="value">{stakingDateState}</span>
                            </div>
                            <div className="detail-row">
                                <span className="key">Lockup Release</span>
                                <span className="value">{lockupReleaseState}</span>
                            </div>
                            <div className="detail-row">
                                <span className="key">Expected Rewards</span>
                                <span className="value">{expectedRewardState} {currency_id.toUpperCase()}</span>
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
