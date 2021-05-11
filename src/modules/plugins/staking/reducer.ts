// import { sliceArray } from '../../../../helpers';
import { StakingListActions } from './actions';
import {
    STAKING_LIST_FETCH,
    STAKING_LIST_DATA,
    STAKING_LIST_ERROR,
} from './constants';
import {
    StakingListState,
} from './types';

export const initialStakingList: StakingListState = {
    payload: [],
    loading: false,
};

export const stakingListReducer = (state = initialStakingList, action: StakingListActions): StakingListState => {
    switch (action.type) {
        case STAKING_LIST_FETCH:
            return {
                ...state,
                loading: true,
                error: undefined,
            };
        case STAKING_LIST_DATA:
            const { payload } = action.payload;

            return {
                ...state,
                payload: payload,
                loading: false,
                error: undefined,
            };
        case STAKING_LIST_ERROR:
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        default:
            return state;
    }
};
