import { all } from 'redux-saga/effects'

import TopSalesSaga from './TopSales/saga'
import ProductSaga from './Product/saga'
import CategoriesSaga from './Categories/saga'
import CatalogSaga from './Catalog/saga'
import CartSaga from './Cart/saga'
import OrderSaga from './Order/saga'

export default function* rootSaga() {
  yield all([

    TopSalesSaga(),
    ProductSaga(),
    CategoriesSaga(),
    CatalogSaga(),
    CartSaga(),
    OrderSaga(),

  ])
}
