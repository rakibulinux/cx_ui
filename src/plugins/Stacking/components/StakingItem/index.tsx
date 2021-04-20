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
    
    #stacking-item {
        position: relative;
        width: 100%;
        height: 100%;
        border-radius: 5px;
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
            padding: 1rem 3rem;
            .title, .reward-container {
                padding: 0.5rem 0;
            }
            .title {
                margin: 10px 0;
                color: black;
                font-size: 20px;
                font-weight: 700;
                width: 100%;  
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;    
            }
            .reward-container {
                display: flex;
                flex-direction: row;
                .reward-box {
                    box-sizing: border-box;
                    flex: 0 0 80px;
                    padding: 10px;
                    margin-right: 5px;
                    background-color: #fafafa;
                    border-radius: 5px;
                    border: 2px solid #30B57E;

                    &__rate {
                        font-weight: bold;
                        color: #000000;
                    }
                }
            }
            .go-stack-btn {
                background-color: #30B57E;
                color: #fff;
                flex: 1 1 0%;
                padding: 0 5px;
                border-radius: 5px;
                white-space: nowrap;
                font-size: 13px;
                line-height: 36px;
                margin: 3px;
                text-align: center;
                text-transform: uppercase;
                will-change: background-color;
                transition: background-color .2s;

                :hover {
                    background-color: #35cf8f;
                }
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
                    <h3 className="title">
                        {event_name}
                        {/* <a style={{ color: 'black', fontSize: '20px', fontWeight: 'bold' }} href=""></a> */}
                    </h3>
                    <div className="reward-container">
                        {
                            reward_desc.map(reward => (
                                <div className="reward-box">
                                    <div className="reward-box__rate">{Number(reward.annualRate) * 100}%</div>
                                    <div className="reward-box__period">{reward.period / 24} days</div>
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
