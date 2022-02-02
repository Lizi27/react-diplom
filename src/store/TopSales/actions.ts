import * as types from './actionTypes'

export const topSalesLoad = (): any => ({
  type: types.TOP_SALES_LOAD,
})

export const topSalesLoadSuccess = (): any => ({
  type: types.TOP_SALES_LOAD_SUCCESS,
})

export const topSalesLoadFail = (error: any): any => ({
  type: types.TOP_SALES_LOAD_FAIL,
  payload: error,
})

export const topSalesLoadErrorClear = (): any => ({
  type: types.TOP_SALES_LOAD_ERROR_CLEAR,
})

export const topSalesSet = (topSales: Array<any>): any => ({
  type: types.TOP_SALES_SET,
  payload: topSales,
})

export const topSalesClear = (): any => ({
  type: types.TOP_SALES_CLEAR,
})
