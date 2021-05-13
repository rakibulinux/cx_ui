import * as React from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import { selectCurrencies, Stake } from '../../../../modules';
import { useSelector } from "react-redux";
import * as classNames from 'classnames';
import Countdown from 'react-countdown';

const StakingItemStyles = styled.div`
    #stacking-item {
        position: relative;
        width: 100%;
        min-height: 450px;
        background-color: #313445;
        box-shadow: 0px 4px 8px -2px rgba(0, 0, 0, 0.15);

        .staking-item-container {
            position: absolute;
            width: 100%;
            height: 100%;
            top:0;
            left: 0;
        .image {
            background-color: #434A57;
            background-position: 50% 50%;
            background-size: cover;
            display: flex;
            gap: normal;
            width: 100%;
            height: 45%;
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
            height: 35%;
            background-color: #313445;
            padding: 1rem 1rem;
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
                justify-content: space-between;
                flex-wrap: wrap;
                .reward-box {
                    box-sizing: border-box;
                    padding: 10px;
                    width: 31.33%;
                    text-align: center;
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
        }
        .buttons {
                height: 20%;
                margin: auto -3px -3px;
                padding: 1rem 1rem;
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
            font-size: 30px;
            background-color: #313445c9;
            text-align: center;
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 997;
            color: rgb(255, 255, 255);
        }

        .stacking-item__label {
            position: absolute;
            right: 0;
            top: 0;
            width: 7rem;
            height: 2rem;
            text-align: center;
            justify-content: center;
            align-items: center;
            display: flex;
            color: #fff;
            font-weight: 700;
            border-radius: 0 0 0 5px;
        }

        .stacking-item__label-upcoming {
            background: #FFE000;  /* fallback for old browsers */
            background: -webkit-linear-gradient(to left, #799F0C, #FFE000);  /* Chrome 10-25, Safari 5.1-6 */
            background: linear-gradient(to left, #799F0C, #FFE000); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
        }

        .stacking-item__label-running {
            background: #1D976C;  /* fallback for old browsers */
            background: -webkit-linear-gradient(to right, #93F9B9, #1D976C);  /* Chrome 10-25, Safari 5.1-6 */
            background: linear-gradient(to right, #93F9B9, #1D976C); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
        }
        .stacking-item__label-ended {
            background: #bdc3c7;  /* fallback for old browsers */
            background: -webkit-linear-gradient(to left, #2c3e50, #bdc3c7);  /* Chrome 10-25, Safari 5.1-6 */
            background: linear-gradient(to left, #2c3e50, #bdc3c7); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

        }

        .timer {
            width: 100%;
            text-align: center;
            height: 30px;
            background: #434A57;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #fff;
            border-radius: 5px;
        }
    }
`;

type Props = Stake;

export const StakingItem: React.FC<Props> = (props: Props) => {
    const { staking_id, currency_id, staking_name, rewards, active, status, start_time, end_time } = props;
    const history = useHistory();
    const currencies = useSelector(selectCurrencies);
    const handleGoStacking = () => {
        const location = {
            pathname: '/stake/detail/' + staking_id
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

    const statusClassnames = classNames("stacking-item__label",
        status === "upcoming" ? "stacking-item__label-upcoming" :
            status === "running" ? "stacking-item__label-running" :
                status === "ended" ? "stacking-item__label-ended" : "");

    const renderProgressBar = () => {
        return (
            <div className="timer" hidden={status === 'ended'}>
                <span className="text-warning" hidden={status !== "upcoming"}>Start in: <Countdown date={new Date(start_time)} renderer={renderer} /></span>
                <span className="text-danger" hidden={status !== "running"}>End in: <Countdown date={new Date(end_time)} renderer={renderer} /></span>
            </div>
        );
    }

    const renderer = ({ days, hours, minutes, seconds, completed }) => {
        if (completed) {
            // Render a completed state
            // window.location.reload(false);
            return <div>
                <div>00 <span>Days</span></div>
                <div>00 <span>Hours</span></div>
                <div>00 <span>Mininutes</span></div>
                <div>00 <span>Seconds</span></div>
            </div>;
        } else {
            // Render a countdown
            return <span>{days}:{hours}:{minutes}:{seconds}</span>
        }
    };

    return (
        <StakingItemStyles>
            <div id="stacking-item">
                <div className={statusClassnames}>
                    <span>{status.toUpperCase()}</span>
                </div>
                <div className="staking-item-container d-flex flex-column">
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
                                rewards.map((reward, index) => (
                                    <div className="reward-box" key={index}>
                                        <div className="reward-box__rate">{Number(reward.annual_rate) * 100}%</div>
                                        <div className="reward-box__period text-white">{Number(reward.period)} days</div>
                                    </div>
                                ))
                            }
                        </div>
                        <div className="flex-spacer"></div>
                        {renderProgressBar()}
                    </section>
                    <section className="buttons d-flex flex-row justify-content-between align-items-end">
                        <button onClick={handleGoStacking} className="go-stack-btn">Go Stake</button>
                        <button className="learn-more-btn">Learn More</button>
                    </section>
                </div>
                <div hidden={status !== 'ended'} className="stacking-item__disabled text-info">
                    <span>Stake finished</span>
                </div>
                <div hidden={!active} className="stacking-item__disabled">
                    <span>Stake is disabled</span>
                </div>
            </div>
        </StakingItemStyles>

    )
}
