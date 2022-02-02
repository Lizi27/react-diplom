import { call, put, takeEvery } from 'redux-saga/effects'

import axios from 'axios'
import { Product } from '../../models/Product'
import * as types from './actionTypes'
import * as actions from './actions'

function fetchProductLoad(action) {
  return axios.get(`items/${action.payload}`)
    .then((response) => response.data)
    .catch((err) => {
      throw err
    })
}

function* productLoad(action) {
  let result
  let loadError

  try {
    result = yield call(fetchProductLoad, action)
  } catch (error) {
    loadError = error.message
  }

  if (result) {
    yield put(actions.productSet(new Product(result)))
    yield put(actions.productLoadSuccess())
  } else {
    yield put(actions.productLoadFail(loadError))
  }
}

function* productSaga() {
  yield takeEvery(types.PRODUCT_LOAD, productLoad)
}

export default productSaga
