import * as classnames from 'classnames';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { selectStakingList, stakingListFetch } from '../../../../modules';
import { StakingList } from '../../containers';

const StackingListScreenStyles = styled.div`
    border-radius: 5px;
    button {
        outline: none;
        border: none;
    }
    .staking-buttons {
        display: flex;
        flex-direction: row;
        width: 570px;
        background: rgba(132, 142, 156, 0.35);
        border: 1px solid #2FB67E;
        box-sizing: border-box;
        border-radius: 5px;
    }
    .stack-tab-btn {
        min-height: 45px;
        width: 190px;
        box-sizing: border-box;
        font-size: 17px;
        color: #646577;
        padding: 3px 7px;
        line-height: 18px;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        margin: 0;
        background-color: transparent;
        box-sizing: border-box;
        transition: ease-in-out 0.1s;
    }
    .stack-tab-btn__active {
        color: #fff;
        background: #2FB67E;
        font-weight: 700;
        z-index: 100;
    }
`;

export const StakingListScreen = () => {

    // state
    const [filterStackingState, setFilterStackingState] = React.useState<'upcoming' | 'running' | 'all'>("running");
    const upcomingButtonClassName = classnames('stack-tab-btn', filterStackingState === 'upcoming' ? 'stack-tab-btn__active' : '');
    const runningButtonClassName = classnames('stack-tab-btn', filterStackingState === 'running' ? 'stack-tab-btn__active' : '');
    const allButtonClassName = classnames('stack-tab-btn', filterStackingState === 'all' ? 'stack-tab-btn__active' : '');

    // store
    const staking_list = useSelector(selectStakingList);

    // dispatch
    const dispatch = useDispatch();
    const dispatchFetchStakingList = () => dispatch(stakingListFetch());

    React.useEffect(() => {
        dispatchFetchStakingList();
    }, []);

    const renderStakingList = () => {
        return filterStackingState === 'upcoming' ? <StakingList staking_list={staking_list.filter(staking => staking.status === 'upcoming')} />
            : filterStackingState === 'running' ? <StakingList staking_list={staking_list.filter(staking => staking.status === 'running')} />
                : <StakingList staking_list={staking_list} />
    }

    return (
        <StackingListScreenStyles>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h1>Stake</h1>
                    </div>
                </div>
                <div className="staking-buttons">
                    <button
                        onClick={() => setFilterStackingState('upcoming')}
                        className={upcomingButtonClassName}>
                        Upcoming
                            </button>
                    <button
                        onClick={() => setFilterStackingState('running')}
                        className={runningButtonClassName}>
                        Running
                            </button>
                    <button
                        onClick={() => setFilterStackingState('all')}
                        className={allButtonClassName}>
                        All
                        </button>
                </div>

                <div className="row mt-5">
                    {renderStakingList()}
                </div>


            </div>
        </StackingListScreenStyles>

    )
}
