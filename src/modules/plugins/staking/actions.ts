import { CommonError } from '../../../modules/types';
import {
    STAKING_LIST_DATA,
    STAKING_LIST_ERROR,
    STAKING_LIST_FETCH,
} from './constants';
import {
    StakingListState,
} from './types';

export interface StakingListFetch {
    type: typeof STAKING_LIST_FETCH;
}

export interface StakingListData {
    type: typeof STAKING_LIST_DATA;
    payload: StakingListState;
}

export interface StakingListError {
    type: typeof STAKING_LIST_ERROR;
    error: CommonError;
}

export type StakingListActions =
StakingListFetch
    | StakingListData
    | StakingListError;

export const stakingListFetch = (): StakingListFetch => ({
    type: STAKING_LIST_FETCH,
});

export const stakingListData = (payload: StakingListData['payload']): StakingListData => ({
    type: STAKING_LIST_DATA,
    payload,
});

export const stakingListError = (error: StakingListError['error']): StakingListError => ({
    type: STAKING_LIST_ERROR,
    error,
});
