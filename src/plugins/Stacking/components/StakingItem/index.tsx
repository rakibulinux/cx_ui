import * as React from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import { selectCurrencies, StakingReward } from '../../../../modules';
import { useSelector } from "react-redux";

interface StackingItemProps {
    staking_id: string;
    currency_id: string;
    staking_name: string;
    rewards: StakingReward[];
    active: boolean
    icon_url: string;
}

const StakingItemStyles = styled.div`
    #stacking-item {
        position: relative;
        width: 100%;
        max-height: 450px;
        border-radius: 5px;
        background-color: #313445;
        .card-image {
            height: 200px;
            display: flex;
            align-items: center;
            background-color: #434A57;
            padding: 40px;
            img {
                width: 100%;
                height: 100%;
            }
        }
    
        .image {
            background-color: #434A57;
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
            background-color: #313445;
            padding: 1rem 2rem;
            .title, .reward-container {
                padding: 0.5rem 0;
            }
            .title {
                margin: 10px 0;
                color: #fff;
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
                    background-color: #434A57;
                    border-radius: 5px;
                    margin-bottom: 1rem;
                    &__rate {
                        font-weight: bold;
                        font-size: 1.2rem;
                        color: #fff;
                    }
                }
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
                    will-change: background-color;
                    transition: background-color .2s;

                    :hover {
                        background-color: #35cf8f;
                    }
                }

                .learn-more-btn {
                    margin-bottom: 0;
                    background-color: #434A57;
                    color: #fff;
                    flex: 1 1 0%;
                    padding: 0 5px;
                    border-radius: 5px;
                    white-space: nowrap;
                    font-size: 13px;
                    line-height: 36px;
                    margin: 3px;
                    text-align: center;
                    will-change: background-color;
                    transition: background-color .2s;
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
    const { staking_id, currency_id, staking_name, rewards, active } = props;
    const history = useHistory();
    const currencies = useSelector(selectCurrencies);
    const handleGoStacking = () => {
        const location = {
            pathname: '/staking/detail/' + staking_id
        }
        history.push(location);
    }

    const getCryptoIcon = (currency_id: string): string => {
        
        const currency = currencies.find((currency: any) => currency.id === currency_id);
        try {
            return require(`../../../../../node_modules/cryptocurrency-icons/128/color/${currency_id.toLowerCase()}.png`);
        } catch (err) {
            if (currency) return currency.icon_url;
            return require('../../../../../node_modules/cryptocurrency-icons/svg/color/generic.svg');
        }
    };
    
    return (
        <StakingItemStyles>
            <div id="stacking-item">
                <section className="image">
                    <div className="logo-image">
                        <img src={getCryptoIcon(currency_id)} alt="" />
                    </div>
                </section>
                <section className="text">
                    <h3 className="title">
                        {staking_name}
                    </h3>
                    <div className="reward-container flex-spacer">
                        {
                            rewards.map(reward => (
                                <div className="reward-box">
                                    <div className="reward-box__rate">{Number(reward.annual_rate) * 100}%</div>
                                    <div className="reward-box__period text-white">{Number(reward.period)} days</div>
                                </div>
                            ))
                        }
                    </div>
                    <div className="flex-spacer"></div>
                    <div className="mt-3 buttons d-flex flex-row justify-content-between">
                        <button onClick={handleGoStacking} className="go-stack-btn">Go Stack</button>
                        <button className="learn-more-btn">Learn More</button>
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
