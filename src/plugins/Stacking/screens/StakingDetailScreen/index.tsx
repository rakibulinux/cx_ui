import * as React from 'react'
import { RegisterStake, StakingInfo, UnStake } from '../../containers';
import Tabs, { TabPane } from 'rc-tabs';
import styled from 'styled-components';

const TabsStyle = styled.div`
    .rc-tabs {
        border: 1px solid hsla(0,0%,85.5%,.5);
        padding: 0 0 10px 0;
    }
    .rc-tabs-nav-list {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        
        .rc-tabs-tab {
            width: 100%;
            padding: 10px 0;
            font-size: 1.5rem;
            transition: ease-in-out 0.3s;
            border-bottom: 4px solid transparent;
            background-color: #313445;
            .rc-tabs-tab-btn {
                text-align: center;
                outline: none;
                border: none;
                cursor: pointer;
            }
            :hover {
                font-weight: bold;
                color: #fff;
            }
        }
        
        .rc-tabs-tab-active {
            font-weight: bold;
            color: #fff;
            background-color: #313445;
            
        }
        .rc-tabs-ink-bar {
            display: none;
        }
    }
`;

const StakingDetailScreenStyles = styled.div`
    .staking-notes {
        color: #fff;
        font-size: 1.2rem;
        margin: 0;
        list-style-type: square;
        padding-left: 16px;
        li {
            margin-bottom: 0.5em;
        }
    }
`;

export const StakingDetailScreen = () => {

    const stake_detail = {
        "id": "1",
        "currency_id": "ETHP",
        "step": 2,
        "start_time": "2021-04-07T05:00:00.000Z",
        "end_time": "2021-04-10T05:00:00.000Z",
        "active": true,
        "logo_image": "https://static.probit.com/files/dump/web/banner-ethp.png",
        "event_name": "ETHPlus (ETHP)",
        "prize_string": "Up to 30% per annum rewards",
        "reward_desc": [
            {
                "period": 720,
                "totalAmount": "266217.6379",
                "capAmount": undefined,
                "minAmount": "1",
                "capAmountPerUser": undefined,
                "annualRate": "0.243",
                "paymentTime": "end",
            },
            {
                "period": 2160,
                "totalAmount": "62355.7244",
                "capAmount": undefined,
                "minAmount": "1",
                "capAmountPerUser": undefined,
                "annualRate": "0.365",
                "paymentTime": "end",
            },
        ]
    };

    return (
        <StakingDetailScreenStyles>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h1>{stake_detail.currency_id.toUpperCase()} Staking</h1>
                    </div>
                </div>
                <div className="row mt-5">
                    <div className="col-12">
                        <StakingInfo
                            event_name={stake_detail.event_name}
                            logo_image={stake_detail.logo_image}
                            prize_string={stake_detail.prize_string}
                        />
                    </div>
                </div>
                <div className="row mt-5">
                    <div className="col-6">
                        <ul className="staking-notes">
                            <li>When setting up a stake, the tokens will be locked up and can only be unstaked after a certain period of time.</li>
                            <li>You can set the stake settings for the "Available amount" of the "Total amount."</li>
                            <li>Even after the lockup is released, you must release the stake yourself before the amount is reflected in the "Available amount".</li>
                        </ul>
                    </div>
                    <div className="col-6">
                        <TabsStyle>
                            <Tabs defaultActiveKey="1" >
                                <TabPane tab="STAKE" key="1">
                                    <RegisterStake
                                        currency_id={stake_detail.currency_id}
                                        start_time={stake_detail.start_time}
                                        end_time={stake_detail.end_time}
                                        reward_desc={stake_detail.reward_desc}

                                    />
                                </TabPane>
                                <TabPane tab="UNSTAKE" key="2">
                                    <UnStake />
                                </TabPane>

                            </Tabs>
                        </TabsStyle>

                    </div>
                </div>
            </div>
        </StakingDetailScreenStyles>

    )
}
