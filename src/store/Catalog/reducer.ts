import { ListState, ReduxAction } from '../types'
import { Product } from '../../models/Product'
import * as types from './actionTypes'

export type CatalogState = ListState<Product> & {
  loadMoreEmpty: boolean
}

export type CatalogStateMappedProps = {
    catalog: CatalogState,
}

const initialState: CatalogState = {
  entityList: undefined,
  entityLoading: undefined,
  entityLoadSuccess: undefined,
  entityLoadError: undefined,
  loadMoreEmpty: false,
}

const reducer = (state = initialState, action: ReduxAction<any>): CatalogState => {
  switch (action.type) {
    case types.CATALOG_LOAD:
      state = {
        ...state,
        entityList: undefined,
        entityLoading: true,
        entityLoadSuccess: false,
        entityLoadError: undefined,
        loadMoreEmpty: false,
      }
      break

    case types.CATALOG_LOAD_SUCCESS:
      state = {
        ...state,
        entityLoadSuccess: true,
        entityLoading: false,
      }
      break

    case types.CATALOG_LOAD_FAIL:
      state = {
        ...state,
        entityLoading: false,
        entityLoadError: action.payload,
      }
      break

    case types.CATALOG_LOAD_ERROR_CLEAR:
      state = {
        ...state,
        entityLoadError: undefined,
      }
      break

    case types.CATALOG_SET:
      state = {
        ...state,
        entityList: action.payload,
      }
      break

    case types.CATALOG_ADD:
      state = {
        ...state,
        entityList: state.entityList?.concat(action.payload),
      }
      break

    case types.CATALOG_CLEAR:
      state = {
        ...state,
        entityList: undefined,
        loadMoreEmpty: false,
      }
      break

    case types.CATALOG_LOAD_MORE_SET_EMPTY:
      state = {
        ...state,
        loadMoreEmpty: action.payload,
      }
      break

        // no default
  }

  return state
}

export default reducer
