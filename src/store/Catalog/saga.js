import { call, put, takeEvery } from 'redux-saga/effects'

import axios from 'axios'
import { Product } from '../../models/Product'
import * as types from './actionTypes'
import * as actions from './actions'

function fetchCatalogLoad(action) {
  return axios.get('items', {
    params: action.payload,
  })
    .then((response) => response.data)
    .catch((err) => {
      throw err
    })
}

function* catalogLoad(action) {
  let result
  let loadError

  try {
    result = yield call(fetchCatalogLoad, action)
  } catch (error) {
    loadError = error.message
  }

  if (result) {
    let orders = result.map((order) => new Product(order))

    if (orders.length === 0) {
      yield put(actions.catalogLoadMoreSetEmpty(true))
    } else {
      if (orders.length < 6) {
        yield put(actions.catalogLoadMoreSetEmpty(true))
      }
      yield put(actions.catalogSet(orders))
      yield put(actions.catalogLoadSuccess())
    }
  } else {
    yield put(actions.catalogLoadFail(loadError))
  }
}

function* catalogLoadMore(action) {
  let result
  let loadError

  try {
    result = yield call(fetchCatalogLoad, action)
  } catch (error) {
    loadError = error.message
  }

  if (result) {
    let orders = result.map((order) => new Product(order))

    if (orders.length === 0) {
      yield put(actions.catalogLoadMoreSetEmpty(true))
    } else {
      if (orders.length < 6) {
        yield put(actions.catalogLoadMoreSetEmpty(true))
      }
      yield put(actions.catalogAdd(orders))
      yield put(actions.catalogLoadSuccess())
    }
  } else {
    yield put(actions.catalogLoadFail(loadError))
  }
}

function* catalogSaga() {
  yield takeEvery(types.CATALOG_LOAD, catalogLoad)
  yield takeEvery(types.CATALOG_LOAD_MORE, catalogLoadMore)
}

export default catalogSaga
