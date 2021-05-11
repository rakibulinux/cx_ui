import { takeLatest } from 'redux-saga/effects';
import {
    STAKING_LIST_FETCH
} from '../constants';
import { fetchStakingListSaga } from './stakingList';
export function* rootStakingSaga() {
    yield takeLatest(STAKING_LIST_FETCH, fetchStakingListSaga);
}
