import { CommonState } from '../../../modules/types';

export interface StakingReward {
    reward_id: string;
    staking_id: string;
    period: string;
    total_amount: string;
    cap_amount: string;
    min_amount: string;
    cap_amount_per_user: string;
    annual_rate: string;
    payment_time: string;
}

export interface Staking {
    staking_id: string;
    currency_id: string;
    staking_name: string;
    description: string;
    start_time: string;
    end_time: string;
    active: boolean;
    rewards: StakingReward[];
    icon_url: string;
    status?: 'upcoming' | 'running';
}

export interface StakingListState extends CommonState {
    payload: Staking[];
    loading: boolean;
}
