import * as React from 'react';
import { StakingItem } from '../../components';

export const StakingList = () => {
    const stakings = [
        {
            "id": "1",
            "currency_id": "CARR",
            "step": 2,
            "start_time": "2021-04-07T05:00:00.000Z",
            "end_time": "2021-04-10T05:00:00.000Z",
            "active": true,
            "logo_image": "https://static.probit.com/files/banner/carr_logo.png",
            "event_name": "Carrnomaly (CARR) Round 3",
            "prize_string": "Up to 30% per annum rewards",
            "reward_desc": [
                {
                    "period": 2160,
                    "totalAmount": "266217.6379",
                    "capAmount": undefined,
                    "minAmount": "1",
                    "capAmountPerUser": undefined,
                    "annualRate": "0.2",
                    "paymentTime": "end",
                },
                {
                    "period": 2880,
                    "totalAmount": "62355.7244",
                    "capAmount": undefined,
                    "minAmount": "1",
                    "capAmountPerUser": undefined,
                    "annualRate": "0.25",
                    "paymentTime": "end",
                },
            ]
        },
        {
            "id": "1",
            "currency_id": "CARRSOC",
            "step": 2,
            "start_time": "2021-04-07T05:00:00.000Z",
            "end_time": "2021-04-10T05:00:00.000Z",
            "active": false,
            "logo_image": "https://static.probit.com/files/banner/carr_logo.png",
            "event_name": "SODA coin (SOC)",
            "prize_string": "Up to 30% per annum rewards",
            "reward_desc": [
                {
                    "period": 2160,
                    "totalAmount": "266217.6379",
                    "capAmount": undefined,
                    "minAmount": "1",
                    "capAmountPerUser": undefined,
                    "annualRate": "0.6",
                    "paymentTime": "end",
                }
            ]
        },
        {
            "id": "1",
            "currency_id": "XANK",
            "step": 2,
            "start_time": "2021-04-07T05:00:00.000Z",
            "end_time": "2021-04-10T05:00:00.000Z",
            "active": true,
            "logo_image": "https://static.probit.com/files/banner/carr_logo.png",
            "event_name": "Xank (XANK)",
            "prize_string": "Up to 30% per annum rewards",
            "reward_desc": [
                {
                    "period": 1440,
                    "totalAmount": "266217.6379",
                    "capAmount": undefined,
                    "minAmount": "1",
                    "capAmountPerUser": undefined,
                    "annualRate": "0.21",
                    "paymentTime": "end",
                },
                {
                    "period": 2880,
                    "totalAmount": "62355.7244",
                    "capAmount": undefined,
                    "minAmount": "1",
                    "capAmountPerUser": undefined,
                    "annualRate": "0.30",
                    "paymentTime": "end",
                },
            ]
        },
        {
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
        }
    ];
    return (
        <React.Fragment>
            {
                stakings.map(stacking => (
                    <div className="col-lg-4 col-md-6 mb-5">
                        <StakingItem
                            currency_id={stacking.id} 
                            logo_image={stacking.logo_image}
                            event_name={stacking.event_name}
                            reward_desc={stacking.reward_desc}
                            active={stacking.active}
                        />
                    </div>
                ))
            }
        </React.Fragment>
    )
}
