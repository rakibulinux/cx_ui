import * as classnames from 'classnames';
import * as React from 'react';
import styled from 'styled-components';
import { StakingList } from '../../containers';

const StackingListScreenStyles = styled.div`
    border-radius: 5px;
    button {
        outline: none;
        border: none;
    }
    .staking-buttons {
        z-index: 10;
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
        border-bottom: 5px solid #30B57E;
        font-weight: 700;
        z-index: 100;
    }
`;

export const StakingListScreen = () => {
    const [filterStackingState, setFilterStackingState] = React.useState<'upcoming' | 'running' | 'all'>("running");
    const upcomingButtonClassName = classnames('stack-tab-btn', filterStackingState === 'upcoming' ? 'stack-tab-btn__active' : '');
    const runningButtonClassName = classnames('stack-tab-btn', filterStackingState === 'running' ? 'stack-tab-btn__active' : '');
    const allButtonClassName = classnames('stack-tab-btn', filterStackingState === 'all' ? 'stack-tab-btn__active' : '');

    return (
        <StackingListScreenStyles>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h1>Staking</h1>
                    </div>
                </div>
                <div className="d-flex flex-row justify-content-start staking-buttons">
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
                    <StakingList />
                </div>
            </div>
        </StackingListScreenStyles>

    )
}
