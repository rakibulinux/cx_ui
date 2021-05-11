import { RootState } from '../../index';
import { StakingListState } from './types';

export const selectStakingList = (state: RootState): StakingListState['payload'] => state.plugins.staking_list.payload;
