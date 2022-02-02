import React from 'react'

import NotFound from '../pages/Service/NotFound'
import MainPage from '../pages/Main/MainPage'
import CartPage from '../pages/Cart/Cart'
import AboutPage from '../pages/About/About'
import ProductPage from '../pages/Product/ProductPage'
import CatalogPage from '../pages/Catalog/CatalogPage'
import ContactsPage from '../pages/Contacts/Contacts'

import MainLayout from '../layout/MainLayout'

import { Route } from '../modules/route/Route'

import { registerMiddlewares } from './middlewares'

export const registerRoutes = (): void => {
  Route.clearAll()

  registerMiddlewares()

  Route.section('main', () => {
    Route.page('/', MainPage)
      .code('main')
      .exact()

    Route.page('/about', AboutPage)
      .code('about')

    Route.page('/contacts', ContactsPage)
      .code('contacts')

    Route.page('/catalog', CatalogPage)
      .code('catalog')

    Route.page('/cart', CartPage)
      .code('cart')

    Route.page('/product/:id', ProductPage)
      .code('product')
  })
    .middleware('non-auth')
    .layout(MainLayout)

  Route.error(404, NotFound)
    .code('not-found')

  Route.prepareForPageUse()
}
