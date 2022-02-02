import React, { FunctionComponent, useState } from 'react'

import { connect } from 'react-redux'
import Sugar from 'sugar'
import { toast } from 'react-toastify'
import MetaTags from 'react-meta-tags'
import * as cartActions from '../../store/Cart/actions'
import * as orderActions from '../../store/Order/actions'
import { CartStateMappedProps } from '../../store/Cart/reducer'
import { RouteLink } from '../../modules/route/export'
import { CartProduct } from '../../models/CartProduct'
import { OrderStateMappedProps } from '../../store/Order/reducer'
import LoadingBlock from '../../components/LoadingBlock'
import PageTitle from '../../components/PageTitle'

type CartProps = CartStateMappedProps & OrderStateMappedProps
    & typeof cartActions & typeof orderActions

const Cart : FunctionComponent<CartProps> = (data) => {
  let {
    cart, cartDeleteProduct, orderSent, order, 
  } = data

  const [ phone, setPhone ] = useState<string>('')
  const [ address, setAddress ] = useState<string>('')
  const [ agreement, setAgreement ] = useState<boolean>(false)

  const deleteProductCart = (cartProduct: CartProduct) : any => {
    cartDeleteProduct(cartProduct)
  }

  const getCartSum = () : any => cart.entityList?.reduce(
    (sum: any, cartProduct) => {
      if (cartProduct && cartProduct.product
            && cartProduct.product.price && cartProduct.quantity) {
        return sum + (cartProduct.product.price * cartProduct.quantity)
      }

      return 0
    },
    0,
  )

  const sentOrder = () : any => {
    if (phone.length === 0) {
      toast.error('Заполните телефон')
      return
    }

    if (address.length === 0) {
      toast.error('Заполните адрес')
      return
    }

    if (!agreement) {
      toast.error('Мы не сможем принять заказ, без вашего соглашения с правилами доставки')
      return
    }

    orderSent({
      owner: {
        phone,
        address,
      },
      items: cart.entityList?.map((cartProduct) => ({
        id: cartProduct?.product?.id,
        count: cartProduct.quantity,
        price: cartProduct?.product?.price,
      })),
    })
  }

  const isEmpty = !cart.entityList || cart.entityList?.length === 0

  return (
    <>
      <MetaTags>
        <PageTitle title="Корзина" />
      </MetaTags>
      <section className="cart">
        <h2 className="text-center">Корзина</h2>
        {
          isEmpty && (
          <div className="alert alert-warning">
            Корзина пуста
          </div>
          )
        }
        {
            !isEmpty && (
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Название</th>
                  <th scope="col">Размер</th>
                  <th scope="col">Кол-во</th>
                  <th scope="col">Стоимость</th>
                  <th scope="col">Итого</th>
                  <th scope="col">Действия</th>
                </tr>
              </thead>
              <tbody>
                {
              cart?.entityList?.map((cartProduct, index) => (
                <tr key={ `${cartProduct?.id}-${cartProduct.size}` }>
                  <td>{ (index + 1) }</td>
                  <td>
                    <RouteLink
                      route="product"
                      routeData={ { id: cartProduct?.product?.id } }
                    >
                      { cartProduct?.product?.title }
                    </RouteLink>
                  </td>
                  <td>{ cartProduct?.size }</td>
                  <td>{ cartProduct?.quantity }</td>
                  <td>{ cartProduct?.getFormatPrice() } руб.</td>
                  <td>{ cartProduct?.getTotalPrice() } руб.</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-outline-danger btn-sm"
                      onClick={ () => {
                        deleteProductCart(cartProduct)
                      } }
                    >Удалить
                    </button>
                  </td>
                </tr>
              ))
            }
                <tr>
                  <td colSpan={ 5 } className="text-right">Общая стоимость</td>
                  <td>{ Sugar.Number.format(getCartSum()) } руб.</td>
                </tr>
              </tbody>
            </table>
            )
        }
      </section>
      { !isEmpty && (
      <section className="order">
        <h2 className="text-center">Оформить заказ</h2>

        <LoadingBlock
          loading={ order.entityLoading }
          exclusion={ order.entityLoadError }
          exclusionText="Не удалось отправить заказ, попробуйте позже"
        >
          { order.entityLoadSuccess && <div className="alert alert-success">Заказ успешно отправлен</div> }
          { !order.entityLoadSuccess && (
            <div className="card" style={ { maxWidth: '30rem', margin: '0 auto' } }>
              <form className="card-body" onSubmit={ (e) => e.preventDefault() }>
                <div className="form-group">
                  { /* eslint-disable-next-line jsx-a11y/label-has-associated-control */ }
                  <label htmlFor="phone">Телефон</label>
                  <input
                    className="form-control"
                    id="phone"
                    value={ phone }
                    onChange={ (e) => setPhone(e.target.value) }
                    placeholder="Ваш телефон"
                  />
                </div>
                <div className="form-group">
                  { /* eslint-disable-next-line jsx-a11y/label-has-associated-control */ }
                  <label htmlFor="address">Адрес доставки</label>
                  <input
                    className="form-control"
                    id="address"
                    value={ address }
                    onChange={ (e) => setAddress(e.target.value) }
                    placeholder="Адрес доставки"
                  />
                </div>
                <div className="form-group form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    checked={ agreement }
                    onChange={ (e) => setAgreement(e.target.checked) }
                    id="agreement"
                  />
                  { /* eslint-disable-next-line jsx-a11y/label-has-associated-control */ }
                  <label className="form-check-label" htmlFor="agreement">Согласен с правилами
                    доставки
                  </label>
                </div>
                <button type="submit" className="btn btn-outline-secondary" onClick={ sentOrder }>Оформить</button>
              </form>
            </div>
          ) }
        </LoadingBlock>
      </section>
      ) }
    </>
  ) 
}

const stateProps = (state: any): CartStateMappedProps & OrderStateMappedProps => ({
  cart: state.Cart,
  order: state.Order,
})

export default connect(stateProps, { ...cartActions, ...orderActions })(Cart)
