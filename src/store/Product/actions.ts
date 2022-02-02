import { Product } from '../../models/Product'
import * as types from './actionTypes'

export const productLoad = (id: any): any => ({
  type: types.PRODUCT_LOAD,
  payload: id,
})

export const productLoadSuccess = (): any => ({
  type: types.PRODUCT_LOAD_SUCCESS,
})

export const productLoadFail = (error: any): any => ({
  type: types.PRODUCT_LOAD_FAIL,
  payload: error,
})

export const productLoadErrorClear = (): any => ({
  type: types.PRODUCT_LOAD_ERROR_CLEAR,
})

export const productSet = (product: Product): any => ({
  type: types.PRODUCT_SET,
  payload: product,
})

export const productClear = (): any => ({
  type: types.PRODUCT_CLEAR,
})
