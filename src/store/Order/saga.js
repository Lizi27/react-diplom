import { call, put, takeEvery } from 'redux-saga/effects'

import axios from 'axios'
import { toast } from 'react-toastify'
import * as cartActions from '../Cart/actions'
import * as types from './actionTypes'
import * as actions from './actions'

function fetchOrderSent(action) {
  return axios.post('order', action.payload)
    .then((response) => response.data)
    .catch((err) => {
      throw err
    })
}

const delay = (time) => new Promise((resolve) => setTimeout(resolve, time))

function* orderSent(action) {
  let loadError

  try {
    yield call(fetchOrderSent, action)
  } catch (error) {
    loadError = error.message
  }

  if (loadError) {
    yield put(actions.orderSentFail(loadError))
  } else {
    yield put(actions.orderSentSuccess())
    yield put(actions.orderSentErrorClear())
    toast.success('Заказ успешно отправлен. Ожидайте, мы с вами свяжемся')
    yield call(delay, 6000)
    yield put(cartActions.cartClear())
  }
}

function* orderSaga() {
  yield takeEvery(types.ORDER_SENT, orderSent)
}

export default orderSaga
