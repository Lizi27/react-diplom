import { call, put, takeEvery } from 'redux-saga/effects'

import axios from 'axios'
import { Product } from '../../models/Product'
import * as types from './actionTypes'
import * as actions from './actions'

function fetchTopSalesLoad() {
  return axios.get('top-sales')
    .then((response) => response.data)
    .catch((err) => {
      throw err
    })
}

function* topSalesLoad() {
  let result
  let loadError

  try {
    result = yield call(fetchTopSalesLoad)
  } catch (error) {
    loadError = error.message
  }

  if (result) {
    let orders = result.map((order) => new Product(order))

    yield put(actions.topSalesSet(orders))
    yield put(actions.topSalesLoadSuccess())
  } else {
    yield put(actions.topSalesLoadFail(loadError))
  }
}

function* topSalesSaga() {
  yield takeEvery(types.TOP_SALES_LOAD, topSalesLoad)
}

export default topSalesSaga
