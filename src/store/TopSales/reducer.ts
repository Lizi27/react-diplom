import { ListState, ReduxAction } from '../types'
import * as types from './actionTypes'

export type TopSalesState = ListState<any>

export type TopSalesStateMappedProps = {
    topSales: TopSalesState,
}

const initialState: TopSalesState = {
  entityList: undefined,
  entityLoading: undefined,
  entityLoadSuccess: undefined,
  entityLoadError: undefined,
}

const reducer = (state = initialState, action: ReduxAction<any>): TopSalesState => {
  switch (action.type) {
    case types.TOP_SALES_LOAD:
      state = {
        ...state,
        entityList: undefined,
        entityLoading: true,
        entityLoadSuccess: false,
        entityLoadError: undefined,
      }
      break

    case types.TOP_SALES_LOAD_SUCCESS:
      state = {
        ...state,
        entityLoadSuccess: true,
        entityLoading: false,
      }
      break

    case types.TOP_SALES_LOAD_FAIL:
      state = {
        ...state,
        entityLoading: false,
        entityLoadError: action.payload,
      }
      break

    case types.TOP_SALES_LOAD_ERROR_CLEAR:
      state = {
        ...state,
        entityLoadError: undefined,
      }
      break

    case types.TOP_SALES_SET:
      state = {
        ...state,
        entityList: action.payload,
      }
      break

    case types.TOP_SALES_CLEAR:
      state = {
        ...state,
        entityList: undefined,
      }
      break

        // no default
  }

  return state
}

export default reducer
