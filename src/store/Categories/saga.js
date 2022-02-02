import { call, put, takeEvery } from 'redux-saga/effects'

import axios from 'axios'
import { Category } from '../../models/Category'
import * as types from './actionTypes'
import * as actions from './actions'

function fetchCategoriesLoad() {
  return axios.get('categories')
    .then((response) => response.data)
    .catch((err) => {
      throw err
    })
}

function* categoriesLoad() {
  let result
  let loadError

  try {
    result = yield call(fetchCategoriesLoad)
  } catch (error) {
    loadError = error.message
  }

  if (result) {
    let categories = result.map((category) => new Category(category))

    yield put(actions.categoriesSet(categories))
    yield put(actions.categoriesLoadSuccess())
  } else {
    yield put(actions.categoriesLoadFail(loadError))
  }
}

function* categoriesSaga() {
  yield takeEvery(types.CATEGORIES_LOAD, categoriesLoad)
}

export default categoriesSaga
