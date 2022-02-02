import { Product } from '../../models/Product'
import * as types from './actionTypes'

export const catalogLoad = (filter: any): any => ({
  type: types.CATALOG_LOAD,
  payload: filter,
})

export const catalogLoadMore = (filter: any): any => ({
  type: types.CATALOG_LOAD_MORE,
  payload: filter,
})

export const catalogLoadMoreSetEmpty = (empty: boolean): any => ({
  type: types.CATALOG_LOAD_MORE_SET_EMPTY,
  payload: empty,
})

export const catalogLoadSuccess = (): any => ({
  type: types.CATALOG_LOAD_SUCCESS,
})

export const catalogLoadFail = (error: any): any => ({
  type: types.CATALOG_LOAD_FAIL,
  payload: error,
})

export const catalogLoadErrorClear = (): any => ({
  type: types.CATALOG_LOAD_ERROR_CLEAR,
})

export const catalogSet = (catalog: Product[]): any => ({
  type: types.CATALOG_SET,
  payload: catalog,
})

export const catalogAdd = (catalog: Product[]): any => ({
  type: types.CATALOG_ADD,
  payload: catalog,
})

export const catalogClear = (): any => ({
  type: types.CATALOG_CLEAR,
})
