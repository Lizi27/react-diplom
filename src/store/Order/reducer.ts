import { EntityState, ReduxAction } from '../types'
import * as types from './actionTypes'

export type OrderState = EntityState<any>

export type OrderStateMappedProps = {
    order: OrderState,
}

const initialState: OrderState = {
  entity: undefined,
  entityLoading: false,
  entityLoadSuccess: undefined,
  entityLoadError: undefined,
}

const reducer = (state = initialState, action: ReduxAction<any>): OrderState => {
  switch (action.type) {
    case types.ORDER_SENT:
      state = {
        ...state,
        entity: undefined,
        entityLoading: true,
        entityLoadSuccess: false,
        entityLoadError: undefined,
      }
      break

    case types.ORDER_SENT_SUCCESS:
      state = {
        ...state,
        entityLoadSuccess: true,
        entityLoading: false,
      }
      break

    case types.ORDER_SENT_FAIL:
      state = {
        ...state,
        entityLoading: false,
        entityLoadError: action.payload,
      }
      break

    case types.ORDER_SENT_ERROR_CLEAR:
      state = {
        ...state,
        entityLoadError: undefined,
      }
      break

    case types.ORDER_CLEAR:
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
