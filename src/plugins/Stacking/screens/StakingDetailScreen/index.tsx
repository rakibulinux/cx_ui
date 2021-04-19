import * as React from 'react'
import { RegisterStake, StakingInfo } from '../../containers'
export const StakingDetailScreen = () => {
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-12">
                    <h1>VLX Stack</h1>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <StakingInfo
                        event_name={'VELAS (VLX)'}
                        logo_image={'https://static.probit.com/files/banner/VELAS.png'}
                        prize_string={'Get 1.50 - 1.65% Monthly Rewards'}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col-6">
                    <ul>
                        <li>When setting up a stake, the tokens will be locked up and can only be unstaked after a certain period of time.</li>
                        <li>You can set the stake settings for the "Available amount" of the "Total amount."</li>
                        <li>Even after the lockup is released, you must release the stake yourself before the amount is reflected in the "Available amount".</li>
                    </ul>
                </div>
                <div className="col-6">
                    <RegisterStake />
                </div>
            </div>
        </div>
    )
}
