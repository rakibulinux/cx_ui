import * as React from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';

interface Reward {
    period: number,
    totalAmount: string,
    capAmount?: string,
    minAmount: string,
    capAmountPerUser?: string,
    annualRate: string,
    paymentTime: string,
}
interface StackingItemProps {
    currency_id: string;
    logo_image: string;
    event_name: string;
    reward_desc: Reward[];
    active: boolean;
}

const StakingItemStyles = styled.div`
    .reward-box {
        box-sizing: border-box;
        flex: 0 0 80px;
        padding: 10px;
        margin-right: 5px;
        background-color: #fafafa;
        border-radius: 5px;
    }

    .card-image {
        height: 200px;
        display: flex;
        align-items: center;
        background-color: #fafafa;
        padding: 40px;
        img {
            width: 100%;
            height: 100%;
        }
    }

    .go-stack-btn {
        background-color: #4231c8;
        color: #fff;
        border: 1px solid #4231c8;
        flex: 1 1 0%;
        padding: 0 5px;
        white-space: nowrap;
        font-size: 13px;
        line-height: 36px;
        margin: 3px;
        text-align: center;
        will-change: background-color;
        transition: background-color .2s;
    }

    #stacking-item {
        position: relative;
        width: 100%;
        height: 100%;
        .image {
            background-color: #fafafa;
            background-position: 50% 50%;
            background-size: cover;
            display: flex;
            flex-basis: 200px;
            gap: normal;
            width: 100%;
            height: 200px;
            .logo-image {
                margin: 40px auto;
                width: 270px;
                height: 120px;
                display: flex;
                align-items: center;
                
                img {
                    max-width: 100%;
                    max-height: 100%;
                    margin: auto;
                }
            }
        }
        .text {
            background-color: #fff;
            padding: 1rem;
            .title, .reward-container {
                padding: 0.5rem 0;
            }
            .title {
                color: black;
                font-size: 20px;
                font-weight: 700;
            }
            .reward-container {
                display: flex;
                flex-direction: row;
            }
        }
        .stacking-item__disabled {
            position: absolute;
            width: 100%;
            height: 100%;
            content: '';
            top: 0;
            left: 0;
            font-size: 24px;
            background-color: #14263bc9;
            text-align: center;
            padding-top: 50%;
            z-index: 997;
            color: rgb(255, 255, 255);
        }
    }
`;

export const StakingItem: React.FC<StackingItemProps> = (props: StackingItemProps) => {
    const { currency_id, logo_image, event_name, reward_desc, active } = props;
    const history = useHistory();
    const handleGoStacking = () => {
        const location = {
            pathname: '/staking/detail/' + currency_id.toLowerCase()
        }
        history.push(location);
    }
    return (
        <StakingItemStyles>
            <div id="stacking-item">
                <section className="image">
                    <div className="logo-image">
                        <img src={logo_image} alt="" />
                    </div>
                </section>
                <section className="text">
                    <a href="" className="title">
                        {event_name}
                    {/* <a style={{ color: 'black', fontSize: '20px', fontWeight: 'bold' }} href=""></a> */}
                    </a>
                    <div className="reward-container">
                        {
                            reward_desc.map(reward => (
                                <div className="reward-box">
                                    <div style={{ color: '#000000' }}>{Number(reward.annualRate) * 100}%</div>
                                    <div>{reward.period / 24} days</div>
                                </div>
                            ))
                        }
                    </div>
                    <div className="mt-3">
                        <button onClick={handleGoStacking} className="go-stack-btn w-100">Go Stack</button>
                    </div>
                </section>

                {
                    !active ?
                        <div className="stacking-item__disabled">
                            Event has finished
                        </div>
                        : ''
                }
            </div>
        </StakingItemStyles>

    )
}
