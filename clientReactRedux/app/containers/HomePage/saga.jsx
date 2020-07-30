/**
 * Gets the repositories of the user from Github
 */

import { call, put, select, takeLatest, all } from 'redux-saga/effects';
import {
  FETCH_DATA_START,
  setFetchData,
  setFetchError,
  POST_CREATE_NUTRITION_START,
  setCreateNutData,
  setCreateNutError,
  DELETE_NUTRITION_START,
  setDelNutData,
  setDelNutError
} from './actions';
import api from '../../api';

export function* getFetchData(options) {
  try {
    let data = yield call(() => api.getFetchData());
    yield put(setFetchData(data));
  } catch (err) {
    yield put(setFetchError(err));
  }
}

export function* postCreateNut(options) {
  try {
    if(options.payLoad) {
      let data = yield call(() => api.postCreateNut(options.payLoad));
      yield put(setCreateNutData(data));
    }
  } catch (err) {
    yield put(setCreateNutError(err));
  }
}

export function* deleteNutrition(options) {
  try {
    if(options.payLoad) {
      let data = yield call(() => api.deleteCreateNut(options.payLoad));
      yield put(setDelNutData(data));
    }
  } catch (err) {
    yield put(setDelNutError(err));
  }
}

export function* fetchDataWatcher() {
  yield takeLatest(FETCH_DATA_START, getFetchData)
}

export function* postCreateNutWatcher() {
  yield takeLatest(POST_CREATE_NUTRITION_START, postCreateNut)
}

export function*  deleteNutWatcher() {
  yield takeLatest(DELETE_NUTRITION_START, deleteNutrition)
}
/**
 * Root saga manages watcher lifecycle
 */
export default function* nutritionData() {
    yield all([
      ...fetchDataWatcher(),
      ...postCreateNutWatcher(),
      ...deleteNutWatcher()
    ])
}
