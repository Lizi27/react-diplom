import { CartProduct } from '../../models/CartProduct'
import * as types from './actionTypes'

export const cartClear = (): any => ({
  type: types.CART_CLEAR,
})

export const cartSet = (products: CartProduct[]): any => ({
  type: types.CART_SET,
  payload: products,
})

export const cartAddProduct = (cartProduct?: any): any => ({
  type: types.CART_ADD_PRODUCT,
  payload: cartProduct,
})

export const cartDeleteProduct = (id: any): any => ({
  type: types.CART_DELETE_PRODUCT,
  payload: id,
})
