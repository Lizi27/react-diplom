import * as types from './actionTypes'

export const orderSent = (order: any): any => ({
  type: types.ORDER_SENT,
  payload: order,
})

export const orderSentSuccess = (): any => ({
  type: types.ORDER_SENT_SUCCESS,
})

export const orderSentFail = (error: any): any => ({
  type: types.ORDER_SENT_FAIL,
  payload: error,
})

export const orderSentErrorClear = (): any => ({
  type: types.ORDER_SENT_ERROR_CLEAR,
})

export const productClear = (): any => ({
  type: types.ORDER_CLEAR,
})
