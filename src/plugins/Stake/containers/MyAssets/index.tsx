import * as React from 'react'
import styled from 'styled-components';

const MyAssetsStyles = styled.div`
    display: block;
    padding: 30px 20px;
    border: 1px solid hsla(0,0%,85.5%,.5);
    font-size: 14px;
    color: #7b7b7b;

    .assets-container {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        margin-left: 20px;
        margin-right: 20px;

        .key {
            flex: 0 1 0%;
            white-space: nowrap;
            padding-bottom: 3px;
            text-transform: capitalize;
            color: #fff;
        }

        .value {
            font-size: 16px;
            color: #fff;
        }

        .staked-amount-title {
            font-size: 19px;
            
        }

        .staked-amount-value {
            font-size: 19px;
            font-weight: 700;
        }
    }
`;

export const MyAssets = () => {
    return (
        <MyAssetsStyles>
            <div className="assets-container">
                <span className="key staked-amount-title text-primary">staked amount</span>
                <span className="value staked-amount-value text-primary">0.00000000</span>
            </div>
            <div className="assets-container">
                <span className="key text-danger">Locked-Up(Staked)</span>
                <span className="value text-danger">0.00000000</span>
            </div>
            <div className="assets-container">
                <span className="key text-info">Available For Unstaking</span>
                <span className="value text-info">0.00000000</span>
            </div>
            <hr />
            <div className="assets-container">
                <span className="key">Available For Unstaking</span>
                <span className="value">0.00000000</span>
            </div>
            <div className="assets-container">
                <span className="key">Total Balance</span>
                <span className="value">0.00000000</span>
            </div>
        </MyAssetsStyles>
    )
}
