import { put } from 'redux-saga/effects';
// import { API, RequestOptions } from '../../../../../api';
import axios from '../../../../plugins/api/index';

import {
    stakingListData,
    stakingListError,
    StakingListFetch
} from '../actions';
import { Stake } from '../types';

export function* fetchStakingListSaga(action: StakingListFetch) {
    try {
        const stakingList = yield axios.get<Stake[]>('staking/list/fetch/all');
        yield put(stakingListData(stakingList.data));
    } catch (error) {
        yield put(stakingListError(error));
    }
}

