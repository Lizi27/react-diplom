import { EntityState, ReduxAction } from '../types'
import { Product } from '../../models/Product'
import * as types from './actionTypes'

export type ProductState = EntityState<Product>

export type ProductStateMappedProps = {
    product: ProductState,
}

const initialState: ProductState = {
  entity: undefined,
  entityLoading: undefined,
  entityLoadSuccess: undefined,
  entityLoadError: undefined,
}

const reducer = (state = initialState, action: ReduxAction<any>): ProductState => {
  switch (action.type) {
    case types.PRODUCT_LOAD:
      state = {
        ...state,
        entity: undefined,
        entityLoading: true,
        entityLoadSuccess: false,
        entityLoadError: undefined,
      }
      break

    case types.PRODUCT_LOAD_SUCCESS:
      state = {
        ...state,
        entityLoadSuccess: true,
        entityLoading: false,
      }
      break

    case types.PRODUCT_LOAD_FAIL:
      state = {
        ...state,
        entityLoading: false,
        entityLoadError: action.payload,
      }
      break

    case types.PRODUCT_LOAD_ERROR_CLEAR:
      state = {
        ...state,
        entityLoadError: undefined,
      }
      break

    case types.PRODUCT_SET:
      state = {
        ...state,
        entity: action.payload,
      }
      break

    case types.PRODUCT_CLEAR:
      state = {
        ...state,
        entity: undefined,
      }
      break

        // no default
  }

  return state
}

export default reducer
