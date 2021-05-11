import * as React from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import { StakingReward } from '../../../../modules';

interface StackingItemProps {
    staking_id: string;
    currency_id: string;
    event_name: string;
    rewards: StakingReward[];
    active: boolean
    icon_url: string;
}

const StakingItemStyles = styled.div`
    #stacking-item {
        position: relative;
        width: 100%;
        min-height: 450px;
        border-radius: 5px;
        background-color: #fafafa;
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
            height: 100%;
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
                flex-wrap: wrap;
                .reward-box {
                    box-sizing: border-box;
                    flex: 0 0 80px;
                    padding: 10px;
                    margin-right: 5px;
                    background-color: #fafafa;
                    border-radius: 5px;
                    border: 2px solid #30B57E;
                    margin-bottom: 1rem;
                    &__rate {
                        font-weight: bold;
                        color: #000000;
                    }
                }
            }
            .flex-spacer {
                flex: 1 1 auto;
            }
            .buttons {
                padding-top: 17px;
                margin: auto -3px -3px;
                display: flex;
                flex-direction: row;
                flex-wrap: wrap;
                .go-stack-btn {
                    margin-bottom: 0;
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
    const { staking_id, icon_url, event_name, rewards, active } = props;
    const history = useHistory();
    const handleGoStacking = () => {
        const location = {
            pathname: '/staking/detail/' + staking_id
        }
        history.push(location);
    }
    return (
        <StakingItemStyles>
            <div id="stacking-item">
                <section className="image">
                    <div className="logo-image">
                        <img src={icon_url} alt="" />
                    </div>
                </section>
                <section className="text">
                    <h3 className="title">
                        {event_name}
                        {/* <a style={{ color: 'black', fontSize: '20px', fontWeight: 'bold' }} href=""></a> */}
                    </h3>
                    <div className="reward-container flex-spacer">
                        {
                            rewards.map(reward => (
                                <div className="reward-box">
                                    <div className="reward-box__rate">{Number(reward.annual_rate) * 100}%</div>
                                    <div className="reward-box__period">{Number(reward.period) / 24} days</div>
                                </div>
                            ))
                        }
                    </div>
                    <div className="flex-spacer"></div>
                    <div className="mt-3 buttons">
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
