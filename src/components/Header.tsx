import React, { FunctionComponent } from 'react'

import { connect } from 'react-redux'
import logo from '../assets/img/header-logo.png'
import { RouteLink } from '../modules/route/export'
import { CartStateMappedProps } from '../store/Cart/reducer'

type HeaderProps = CartStateMappedProps

const Header : FunctionComponent<HeaderProps> = (data) => {
  const { cart } = data

  return (
    <header className="container">
      <div className="row">
        <div className="col">
          <nav className="navbar navbar-expand-sm navbar-light bg-light">
            <a className="navbar-brand" href="/">
              <img src={ logo } alt="Bosa Noga" />
            </a>
            <div className="collapase navbar-collapse" id="navbarMain">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <RouteLink className="nav-link" route="main">Главная</RouteLink>
                </li>
                <li className="nav-item">
                  <RouteLink className="nav-link" route="catalog">Каталог</RouteLink>
                </li>
                <li className="nav-item">
                  <RouteLink className="nav-link" route="about">О магазине</RouteLink>
                </li>
                <li className="nav-item">
                  <RouteLink className="nav-link" route="contacts">Контакты</RouteLink>
                </li>
              </ul>
              <div>
                <div className="header-controls-pics">
                  <div
                    data-id="search-expander"
                    className="header-controls-pic header-controls-search"
                  />
                  <RouteLink route="cart">
                    <div className="header-controls-pic header-controls-cart">
                      {
                        cart.entityList && cart.entityList?.length > 0
                        && <div className="header-controls-cart-full">{ cart.entityList?.length }</div>
                      }
                      <div className="header-controls-cart-menu" />
                    </div>
                  </RouteLink>
                </div>
                <form
                  data-id="search-form"
                  className="header-controls-search-form form-inline invisible"
                >
                  <input className="form-control" placeholder="Поиск" />
                </form>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}

const stateProps = (state: any): CartStateMappedProps => ({
  cart: state.Cart,
})

export default connect(stateProps, null)(Header)
