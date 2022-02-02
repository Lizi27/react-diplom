import React, {
  FunctionComponent, useEffect, useMemo, useState, 
} from 'react'

import { connect } from 'react-redux'

import { toast } from 'react-toastify'
import MetaTags from 'react-meta-tags'

import * as productActions from '../../store/Product/actions'
import * as cartActions from '../../store/Cart/actions'
import { ProductStateMappedProps } from '../../store/Product/reducer'
import { useRouteParams } from '../../modules/route/hooks/useRouteParams'
import Loader from '../../components/Loader'
import LoadingBlock from '../../components/LoadingBlock'
import PageTitle from '../../components/PageTitle'

type ProductPageProps = ProductStateMappedProps & typeof productActions & typeof cartActions

const ProductPage : FunctionComponent<ProductPageProps> = (data) => {
  let { product, productLoad, cartAddProduct } = data

  const params = useRouteParams()

  const [ size, setSize ] = useState<any>(undefined)
  const [ quantity, setQuantity ] = useState(1)

  useEffect(() => {
    if (params?.id) {
      productLoad(params.id)
    }
  }, [ params, productLoad ])

  let memoProduct = useMemo(() => ({ ...product?.entity }), [ product?.entity ])

  const addToCart = () : any => {
    if (!size) {
      toast.error('Для добавления в корзину необходимо выбрать размер')

      return
    }

    cartAddProduct({
      product: product?.entity,
      quantity,
      size,
    })
  }

  if (product.entityLoading) {
    return <Loader />
  }

  const updateQuantity = (diff: number) : any => {
    let newQuantity = quantity + diff

    if (newQuantity > 0) {
      setQuantity(newQuantity)
    }
  }

  return (
    <section className="catalog-item">
      <MetaTags>
        <PageTitle title="Товар" />
      </MetaTags>
      <LoadingBlock
        loading={ product.entityLoading }
        exclusion={ product.entityLoadError }
        exclusionText="К сожалению, не удалось загрузить товар"
        customClass="mt-5 mb-5"
      >
        <h2 className="text-center">{ memoProduct?.title }</h2>
        <div className="row">
          <div className="col-5">
            <img
              src={ memoProduct?.images?.[0] }
              className="img-fluid"
              alt=""
            />
          </div>
          <div className="col-7">
            <table className="table table-bordered">
              <tbody>
                <tr>
                  <td>Артикул</td>
                  <td>{ memoProduct?.sku }</td>
                </tr>
                <tr>
                  <td>Производитель</td>
                  <td>{ memoProduct?.manufacturer }</td>
                </tr>
                <tr>
                  <td>Цвет</td>
                  <td>{ memoProduct?.color }</td>
                </tr>
                <tr>
                  <td>Материалы</td>
                  <td>{ memoProduct?.material }</td>
                </tr>
                <tr>
                  <td>Сезон</td>
                  <td>{ memoProduct?.season }</td>
                </tr>
                <tr>
                  <td>Повод</td>
                  <td>{ memoProduct?.reason }</td>
                </tr>
              </tbody>
            </table>
            <div className="text-center">
              <p>
                Размеры в наличии:
                {
                memoProduct?.sizes?.filter(
                  (sizeModel) => sizeModel.avalible,
                )?.map(
                  (sizeModel) => (
                    <span
                      key={ `productSize-${sizeModel.size}` }
                      onClick={ () => setSize(sizeModel.size) }
                      className={ `catalog-item-size ${size === sizeModel.size ? 'selected' : ''}` }
                    >{ sizeModel.size }
                    </span>
                  ),
                )
              }
              </p>
              <p>
                Количество
                <span className="btn-group btn-group-sm pl-2">
                  <button type="button" className="btn btn-secondary" onClick={ () => { updateQuantity(-1) } }>-</button>
                  <span className="btn btn-outline-primary">{ quantity }</span>
                  <button type="button" className="btn btn-secondary" onClick={ () => { updateQuantity(+1) } }>+</button>
                </span>
              </p>
            </div>
            <button type="button" className="btn btn-danger btn-block btn-lg" onClick={ addToCart }>В корзину</button>
          </div>
        </div>
      </LoadingBlock>
    </section>
  )
}

const stateProps = (state: any): ProductStateMappedProps => ({
  product: state.Product,
})

export default connect(stateProps, { ...productActions, ...cartActions })(ProductPage)
