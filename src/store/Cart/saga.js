import {
  put, select, takeEvery, call,
} from 'redux-saga/effects'

import { toast } from 'react-toastify'
import { CartProduct } from '../../models/CartProduct'
import * as types from './actionTypes'
import * as actions from './actions'

function* cartAddProduct(action) {
  let products = yield select((state) => state.Cart.entityList)

  let { size, product, quantity } = action.payload
  let productHash = product.getHash()

  let exist = products.find(
    (cartProduct) => cartProduct.product.getHash() === productHash && cartProduct.size === size,
  )

  if (exist) {
    products = products.map((cartProduct) => {
      if (cartProduct.product.getHash() === productHash && cartProduct.size === size) {
        cartProduct.quantity += quantity
      }

      return cartProduct
    })
  } else {
    products.push(new CartProduct({
      id: product.id,
      product,
      quantity,
      size,
    }))
  }

  yield call([ toast, toast.success ], 'Товар добавлен в корзину')
  yield put(actions.cartSet([ ...products ]))
}

function* cartDeleteProduct(action) {
  let products = yield select((state) => state.Cart.entityList)

  let cartProductToDelete = action.payload
  let productHash = cartProductToDelete.product.getHash()
  let productSize = cartProductToDelete.size

  products = products.filter(
    (cartProduct) => cartProduct.product.getHash() !== productHash
        && cartProduct.size !== productSize,
  )

  yield put(actions.cartSet([ ...products ]))
}

function* cartSaga() {
  yield takeEvery(types.CART_ADD_PRODUCT, cartAddProduct)
  yield takeEvery(types.CART_DELETE_PRODUCT, cartDeleteProduct)
}

export default cartSaga
