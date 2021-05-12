import * as React from 'react'
import { RegisterStake, StakingInfo, UnStake } from '../../containers';
import Tabs, { TabPane } from 'rc-tabs';
import styled from 'styled-components';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { selectStakingList, Staking, stakingListFetch } from '../../../../modules';

const TabsStyle = styled.div`
    background: rgba(132, 142, 156, 0.35);
    box-sizing: border-box;
    border-radius: 5px;
    .rc-tabs {
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
            background-color: #2FB67E;
            
        }
        .rc-tabs-ink-bar {
            display: none;
        }
    }
`;

const StakingDetailScreenStyles = styled.div`
    .staking-notes {
        background: rgba(132, 142, 156, 0.35);
        border-radius: 5px;
        padding: 1rem 3rem;
        color: #fff;
        font-size: 1.2rem;
        list-style-type: square;
        li {
            margin-bottom: 0.5em;
        }
    }
`;

const initialStakingItem = {
    staking_id: '',
    currency_id: '',
    staking_name: '',
    icon_url: '',
    description: '',
    start_time: '',
    end_time: '',
    active: false,
    rewards: [],
}

export const StakingDetailScreen = () => {

    const [stakingItemState, setStakingItemState] = React.useState<Staking>(initialStakingItem);
    const { staking_id } = useParams<{ staking_id: string }>();
    const staking_list = useSelector(selectStakingList);

    React.useEffect(() => {
        const staking_item = staking_list.find(staking => staking.staking_id == staking_id)
            || initialStakingItem;
        setStakingItemState(staking_item);
    }, [staking_id, staking_list]);

    // dispatch
    const dispatch = useDispatch();
    const dispatchFetchStakingList = () => dispatch(stakingListFetch());

    React.useEffect(() => {
        dispatchFetchStakingList();
    }, []);

    return (
        <StakingDetailScreenStyles>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h1>{stakingItemState.currency_id.toUpperCase()} Staking</h1>
                    </div>
                </div>
                <div className="row mt-5">
                    <div className="col-12">
                        <StakingInfo
                            currency_id={stakingItemState.currency_id}
                            staking_name={stakingItemState.staking_name}
                            logo_image={stakingItemState.icon_url}
                            description={stakingItemState.description}
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
                            <Tabs defaultActiveKey="stake" >
                                <TabPane tab="STAKE" key="stake">
                                    <RegisterStake
                                        currency_id={stakingItemState.currency_id}
                                        start_time={stakingItemState.start_time}
                                        end_time={stakingItemState.end_time}
                                        rewards={stakingItemState.rewards}
                                    />
                                </TabPane>
                                <TabPane tab="UNSTAKE" key="unstake">
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
