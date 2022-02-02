import * as types from './actionTypes'

export const categoriesLoad = (): any => ({
  type: types.CATEGORIES_LOAD,
})

export const categoriesLoadSuccess = (): any => ({
  type: types.CATEGORIES_LOAD_SUCCESS,
})

export const categoriesLoadFail = (error: any): any => ({
  type: types.CATEGORIES_LOAD_FAIL,
  payload: error,
})

export const categoriesLoadErrorClear = (): any => ({
  type: types.CATEGORIES_LOAD_ERROR_CLEAR,
})

export const categoriesSet = (categories: Array<any>): any => ({
  type: types.CATEGORIES_SET,
  payload: categories,
})

export const categoriesClear = (): any => ({
  type: types.CATEGORIES_CLEAR,
})
