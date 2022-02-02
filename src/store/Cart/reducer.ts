import { ReduxAction } from '../types'
import { CartProduct } from '../../models/CartProduct'
import * as types from './actionTypes'

export type CartState = {
    entityList?: CartProduct[],
}

export type CartStateMappedProps = {
    cart: CartState,
}

const initialState: CartState = {
  entityList: [],
}

const reducer = (state = initialState, action: ReduxAction<any>): CartState => {
  switch (action.type) {
    case types.CART_SET:
      state = {
        ...state,
        entityList: action.payload,
      }
      break

    case types.CART_CLEAR:
      state = {
        ...state,
        entityList: [],
      }
      break

        // no default
  }

  return state
}

export default reducer
