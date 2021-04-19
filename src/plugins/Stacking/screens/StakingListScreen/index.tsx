import * as classnames from 'classnames';
import * as React from 'react';
import styled from 'styled-components';
import { StakingList } from '../../containers';

const StackingListScreenStyles = styled.div`
    button {
        outline: none;
        border: none;
    }
    .stack-tab-btn {
        min-height: 45px;
        width: 190px;
        box-sizing: border-box;
        font-size: 17px;
        color: #4231c8;
        padding: 3px 7px;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        margin: 0;
        border-left: 1px solid #4231c8;
        transition: ease-in-out 0.3s;
    }
    .stack-tab-btn__active {
        color: #fff;
        background-color: #4231c8;
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
                        <h1>Stack</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 d-flex flex-row justify-content-end">
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
                </div>
                <div className="row mt-5">
                    <StakingList />
                </div>
            </div>
        </StackingListScreenStyles>

    )
}
