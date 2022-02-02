import React, { FunctionComponent } from 'react'

import Sugar from 'sugar'
import { Product } from '../models/Product'
import { RouteLink } from '../modules/route/export'

type CatalogProductProps = {
    product: Product
}

const CatalogProduct: FunctionComponent<CatalogProductProps> = (data) => {
  let { product } = data

  return (

    <div className="col-4 d-flex align-items-stretch">
      <div className="card catalog-item-card">
        <img
          src={ product.images?.[0] }
          className="card-img-top img-fluid"
          alt="Супергеройские кеды"
        />
        <div className="card-body">
          <p className="card-text">{ product.title }</p>
          <p className="card-text">{ product.price ? Sugar.Number.format(product.price) : 0 } руб.</p>

          <RouteLink className="btn btn-outline-primary" route="product" routeData={ { id: product.id } }>
            Заказать
          </RouteLink>
        </div>
      </div>
    </div>
  )
}

export default CatalogProduct
