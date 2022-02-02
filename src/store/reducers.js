import { combineReducers } from 'redux'

import TopSales from './TopSales/reducer'
import Product from './Product/reducer'
import Categories from './Categories/reducer'
import Catalog from './Catalog/reducer'
import Cart from './Cart/reducer'
import Order from './Order/reducer'

const rootReducer = combineReducers({

  TopSales,
  Product,
  Categories,
  Catalog,
  Cart,
  Order,

})

export default rootReducer
